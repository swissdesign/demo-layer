/**
 * PHD Demo Layer Collector - 
 * Google Apps Script code.gs file, 
 * this file is in this repo so that antigravity can see it in context to the google sheets this script is linked to.
 * This code is added to google apps script manually by me (Pascal Heiniger)
 *
 * Stores events + leads + feedback into a Google Sheet.
 * Token protected (best-effort; token is client-visible).
 *
 * Setup:
 * 1) Open Apps Script -> Project Settings -> Script Properties
 * 2) Add property: COLLECTOR_TOKEN = your-long-random-token
 * 3) Deploy -> Web app:
 *    - Execute as: Me
 *    - Who has access: Anyone (or Anyone with link)
 */

var SHEETS = {
    EVENTS: "events",
    LEADS: "leads",
    FEEDBACK: "feedback",
    RAW: "raw"
};

var HEADERS = {
    EVENTS: [
        "timestamp",
        "demoId",
        "projectName",
        "demoUrl",
        "locale",
        "event",
        "step",
        "phase",
        "referrer",
        "userAgent",
        "ipHash",
        "raw"
    ],
    LEADS: [
        "timestamp",
        "demoId",
        "projectName",
        "demoUrl",
        "locale",
        "currentWebsite",
        "q1",
        "q2",
        "q3",
        "referrer",
        "userAgent",
        "ipHash",
        "raw"
    ],
    FEEDBACK: [
        "timestamp",
        "demoId",
        "projectName",
        "demoUrl",
        "locale",
        "reasonValue",
        "reasonLabel",
        "note",
        "referrer",
        "userAgent",
        "ipHash",
        "raw"
    ],
    RAW: [
        "timestamp",
        "action",
        "demoId",
        "projectName",
        "demoUrl",
        "locale",
        "event",
        "reasonValue",
        "note",
        "referrer",
        "userAgent",
        "ipHash",
        "raw"
    ]
};

function doGet(e) {
  var p = (e && e.parameter) ? e.parameter : {};

  if (p.action === 'config') {
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var configSheet = ss.getSheetByName('config');
      var config = {};
      if (configSheet) {
        var rows = configSheet.getDataRange().getValues();
        for (var i = 0; i < rows.length; i++) {
          var key = String(rows[i][0]).trim();
          var value = String(rows[i][1]).trim();
          if (key) config[key] = value;
        }
      }
      return json_({ ok: true, config: config });
    } catch (err) {
      return json_({ ok: false, error: String(err) });
    }
  }

  return json_({
    ok: true,
    service: "phd-demo-collector",
    ts: new Date().toISOString(),
    hasToken: Boolean(getToken_())
  });
}

function doPost(e) {
    try {
        var p = (e && e.parameter) ? e.parameter : {};

        // Honeypot: real clients send hp=""
        if (p.hp && String(p.hp).trim() !== "") {
            return json_({ ok: true, ignored: true });
        }

        // Token check (required)
        var required = getToken_();
        if (!required) {
            // Misconfigured collector
            return json_({ ok: false, error: "collector token not configured" });
        }
        if (String(p.token || "") !== String(required)) {
            return json_({ ok: false, error: "forbidden" });
        }

        // Basic action validation
        var action = String(p.action || "").toLowerCase();
        if (!action) return json_({ ok: false, error: "missing action" });

        // Best-effort throttling (not perfect)
        if (!rateLimitOk_(p)) {
            return json_({ ok: true, throttled: true });
        }

        var ss = SpreadsheetApp.getActiveSpreadsheet();

        // IP is not reliably available in Apps Script Web Apps.
        // We store a hash placeholder based on request fingerprint data we do have.
        var ipHash = hash_(String(p.userAgent || "") + "|" + String(p.referrer || ""));

        if (action === "event") {
            ensureSheet_(ss, SHEETS.EVENTS, HEADERS.EVENTS);
            ss.getSheetByName(SHEETS.EVENTS).appendRow([
                new Date(),
                val_(p.demoId),
                val_(p.projectName),
                val_(p.demoUrl),
                val_(p.locale),
                val_(p.event),
                val_(p.step),
                val_(p.phase),
                val_(p.referrer),
                val_(p.userAgent),
                ipHash,
                JSON.stringify(p)
            ]);
        } else if (action === "lead") {
            ensureSheet_(ss, SHEETS.LEADS, HEADERS.LEADS);
            ss.getSheetByName(SHEETS.LEADS).appendRow([
                new Date(),
                val_(p.demoId),
                val_(p.projectName),
                val_(p.demoUrl),
                val_(p.locale),
                val_(p.currentWebsite),
                val_(p.q1),
                val_(p.q2),
                val_(p.q3),
                val_(p.referrer),
                val_(p.userAgent),
                ipHash,
                JSON.stringify(p)
            ]);
        } else if (action === "feedback") {
            ensureSheet_(ss, SHEETS.FEEDBACK, HEADERS.FEEDBACK);
            ss.getSheetByName(SHEETS.FEEDBACK).appendRow([
                new Date(),
                val_(p.demoId),
                val_(p.projectName),
                val_(p.demoUrl),
                val_(p.locale),
                val_(p.reasonValue),
                val_(p.reasonLabel),
                val_(p.note),
                val_(p.referrer),
                val_(p.userAgent),
                ipHash,
                JSON.stringify(p)
            ]);
        } else {
            // Unknown action still gets logged
            ensureSheet_(ss, SHEETS.RAW, HEADERS.RAW);
            ss.getSheetByName(SHEETS.RAW).appendRow([
                new Date(),
                val_(p.action),
                val_(p.demoId),
                val_(p.projectName),
                val_(p.demoUrl),
                val_(p.locale),
                val_(p.event),
                val_(p.reasonValue),
                val_(p.note),
                val_(p.referrer),
                val_(p.userAgent),
                ipHash,
                JSON.stringify(p)
            ]);
        }

        // Always OK; clients use sendBeacon/no-cors anyway
        return json_({ ok: true });
    } catch (err) {
        // Still OK to not break beacon/no-cors clients
        return json_({ ok: true, error: String(err) });
    }
}

function ensureSheet_(ss, name, headers) {
    var sh = ss.getSheetByName(name);
    if (!sh) sh = ss.insertSheet(name);
    if (sh.getLastRow() === 0) {
        sh.appendRow(headers);
    }
}

function getToken_() {
    return PropertiesService.getScriptProperties().getProperty("COLLECTOR_TOKEN");
}

function rateLimitOk_(p) {
    // Soft limiter: per demoId per minute.
    // Not bulletproof, but helps reduce accidental spam.
    var demoId = String(p.demoId || "unknown");
    var key = "rl:" + demoId + ":" + Math.floor(Date.now() / 60000);
    var cache = CacheService.getScriptCache();
    var current = Number(cache.get(key) || "0");
    if (current > 120) return false; // 120 hits/min per demoId
    cache.put(key, String(current + 1), 120);
    return true;
}

function json_(obj) {
    return ContentService
        .createTextOutput(JSON.stringify(obj))
        .setMimeType(ContentService.MimeType.JSON);
}

function val_(x) {
    if (x === undefined || x === null) return "";
    return String(x);
}

function hash_(s) {
    // Small stable hash for grouping (not security)
    var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, s);
    return bytes.map(function (b) {
        var v = (b < 0) ? b + 256 : b;
        return ("0" + v.toString(16)).slice(-2);
    }).join("").slice(0, 16);
}


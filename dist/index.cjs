"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DemoLayer: () => DemoLayer
});
module.exports = __toCommonJS(index_exports);

// src/DemoLayer.tsx
var React = __toESM(require("react"), 1);
var import_react_dom = require("react-dom");

// src/collector.ts
function postCollector(url, data) {
  try {
    const payload = { ...data, hp: "" };
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const form = new FormData();
      for (const [key, value] of Object.entries(payload)) {
        form.append(key, String(value));
      }
      navigator.sendBeacon(url, form);
      return;
    }
    if (typeof fetch !== "undefined") {
      const body = new URLSearchParams();
      for (const [key, value] of Object.entries(payload)) {
        body.append(key, String(value));
      }
      fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body
      });
    }
  } catch (e) {
  }
}

// src/DemoLayer.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var COPY = {
  title: {
    de: "Demo-Version von P. Heiniger Design",
    en: "Demo version by P. Heiniger Design",
    fr: "Version d\xE9mo par P. Heiniger Design",
    it: "Versione demo di P. Heiniger Design"
  },
  body: {
    de: "Ich habe diese kurze Demo gebaut, weil ich glaube, dass Ihr Betrieb mit einem modernen Webauftritt und smarten Abl\xE4ufen (Anfragen, Buchungen, Infos) sp\xFCrbar profitieren kann. Schauen Sie sich kurz um und geben Sie mir danach ein kurzes Feedback.",
    en: "I built this short demo because I believe your business could gain real value from a modern website and smarter workflows (inquiries, bookings, information). Have a quick look around, then share brief feedback.",
    fr: "J'ai cr\xE9\xE9 cette courte d\xE9mo car je pense que votre entreprise peut gagner en valeur avec un site moderne et des flux plus intelligents (demandes, r\xE9servations, informations). Parcourez-la bri\xE8vement, puis laissez un feedback.",
    it: "Ho creato questa breve demo perch\xE9 penso che la Sua attivit\xE0 possa ottenere pi\xF9 valore con un sito moderno e flussi pi\xF9 intelligenti (richieste, prenotazioni, informazioni). Dia un'occhiata e poi lasci un feedback breve."
  },
  interested: {
    de: "Interessant",
    en: "Interested",
    fr: "Int\xE9ressant",
    it: "Interessante"
  },
  notInterested: {
    de: "Nicht interessant",
    en: "Not interested",
    fr: "Pas int\xE9ress\xE9",
    it: "Non mi interessa"
  },
  closeToBar: {
    de: "Meine Demo ansehen",
    en: "View my custom demo site",
    fr: "Voir ma d\xE9mo",
    it: "Vedi la mia demo"
  },
  tooltip: {
    de: "Bitte schauen Sie sich die Seite zuerst an, bevor Sie entscheiden.",
    en: "Please look at the site first before deciding.",
    fr: "Regardez d'abord le site avant de d\xE9cider.",
    it: "Guardi prima il sito, poi decida."
  },
  intakeIntro: {
    de: "Wenn Sie offen sind, helfen mir drei kurze Fragen, den Call effizient zu machen:",
    en: "If you're open to it, these three quick questions help make the call efficient:",
    fr: "Si vous \xEAtes d'accord, trois questions rapides rendent l'appel plus efficace :",
    it: "Se \xE8 d'accordo, tre domande rapide rendono la call pi\xF9 efficace:"
  },
  demoLinkLabel: {
    de: "Demo-Link (automatisch)",
    en: "Demo link (auto)",
    fr: "Lien de la d\xE9mo (auto)",
    it: "Link della demo (auto)"
  },
  copy: {
    de: "Kopieren",
    en: "Copy",
    fr: "Copier",
    it: "Copia"
  },
  copied: {
    de: "Kopiert",
    en: "Copied",
    fr: "Copi\xE9",
    it: "Copiato"
  },
  currentWebsiteLabel: {
    de: "Ihre aktuelle Website (optional)",
    en: "Your current website (optional)",
    fr: "Votre site actuel (optionnel)",
    it: "Il tuo sito attuale (opzionale)"
  },
  q1: {
    de: "1) Was ist aktuell der gr\xF6sste Engpass an Ihrem Online-Auftritt? (z.B. Sichtbarkeit, Vertrauen, Anfragen, Buchungen, Infos)",
    en: "1) What's the biggest bottleneck in your online presence right now? (visibility, trust, inquiries, bookings, info)",
    fr: "1) Quel est le plus gros frein de votre pr\xE9sence en ligne aujourd'hui ? (visibilit\xE9, confiance, demandes, r\xE9servations, infos)",
    it: "1) Qual \xE8 il principale ostacolo della Sua presenza online oggi? (visibilit\xE0, fiducia, richieste, prenotazioni, info)"
  },
  q2: {
    de: "2) Wenn Ihre Website in 30 Tagen perfekt funktionieren w\xFCrde: Was m\xFCsste sie konkret f\xFCr Ihr Tagesgesch\xE4ft vereinfachen oder automatisieren?",
    en: "2) If your website worked perfectly in 30 days: what should it simplify or automate in your day-to-day operations?",
    fr: "2) Si votre site fonctionnait parfaitement dans 30 jours : que devrait-il simplifier ou automatiser au quotidien ?",
    it: "2) Se il sito funzionasse perfettamente tra 30 giorni: cosa dovrebbe semplificare o automatizzare nel lavoro quotidiano?"
  },
  q3: {
    de: "3) Woran w\xFCrden Sie den Erfolg messen? Nennen Sie 1\u20132 Ziele (z.B. mehr Anfragen/Woche, h\xF6here Buchungsrate, weniger Telefonzeit).",
    en: "3) How would you measure success? Name 1\u20132 targets (more inquiries/week, higher booking rate, less phone time).",
    fr: "3) Comment mesureriez-vous le succ\xE8s ? Donnez 1\u20132 objectifs (plus de demandes/semaine, meilleur taux de r\xE9servation, moins d'appels).",
    it: "3) Come misurerebbe il successo? Indichi 1\u20132 obiettivi (pi\xF9 richieste/settimana, migliore tasso di prenotazione, meno telefonate)."
  },
  sendBook: {
    de: "Senden & Termin buchen",
    en: "Send & book a slot",
    fr: "Envoyer & r\xE9server",
    it: "Invia & prenota"
  },
  skipBook: {
    de: "\xDCberspringen & buchen",
    en: "Skip & book",
    fr: "Passer & r\xE9server",
    it: "Salta & prenota"
  },
  back: {
    de: "Zur\xFCck",
    en: "Back",
    fr: "Retour",
    it: "Indietro"
  },
  helper: {
    de: "Falls Ihr Mail-Client nicht \xF6ffnet, schreiben Sie an design@pascalheiniger.ch.",
    en: "If your mail client did not open, email design@pascalheiniger.ch.",
    fr: "Si votre client mail ne s'ouvre pas, \xE9crivez \xE0 design@pascalheiniger.ch.",
    it: "Se il client mail non si apre, scriva a design@pascalheiniger.ch."
  },
  reasonLabel: {
    de: "Grund",
    en: "Reason",
    fr: "Raison",
    it: "Motivo"
  },
  reasonPlaceholder: {
    de: "Bitte ausw\xE4hlen",
    en: "Select a reason",
    fr: "Choisir une raison",
    it: "Seleziona un motivo"
  },
  contextLabel: {
    de: "Optional: kurzer Kontext",
    en: "Optional: context",
    fr: "Optionnel : contexte",
    it: "Opzionale: contesto"
  },
  submit: {
    de: "Senden",
    en: "Submit",
    fr: "Envoyer",
    it: "Invia"
  }
};
var LOCALE_LABELS = {
  de: "DE",
  en: "EN",
  fr: "FR",
  it: "IT"
};
var isBrowser = typeof window !== "undefined";
var PHDLogo = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  "svg",
  {
    className,
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    viewBox: "0 0 1024 768",
    role: "img",
    "aria-label": "P. Heiniger Design",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        fill: "currentColor",
        d: "M574.26,196.16s58.36-.56,44.29,57.38c-11.97,49.33-76.79,46.94-76.79,46.94l-36.02,89.75h22.78s31.73-78.89,31.73-78.89l84.98.2s85.24-.51,65.6,95.59c-20.87,102.11-141.08,94.08-141.08,94.08h-85.06l25.28-65h-22.84s-5.39,15.24-25.2,65c-49.82,125.19-172.48,61.38-148.65-18.07,18.09-58.24,56.15-84.92,95.29-90.48,39.27-5.57,45.49-2.44,57.84-33.48,12.35-31.04,46.29-116.3,46.29-116.3l-37.91-.05,18.58-46.69h80.88ZM564.74,242.89l-4.25,10.67s8.11,1.88,10.72-5.26c2.52-6.9-6.46-5.41-6.46-5.41M593.14,359.31l-12.32,30.92h33.08l-18.28,45.98h-33.1l-7.56,18.99h33.08s56.89-.38,71.65-48.04c15.47-49.92-33.39-48.1-33.39-48.1l-33.16.25ZM363.52,480.12c-20.35,51.87,32.65,54.87,46.29,21.04,13.63-33.83,25.12-64.76,25.12-64.76,0,0-52.65-4.1-71.41,43.72"
      }
    )
  }
);
var getInitialLocale = (config, localeKey) => {
  var _a, _b;
  if (isBrowser) {
    const stored = window.localStorage.getItem(localeKey);
    if (stored && config.locales.includes(stored)) {
      return stored;
    }
    const lang = (_b = (_a = window.navigator.language) == null ? void 0 : _a.toLowerCase()) != null ? _b : "";
    if (lang.startsWith("de")) return "de";
    if (lang.startsWith("fr")) return "fr";
    if (lang.startsWith("it")) return "it";
    return "en";
  }
  return config.defaultLocale;
};
var getSafeLocale = (config, locale) => {
  if (config.locales.includes(locale)) return locale;
  return config.defaultLocale;
};
var readIntake = (intakeKey, currentWebsitePrefill) => {
  var _a, _b, _c, _d, _e;
  if (!isBrowser) {
    return {
      currentWebsite: currentWebsitePrefill != null ? currentWebsitePrefill : "",
      q1: "",
      q2: "",
      q3: ""
    };
  }
  const stored = window.localStorage.getItem(intakeKey);
  if (!stored) {
    return {
      currentWebsite: currentWebsitePrefill != null ? currentWebsitePrefill : "",
      q1: "",
      q2: "",
      q3: ""
    };
  }
  try {
    const parsed = JSON.parse(stored);
    const migratedWebsite = (_b = (_a = parsed.currentWebsite) != null ? _a : parsed.websiteLink) != null ? _b : "";
    return {
      currentWebsite: migratedWebsite,
      q1: (_c = parsed.q1) != null ? _c : "",
      q2: (_d = parsed.q2) != null ? _d : "",
      q3: (_e = parsed.q3) != null ? _e : "",
      lastUpdated: parsed.lastUpdated,
      locale: parsed.locale
    };
  } catch (e) {
    return {
      currentWebsite: currentWebsitePrefill != null ? currentWebsitePrefill : "",
      q1: "",
      q2: "",
      q3: ""
    };
  }
};
var readDismissedUntil = (dismissedKey) => {
  if (!isBrowser) return 0;
  const stored = window.localStorage.getItem(dismissedKey);
  if (!stored) return 0;
  const value = Number(stored);
  return Number.isFinite(value) ? value : 0;
};
var DemoLayer = ({ config }) => {
  var _a, _b, _c, _d, _e;
  const localeKey = React.useMemo(
    () => `phd_demo_locale_v1:${config.demoId}`,
    [config.demoId]
  );
  const intakeKey = React.useMemo(
    () => `phd_demo_intake_v1:${config.demoId}`,
    [config.demoId]
  );
  const dismissedKey = "dismissed_until";
  const [state, setState] = React.useState("hidden");
  const [step, setStep] = React.useState("main");
  const [locale, setLocale] = React.useState(
    getInitialLocale(config, localeKey)
  );
  const [isUnlocked, setIsUnlocked] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [notInterestedReason, setNotInterestedReason] = React.useState("");
  const [notInterestedNote, setNotInterestedNote] = React.useState("");
  const [intake, setIntake] = React.useState(
    readIntake(intakeKey, config.currentWebsitePrefill)
  );
  const [showMailHelper, setShowMailHelper] = React.useState(false);
  const tooltipTimeoutRef = React.useRef(null);
  const closeTimeoutRef = React.useRef(null);
  const mailHelperTimeoutRef = React.useRef(null);
  const copyTimeoutRef = React.useRef(null);
  const splashTimeoutRef = React.useRef(null);
  const openRafRef = React.useRef(null);
  const autoOpenTimeoutRef = React.useRef(null);
  const suppressOpenUntilRef = React.useRef(0);
  const [mounted, setMounted] = React.useState(false);
  const [phase, setPhase] = React.useState("closed");
  const [demoUrl, setDemoUrl] = React.useState("");
  const [copied, setCopied] = React.useState(false);
  const [showSplash, setShowSplash] = React.useState(false);
  const animationMs = (_a = config.animationMs) != null ? _a : 420;
  const collectorEnabled = Boolean(config.collectorEnabled && config.collectorUrl);
  const collectorTrackEvents = collectorEnabled && config.collectorTrackEvents !== false;
  const lastPhaseRef = React.useRef(phase);
  const postToCollector = React.useCallback(
    (data) => {
      var _a2;
      if (!collectorEnabled || !config.collectorUrl) return;
      const resolvedDemoUrl = demoUrl || (isBrowser ? window.location.href : "");
      const payload = {
        demoId: config.demoId,
        projectName: (_a2 = config.projectName) != null ? _a2 : config.demoId,
        demoUrl: resolvedDemoUrl,
        locale,
        referrer: isBrowser ? document.referrer || "" : "",
        userAgent: isBrowser ? window.navigator.userAgent || "" : "",
        ...data
      };
      if (config.collectorToken) {
        payload.token = config.collectorToken;
      }
      postCollector(config.collectorUrl, payload);
    },
    [
      collectorEnabled,
      config.collectorToken,
      config.collectorUrl,
      config.demoId,
      config.projectName,
      demoUrl,
      locale
    ]
  );
  React.useEffect(() => {
    return () => {
      if (!isBrowser) return;
      if (tooltipTimeoutRef.current) {
        window.clearTimeout(tooltipTimeoutRef.current);
      }
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
      if (mailHelperTimeoutRef.current) {
        window.clearTimeout(mailHelperTimeoutRef.current);
      }
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      if (splashTimeoutRef.current) {
        window.clearTimeout(splashTimeoutRef.current);
      }
      if (openRafRef.current) {
        window.cancelAnimationFrame(openRafRef.current);
      }
      if (autoOpenTimeoutRef.current) {
        window.clearTimeout(autoOpenTimeoutRef.current);
      }
    };
  }, []);
  React.useEffect(() => {
    if (!isBrowser) return;
    setDemoUrl(window.location.href);
  }, [state]);
  React.useEffect(() => {
    if (!config.enabled) return;
    if (!isBrowser) return;
    const dismissedUntil = readDismissedUntil(dismissedKey);
    if (dismissedUntil > Date.now()) {
      setState("minimized");
      return;
    }
    if (state !== "hidden" || mounted || phase !== "closed") {
      return;
    }
    if (autoOpenTimeoutRef.current) {
      window.clearTimeout(autoOpenTimeoutRef.current);
    }
    autoOpenTimeoutRef.current = window.setTimeout(() => {
      if (phase !== "closed" || mounted) return;
      setState("open");
    }, config.openDelayMs);
    return () => {
      if (autoOpenTimeoutRef.current) {
        window.clearTimeout(autoOpenTimeoutRef.current);
      }
    };
  }, [config.enabled, config.openDelayMs, dismissedKey, state, mounted, phase]);
  React.useEffect(() => {
    var _a2;
    if (!config.enabled) return;
    if (!isBrowser) return;
    if (state !== "open" || config.splashEnabled === false) {
      setShowSplash(false);
      return;
    }
    setShowSplash(true);
    if (splashTimeoutRef.current) {
      window.clearTimeout(splashTimeoutRef.current);
    }
    const duration = (_a2 = config.splashMs) != null ? _a2 : 900;
    splashTimeoutRef.current = window.setTimeout(() => {
      setShowSplash(false);
    }, duration);
    return () => {
      if (splashTimeoutRef.current) {
        window.clearTimeout(splashTimeoutRef.current);
      }
    };
  }, [state, config.enabled, config.splashEnabled, config.splashMs]);
  React.useEffect(() => {
    if (!config.enabled) return;
    if (!isBrowser) return;
    if (state === "open") {
      if (phase === "open" || phase === "opening" || phase === "closing") {
        return;
      }
      setMounted(true);
      setPhase("opening");
      if (openRafRef.current) {
        window.cancelAnimationFrame(openRafRef.current);
      }
      openRafRef.current = window.requestAnimationFrame(() => {
        setPhase("open");
        openRafRef.current = null;
      });
    }
  }, [state, config.enabled, phase]);
  React.useEffect(() => {
    if (!collectorTrackEvents) {
      lastPhaseRef.current = phase;
      return;
    }
    if (phase === "open" && lastPhaseRef.current !== "open") {
      postToCollector({
        action: "event",
        event: "open",
        step,
        phase
      });
    }
    lastPhaseRef.current = phase;
  }, [collectorTrackEvents, phase, postToCollector, step]);
  React.useEffect(() => {
    if (!config.enabled) return;
    if (!isBrowser) return;
    window.localStorage.setItem(localeKey, locale);
  }, [locale, localeKey, config.enabled]);
  React.useEffect(() => {
    if (!config.enabled) return;
    if (!isBrowser) return;
    const payload = {
      currentWebsite: intake.currentWebsite,
      q1: intake.q1,
      q2: intake.q2,
      q3: intake.q3,
      lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
      locale
    };
    window.localStorage.setItem(intakeKey, JSON.stringify(payload));
  }, [intake, locale, intakeKey, config.enabled]);
  React.useEffect(() => {
    if (!config.enabled) return;
    if (!isBrowser) return;
    if (state !== "open") return;
    setStep("main");
    setShowMailHelper(false);
    setNotInterestedReason("");
    setNotInterestedNote("");
    setIsUnlocked(false);
    const unlockByTime = window.setTimeout(() => {
      setIsUnlocked(true);
    }, config.unlockAfterMs);
    const handleScroll = () => {
      if (window.scrollY >= config.unlockOnScrollPx) {
        setIsUnlocked(true);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        startClose("esc");
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(unlockByTime);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state, config.unlockAfterMs, config.unlockOnScrollPx, config.enabled]);
  const finalizeClose = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    setMounted(false);
    setPhase("closed");
    setState("minimized");
    setStep("main");
    setShowMailHelper(false);
  }, []);
  const startClose = (reason, persistDismiss = true) => {
    console.debug("[DemoLayer] close", { reason, phaseBefore: phase });
    if (!mounted) {
      setPhase("closed");
      setState("minimized");
      return;
    }
    if (phase === "closing" || phase === "closed") return;
    if (collectorTrackEvents) {
      postToCollector({
        action: "event",
        event: "close",
        step,
        phase
      });
    }
    if (persistDismiss && isBrowser) {
      const ttlMs = config.dismissTtlDays * 24 * 60 * 60 * 1e3;
      window.localStorage.setItem(dismissedKey, String(Date.now() + ttlMs));
    }
    suppressOpenUntilRef.current = Date.now() + animationMs + 80;
    if (openRafRef.current) {
      window.cancelAnimationFrame(openRafRef.current);
      openRafRef.current = null;
    }
    if (autoOpenTimeoutRef.current) {
      window.clearTimeout(autoOpenTimeoutRef.current);
      autoOpenTimeoutRef.current = null;
    }
    setPhase("closing");
    setState("minimized");
    setStep("main");
    setShowSplash(false);
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      finalizeClose();
    }, animationMs + 30);
  };
  const open = () => {
    if (phase === "closing") return;
    if (phase === "open" || phase === "opening") return;
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    if (openRafRef.current) {
      window.cancelAnimationFrame(openRafRef.current);
      openRafRef.current = null;
    }
    setMounted(true);
    setPhase("opening");
    setState("open");
    openRafRef.current = window.requestAnimationFrame(() => {
      setPhase("open");
      openRafRef.current = null;
    });
  };
  const showLockedTooltip = () => {
    if (!isBrowser) return;
    setShowTooltip(true);
    if (tooltipTimeoutRef.current) {
      window.clearTimeout(tooltipTimeoutRef.current);
    }
    tooltipTimeoutRef.current = window.setTimeout(() => {
      setShowTooltip(false);
    }, 1800);
  };
  const handleLockedClick = () => {
    if (!isUnlocked) {
      showLockedTooltip();
      return true;
    }
    return false;
  };
  const handleInterested = () => {
    if (handleLockedClick()) return;
    if (collectorTrackEvents) {
      postToCollector({
        action: "event",
        event: "click_interested",
        step,
        phase
      });
    }
    setStep("intake");
  };
  const handleNotInterested = () => {
    if (handleLockedClick()) return;
    if (collectorTrackEvents) {
      postToCollector({
        action: "event",
        event: "click_not_interested",
        step,
        phase
      });
    }
    setStep("notInterested");
  };
  const handleBackToMain = () => {
    setStep("main");
    setShowMailHelper(false);
  };
  const handleCopyDemoUrl = async () => {
    var _a2;
    if (!isBrowser || !demoUrl) return;
    try {
      if ((_a2 = window.navigator.clipboard) == null ? void 0 : _a2.writeText) {
        await window.navigator.clipboard.writeText(demoUrl);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = demoUrl;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 1e3);
    } catch (e) {
    }
  };
  const handleLocaleChange = (nextLocale) => {
    setLocale(getSafeLocale(config, nextLocale));
  };
  const handleSendAndBook = () => {
    var _a2;
    if (!isBrowser) return;
    window.open(config.schedulerUrl, "_blank", "noopener,noreferrer");
    const projectName = (_a2 = config.projectName) != null ? _a2 : config.demoId;
    const resolvedDemoUrl = demoUrl || window.location.href;
    postToCollector({
      action: "lead",
      demoUrl: resolvedDemoUrl,
      currentWebsite: intake.currentWebsite.trim(),
      q1: intake.q1,
      q2: intake.q2,
      q3: intake.q3
    });
    const bodyLines = [
      `Project: ${projectName}`,
      `DemoId: ${config.demoId}`,
      `Demo URL: ${resolvedDemoUrl}`
    ];
    if (intake.currentWebsite.trim().length > 0) {
      bodyLines.push(`Current website: ${intake.currentWebsite.trim()}`);
    }
    bodyLines.push(
      `Q1: ${intake.q1 || "-"}`,
      `Q2: ${intake.q2 || "-"}`,
      `Q3: ${intake.q3 || "-"}`,
      `Locale: ${locale}`,
      `Time: ${(/* @__PURE__ */ new Date()).toISOString()}`
    );
    const subject = `[Demo: ${config.demoId}] Interested \u2014 Web intake`;
    const body = bodyLines.join("\n");
    const mailto = `mailto:${config.contactEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setShowMailHelper(false);
    if (mailHelperTimeoutRef.current) {
      window.clearTimeout(mailHelperTimeoutRef.current);
    }
    mailHelperTimeoutRef.current = window.setTimeout(() => {
      setShowMailHelper(true);
    }, 700);
  };
  const handleSkipAndBook = () => {
    if (!isBrowser) return;
    window.open(config.schedulerUrl, "_blank", "noopener,noreferrer");
  };
  const handleNotInterestedSubmit = () => {
    var _a2;
    if (!isBrowser) return;
    if (!notInterestedReason) return;
    const reason = config.reasons.find(
      (item) => item.value === notInterestedReason
    );
    const reasonLabel = reason ? reason.labels[locale] : notInterestedReason;
    const projectName = (_a2 = config.projectName) != null ? _a2 : config.demoId;
    const resolvedDemoUrl = demoUrl || window.location.href;
    postToCollector({
      action: "feedback",
      demoUrl: resolvedDemoUrl,
      reasonValue: notInterestedReason,
      reasonLabel,
      note: notInterestedNote
    });
    const subject = `[Demo: ${config.demoId}] Not interested`;
    const body = [
      `Project: ${projectName}`,
      `DemoId: ${config.demoId}`,
      `Demo URL: ${resolvedDemoUrl}`,
      `Reason: ${notInterestedReason} (${reasonLabel})`,
      `Context: ${notInterestedNote || "-"}`,
      `Locale: ${locale}`,
      `Time: ${(/* @__PURE__ */ new Date()).toISOString()}`
    ].join("\n");
    const mailto = `mailto:${config.contactEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    startClose("not-interested");
  };
  if (!config.enabled) return null;
  const t = (key) => {
    var _a2;
    return (_a2 = COPY[key][locale]) != null ? _a2 : COPY[key][config.defaultLocale];
  };
  const isLocked = !isUnlocked;
  const canSendIntake = intake.q1.trim().length > 0 && intake.q2.trim().length > 0;
  const layerStyle = {
    ["--phd-accent"]: config.theme.accent,
    ["--phd-panel-bg"]: config.theme.panelBg,
    ["--phd-handle-height"]: `${(_b = config.handleHeightPx) != null ? _b : 76}px`,
    ["--phd-handle-width"]: `${(_c = config.handleWidthPx) != null ? _c : 38}px`,
    ["--phd-handle-line-opacity"]: `${(_d = config.handleLineOpacity) != null ? _d : 0.65}`,
    ["--phd-splash-ms"]: `${(_e = config.splashMs) != null ? _e : 900}ms`,
    ["--phd-animation-ms"]: `${animationMs}ms`
  };
  const panelState = phase;
  const overlayState = phase;
  const overlay = mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: "phd-overlay",
        "data-phase": overlayState,
        onClick: (event) => {
          if (event.target !== event.currentTarget) return;
          startClose("overlay");
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: "phd-panel",
        "data-phase": panelState,
        role: "dialog",
        "aria-modal": "true",
        children: [
          showSplash && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "phd-demo-splash", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "phd-demo-splash-inner", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PHDLogo, { className: "phd-logo phd-logo-splash" }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `phd-demo-content ${showSplash ? "is-splashing" : ""}`, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "phd-demo-brand", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PHDLogo, { className: "phd-logo phd-logo-brand" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "phd-demo-brand-text", children: "P. HEINIGER DESIGN" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "phd-demo-header", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "phd-demo-title", children: t("title") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "phd-demo-locale-toggle", "aria-label": "Locale", children: config.locales.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  type: "button",
                  className: loc === locale ? "is-active" : void 0,
                  onClick: () => handleLocaleChange(loc),
                  children: LOCALE_LABELS[loc]
                },
                loc
              )) })
            ] }),
            step === "main" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "phd-demo-body", children: t("body") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "phd-demo-actions", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "phd-demo-btn primary",
                    "data-locked": isLocked,
                    onClick: handleInterested,
                    children: t("interested")
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "phd-demo-btn secondary",
                    "data-locked": isLocked,
                    onClick: handleNotInterested,
                    children: t("notInterested")
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "phd-demo-btn ghost",
                    onClick: () => {
                      startClose("view-site");
                    },
                    children: t("closeToBar")
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "div",
                  {
                    className: `phd-demo-tooltip ${showTooltip ? "is-visible" : ""}`,
                    children: t("tooltip")
                  }
                )
              ] })
            ] }),
            step === "intake" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "phd-demo-body", children: t("intakeIntro") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "phd-demo-section", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "phd-demo-field", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "phd-demo-link", children: t("demoLinkLabel") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { id: "phd-demo-link", className: "phd-demo-demo-row", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "phd-demo-demo-url", children: demoUrl || "-" }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "button",
                      {
                        type: "button",
                        className: "phd-demo-btn tiny",
                        onClick: handleCopyDemoUrl,
                        disabled: !demoUrl,
                        children: copied ? t("copied") : t("copy")
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "phd-demo-field", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "phd-current-website", children: t("currentWebsiteLabel") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "input",
                    {
                      id: "phd-current-website",
                      type: "url",
                      placeholder: "https://",
                      value: intake.currentWebsite,
                      onChange: (event) => setIntake((prev) => ({
                        ...prev,
                        currentWebsite: event.target.value
                      }))
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "phd-demo-field", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "phd-q1", children: t("q1") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "textarea",
                    {
                      id: "phd-q1",
                      value: intake.q1,
                      onChange: (event) => setIntake((prev) => ({
                        ...prev,
                        q1: event.target.value
                      }))
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "phd-demo-field", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "phd-q2", children: t("q2") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "textarea",
                    {
                      id: "phd-q2",
                      value: intake.q2,
                      onChange: (event) => setIntake((prev) => ({
                        ...prev,
                        q2: event.target.value
                      }))
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "phd-demo-field", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "phd-q3", children: t("q3") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "textarea",
                    {
                      id: "phd-q3",
                      value: intake.q3,
                      onChange: (event) => setIntake((prev) => ({
                        ...prev,
                        q3: event.target.value
                      }))
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "phd-demo-footer-actions", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "phd-demo-btn primary",
                    onClick: handleSendAndBook,
                    "data-locked": !canSendIntake,
                    disabled: !canSendIntake,
                    children: t("sendBook")
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "phd-demo-btn secondary",
                    onClick: handleSkipAndBook,
                    children: t("skipBook")
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "phd-demo-btn ghost",
                    onClick: handleBackToMain,
                    children: t("back")
                  }
                )
              ] }),
              showMailHelper && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "phd-demo-helper", children: t("helper") })
            ] }),
            step === "notInterested" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "phd-demo-section", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "phd-demo-field", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "phd-reason", children: t("reasonLabel") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    "select",
                    {
                      id: "phd-reason",
                      value: notInterestedReason,
                      onChange: (event) => setNotInterestedReason(event.target.value),
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: t("reasonPlaceholder") }),
                        config.reasons.map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: reason.value, children: reason.labels[locale] }, reason.value))
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "phd-demo-field", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "phd-context", children: t("contextLabel") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "textarea",
                    {
                      id: "phd-context",
                      value: notInterestedNote,
                      onChange: (event) => setNotInterestedNote(event.target.value)
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "phd-demo-footer-actions", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "phd-demo-btn primary",
                    onClick: handleNotInterestedSubmit,
                    "data-locked": !notInterestedReason,
                    disabled: !notInterestedReason,
                    children: t("submit")
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "phd-demo-btn ghost",
                    onClick: handleBackToMain,
                    children: t("back")
                  }
                )
              ] })
            ] })
          ] })
        ]
      }
    )
  ] }) : null;
  const isBlockingHandle = mounted;
  const handle = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: "phd-handle-wrap",
      onClick: () => {
        if (isBlockingHandle) return;
        if (Date.now() < suppressOpenUntilRef.current) return;
        open();
      },
      onKeyDown: (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (isBlockingHandle) return;
          if (Date.now() < suppressOpenUntilRef.current) return;
          open();
        }
      },
      role: "button",
      tabIndex: 0,
      "aria-label": "Open demo engagement layer",
      style: { pointerEvents: isBlockingHandle ? "none" : "auto" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "phd-handle", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PHDLogo, { className: "phd-logo phd-handle__logo" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "phd-handle__label", children: "P. HEINIGER DESIGN" })
      ]
    }
  );
  const portalContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "phd-demo-portal phd-demo-layer", style: layerStyle, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "phd-leftLine", "aria-hidden": "true" }),
    handle,
    overlay
  ] });
  return isBrowser ? (0, import_react_dom.createPortal)(portalContent, document.body) : null;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DemoLayer
});

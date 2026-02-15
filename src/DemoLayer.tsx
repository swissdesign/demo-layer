import * as React from "react";
import { createPortal } from "react-dom";
import "./demoLayer.css";
import { postCollector } from "./collector";
import type { DemoLayerConfig } from "./types";

type Locale = "de" | "en" | "fr" | "it";

type LayerState = "hidden" | "open" | "minimized";
type Step = "main" | "intake" | "notInterested";
type Phase = "closed" | "opening" | "open" | "closing";

type IntakeState = {
  currentWebsite: string;
  q1: string;
  q2: string;
  q3: string;
  lastUpdated?: string;
  locale?: Locale;
};

type Props = {
  config: DemoLayerConfig;
};

const COPY = {
  title: {
    de: "Demo-Version von P. Heiniger Design",
    en: "Demo version by P. Heiniger Design",
    fr: "Version démo par P. Heiniger Design",
    it: "Versione demo di P. Heiniger Design",
  },
  body: {
    de: "Ich habe diese kurze Demo gebaut, weil ich glaube, dass Ihr Betrieb mit einem modernen Webauftritt und smarten Abläufen (Anfragen, Buchungen, Infos) spürbar profitieren kann. Schauen Sie sich kurz um und geben Sie mir danach ein kurzes Feedback.",
    en: "I built this short demo because I believe your business could gain real value from a modern website and smarter workflows (inquiries, bookings, information). Have a quick look around, then share brief feedback.",
    fr: "J'ai créé cette courte démo car je pense que votre entreprise peut gagner en valeur avec un site moderne et des flux plus intelligents (demandes, réservations, informations). Parcourez-la brièvement, puis laissez un feedback.",
    it: "Ho creato questa breve demo perché penso che la Sua attività possa ottenere più valore con un sito moderno e flussi più intelligenti (richieste, prenotazioni, informazioni). Dia un'occhiata e poi lasci un feedback breve.",
  },
  interested: {
    de: "Interessant",
    en: "Interested",
    fr: "Intéressant",
    it: "Interessante",
  },
  notInterested: {
    de: "Nicht interessant",
    en: "Not interested",
    fr: "Pas intéressé",
    it: "Non mi interessa",
  },
  closeToBar: {
    de: "Meine Demo ansehen",
    en: "View my custom demo site",
    fr: "Voir ma démo",
    it: "Vedi la mia demo",
  },
  tooltip: {
    de: "Bitte schauen Sie sich die Seite zuerst an, bevor Sie entscheiden.",
    en: "Please look at the site first before deciding.",
    fr: "Regardez d'abord le site avant de décider.",
    it: "Guardi prima il sito, poi decida.",
  },
  intakeIntro: {
    de: "Wenn Sie offen sind, helfen mir drei kurze Fragen, den Call effizient zu machen:",
    en: "If you're open to it, these three quick questions help make the call efficient:",
    fr: "Si vous êtes d'accord, trois questions rapides rendent l'appel plus efficace :",
    it: "Se è d'accordo, tre domande rapide rendono la call più efficace:",
  },
  demoLinkLabel: {
    de: "Demo-Link (automatisch)",
    en: "Demo link (auto)",
    fr: "Lien de la démo (auto)",
    it: "Link della demo (auto)",
  },
  copy: {
    de: "Kopieren",
    en: "Copy",
    fr: "Copier",
    it: "Copia",
  },
  copied: {
    de: "Kopiert",
    en: "Copied",
    fr: "Copié",
    it: "Copiato",
  },
  currentWebsiteLabel: {
    de: "Ihre aktuelle Website (optional)",
    en: "Your current website (optional)",
    fr: "Votre site actuel (optionnel)",
    it: "Il tuo sito attuale (opzionale)",
  },
  q1: {
    de: "1) Was ist aktuell der grösste Engpass an Ihrem Online-Auftritt? (z.B. Sichtbarkeit, Vertrauen, Anfragen, Buchungen, Infos)",
    en: "1) What's the biggest bottleneck in your online presence right now? (visibility, trust, inquiries, bookings, info)",
    fr: "1) Quel est le plus gros frein de votre présence en ligne aujourd'hui ? (visibilité, confiance, demandes, réservations, infos)",
    it: "1) Qual è il principale ostacolo della Sua presenza online oggi? (visibilità, fiducia, richieste, prenotazioni, info)",
  },
  q2: {
    de: "2) Wenn Ihre Website in 30 Tagen perfekt funktionieren würde: Was müsste sie konkret für Ihr Tagesgeschäft vereinfachen oder automatisieren?",
    en: "2) If your website worked perfectly in 30 days: what should it simplify or automate in your day-to-day operations?",
    fr: "2) Si votre site fonctionnait parfaitement dans 30 jours : que devrait-il simplifier ou automatiser au quotidien ?",
    it: "2) Se il sito funzionasse perfettamente tra 30 giorni: cosa dovrebbe semplificare o automatizzare nel lavoro quotidiano?",
  },
  q3: {
    de: "3) Woran würden Sie den Erfolg messen? Nennen Sie 1–2 Ziele (z.B. mehr Anfragen/Woche, höhere Buchungsrate, weniger Telefonzeit).",
    en: "3) How would you measure success? Name 1–2 targets (more inquiries/week, higher booking rate, less phone time).",
    fr: "3) Comment mesureriez-vous le succès ? Donnez 1–2 objectifs (plus de demandes/semaine, meilleur taux de réservation, moins d'appels).",
    it: "3) Come misurerebbe il successo? Indichi 1–2 obiettivi (più richieste/settimana, migliore tasso di prenotazione, meno telefonate).",
  },
  sendBook: {
    de: "Senden & Termin buchen",
    en: "Send & book a slot",
    fr: "Envoyer & réserver",
    it: "Invia & prenota",
  },
  skipBook: {
    de: "Überspringen & buchen",
    en: "Skip & book",
    fr: "Passer & réserver",
    it: "Salta & prenota",
  },
  back: {
    de: "Zurück",
    en: "Back",
    fr: "Retour",
    it: "Indietro",
  },
  helper: {
    de: "Falls Ihr Mail-Client nicht öffnet, schreiben Sie an design@pascalheiniger.ch.",
    en: "If your mail client did not open, email design@pascalheiniger.ch.",
    fr: "Si votre client mail ne s'ouvre pas, écrivez à design@pascalheiniger.ch.",
    it: "Se il client mail non si apre, scriva a design@pascalheiniger.ch.",
  },
  reasonLabel: {
    de: "Grund",
    en: "Reason",
    fr: "Raison",
    it: "Motivo",
  },
  reasonPlaceholder: {
    de: "Bitte auswählen",
    en: "Select a reason",
    fr: "Choisir une raison",
    it: "Seleziona un motivo",
  },
  contextLabel: {
    de: "Optional: kurzer Kontext",
    en: "Optional: context",
    fr: "Optionnel : contexte",
    it: "Opzionale: contesto",
  },
  submit: {
    de: "Senden",
    en: "Submit",
    fr: "Envoyer",
    it: "Invia",
  },
};

const LOCALE_LABELS: Record<Locale, string> = {
  de: "DE",
  en: "EN",
  fr: "FR",
  it: "IT",
};

const isBrowser = typeof window !== "undefined";
const PHDLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox="0 0 1024 768"
    role="img"
    aria-label="P. Heiniger Design"
  >
    <path
      fill="currentColor"
      d="M574.26,196.16s58.36-.56,44.29,57.38c-11.97,49.33-76.79,46.94-76.79,46.94l-36.02,89.75h22.78s31.73-78.89,31.73-78.89l84.98.2s85.24-.51,65.6,95.59c-20.87,102.11-141.08,94.08-141.08,94.08h-85.06l25.28-65h-22.84s-5.39,15.24-25.2,65c-49.82,125.19-172.48,61.38-148.65-18.07,18.09-58.24,56.15-84.92,95.29-90.48,39.27-5.57,45.49-2.44,57.84-33.48,12.35-31.04,46.29-116.3,46.29-116.3l-37.91-.05,18.58-46.69h80.88ZM564.74,242.89l-4.25,10.67s8.11,1.88,10.72-5.26c2.52-6.9-6.46-5.41-6.46-5.41M593.14,359.31l-12.32,30.92h33.08l-18.28,45.98h-33.1l-7.56,18.99h33.08s56.89-.38,71.65-48.04c15.47-49.92-33.39-48.1-33.39-48.1l-33.16.25ZM363.52,480.12c-20.35,51.87,32.65,54.87,46.29,21.04,13.63-33.83,25.12-64.76,25.12-64.76,0,0-52.65-4.1-71.41,43.72"
    />
  </svg>
);

const getInitialLocale = (
  config: DemoLayerConfig,
  localeKey: string,
): Locale => {
  if (isBrowser) {
    const stored = window.localStorage.getItem(localeKey);
    if (stored && config.locales.includes(stored as Locale)) {
      return stored as Locale;
    }
    const lang = window.navigator.language?.toLowerCase() ?? "";
    if (lang.startsWith("de")) return "de";
    if (lang.startsWith("fr")) return "fr";
    if (lang.startsWith("it")) return "it";
    return "en";
  }
  return config.defaultLocale as Locale;
};

const getSafeLocale = (config: DemoLayerConfig, locale: string): Locale => {
  if (config.locales.includes(locale as Locale)) return locale as Locale;
  return config.defaultLocale as Locale;
};

const readIntake = (
  intakeKey: string,
  currentWebsitePrefill?: string,
): IntakeState => {
  if (!isBrowser) {
    return {
      currentWebsite: currentWebsitePrefill ?? "",
      q1: "",
      q2: "",
      q3: "",
    };
  }
  const stored = window.localStorage.getItem(intakeKey);
  if (!stored) {
    return {
      currentWebsite: currentWebsitePrefill ?? "",
      q1: "",
      q2: "",
      q3: "",
    };
  }
  try {
    const parsed = JSON.parse(stored) as IntakeState & {
      websiteLink?: string;
    };
    const migratedWebsite = parsed.currentWebsite ?? parsed.websiteLink ?? "";
    return {
      currentWebsite: migratedWebsite,
      q1: parsed.q1 ?? "",
      q2: parsed.q2 ?? "",
      q3: parsed.q3 ?? "",
      lastUpdated: parsed.lastUpdated,
      locale: parsed.locale,
    };
  } catch {
    return {
      currentWebsite: currentWebsitePrefill ?? "",
      q1: "",
      q2: "",
      q3: "",
    };
  }
};

const readDismissedUntil = (dismissedKey: string): number => {
  if (!isBrowser) return 0;
  const stored = window.localStorage.getItem(dismissedKey);
  if (!stored) return 0;
  const value = Number(stored);
  return Number.isFinite(value) ? value : 0;
};

export const DemoLayer: React.FC<Props> = ({ config }) => {
  const localeKey = React.useMemo(
    () => `phd_demo_locale_v1:${config.demoId}`,
    [config.demoId],
  );
  const intakeKey = React.useMemo(
    () => `phd_demo_intake_v1:${config.demoId}`,
    [config.demoId],
  );
  const dismissedKey = "dismissed_until";

  const [state, setState] = React.useState<LayerState>("hidden");
  const [step, setStep] = React.useState<Step>("main");
  const [locale, setLocale] = React.useState<Locale>(
    getInitialLocale(config, localeKey),
  );
  const [isUnlocked, setIsUnlocked] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [notInterestedReason, setNotInterestedReason] = React.useState("");
  const [notInterestedNote, setNotInterestedNote] = React.useState("");
  const [intake, setIntake] = React.useState<IntakeState>(
    readIntake(intakeKey, config.currentWebsitePrefill),
  );
  const [showMailHelper, setShowMailHelper] = React.useState(false);
  const tooltipTimeoutRef = React.useRef<number | null>(null);
  const closeTimeoutRef = React.useRef<number | null>(null);
  const mailHelperTimeoutRef = React.useRef<number | null>(null);
  const copyTimeoutRef = React.useRef<number | null>(null);
  const splashTimeoutRef = React.useRef<number | null>(null);
  const openRafRef = React.useRef<number | null>(null);
  const autoOpenTimeoutRef = React.useRef<number | null>(null);
  const suppressOpenUntilRef = React.useRef(0);
  const [mounted, setMounted] = React.useState(false);
  const [phase, setPhase] = React.useState<Phase>("closed");
  const [demoUrl, setDemoUrl] = React.useState("");
  const [copied, setCopied] = React.useState(false);
  const [showSplash, setShowSplash] = React.useState(false);
  const animationMs = config.animationMs ?? 420;
  const collectorEnabled = Boolean(config.collectorEnabled && config.collectorUrl);
  const collectorTrackEvents =
    collectorEnabled && config.collectorTrackEvents !== false;
  const lastPhaseRef = React.useRef<Phase>(phase);

  const postToCollector = React.useCallback(
    (data: Record<string, string>) => {
      if (!collectorEnabled || !config.collectorUrl) return;
      const resolvedDemoUrl = demoUrl || (isBrowser ? window.location.href : "");
      const payload: Record<string, string> = {
        demoId: config.demoId,
        projectName: config.projectName ?? config.demoId,
        demoUrl: resolvedDemoUrl,
        locale,
        referrer: isBrowser ? document.referrer || "" : "",
        userAgent: isBrowser ? window.navigator.userAgent || "" : "",
        ...data,
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
      locale,
    ],
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
    const duration = config.splashMs ?? 900;
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
        phase,
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

    const payload: IntakeState = {
      currentWebsite: intake.currentWebsite,
      q1: intake.q1,
      q2: intake.q2,
      q3: intake.q3,
      lastUpdated: new Date().toISOString(),
      locale,
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

    const handleKeyDown = (event: KeyboardEvent) => {
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

  const startClose = (reason: string, persistDismiss = true) => {
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
        phase,
      });
    }
    if (persistDismiss && isBrowser) {
      const ttlMs = config.dismissTtlDays * 24 * 60 * 60 * 1000;
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
        phase,
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
        phase,
      });
    }
    setStep("notInterested");
  };

  const handleBackToMain = () => {
    setStep("main");
    setShowMailHelper(false);
  };

  const handleCopyDemoUrl = async () => {
    if (!isBrowser || !demoUrl) return;

    try {
      if (window.navigator.clipboard?.writeText) {
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
      }, 1000);
    } catch {
      // noop
    }
  };

  const handleLocaleChange = (nextLocale: Locale) => {
    setLocale(getSafeLocale(config, nextLocale));
  };

  const handleSendAndBook = () => {
    if (!isBrowser) return;

    window.open(config.schedulerUrl, "_blank", "noopener,noreferrer");

    const projectName = config.projectName ?? config.demoId;
    const resolvedDemoUrl = demoUrl || window.location.href;
    postToCollector({
      action: "lead",
      demoUrl: resolvedDemoUrl,
      currentWebsite: intake.currentWebsite.trim(),
      q1: intake.q1,
      q2: intake.q2,
      q3: intake.q3,
    });
    const bodyLines = [
      `Project: ${projectName}`,
      `DemoId: ${config.demoId}`,
      `Demo URL: ${resolvedDemoUrl}`,
    ];

    if (intake.currentWebsite.trim().length > 0) {
      bodyLines.push(`Current website: ${intake.currentWebsite.trim()}`);
    }

    bodyLines.push(
      `Q1: ${intake.q1 || "-"}`,
      `Q2: ${intake.q2 || "-"}`,
      `Q3: ${intake.q3 || "-"}`,
      `Locale: ${locale}`,
      `Time: ${new Date().toISOString()}`,
    );

    const subject = `[Demo: ${config.demoId}] Interested — Web intake`;
    const body = bodyLines.join("\n");

    const mailto = `mailto:${config.contactEmail}?subject=${encodeURIComponent(
      subject,
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
    if (!isBrowser) return;
    if (!notInterestedReason) return;

    const reason = config.reasons.find(
      (item) => item.value === notInterestedReason,
    );
    const reasonLabel = reason ? reason.labels[locale] : notInterestedReason;

    const projectName = config.projectName ?? config.demoId;
    const resolvedDemoUrl = demoUrl || window.location.href;
    postToCollector({
      action: "feedback",
      demoUrl: resolvedDemoUrl,
      reasonValue: notInterestedReason,
      reasonLabel,
      note: notInterestedNote,
    });

    const subject = `[Demo: ${config.demoId}] Not interested`;
    const body = [
      `Project: ${projectName}`,
      `DemoId: ${config.demoId}`,
      `Demo URL: ${resolvedDemoUrl}`,
      `Reason: ${notInterestedReason} (${reasonLabel})`,
      `Context: ${notInterestedNote || "-"}`,
      `Locale: ${locale}`,
      `Time: ${new Date().toISOString()}`,
    ].join("\n");

    const mailto = `mailto:${config.contactEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    startClose("not-interested");
  };

  if (!config.enabled) return null;

  const t = <T extends keyof typeof COPY>(key: T): string => {
    return COPY[key][locale] ?? COPY[key][config.defaultLocale as Locale];
  };

  const isLocked = !isUnlocked;
  const canSendIntake =
    intake.q1.trim().length > 0 && intake.q2.trim().length > 0;
  const layerStyle = {
    ["--phd-accent" as string]: config.theme.accent,
    ["--phd-panel-bg" as string]: config.theme.panelBg,
    ["--phd-handle-height" as string]: `${config.handleHeightPx ?? 76}px`,
    ["--phd-handle-width" as string]: `${config.handleWidthPx ?? 38}px`,
    ["--phd-handle-line-opacity" as string]: `${config.handleLineOpacity ?? 0.65}`,
    ["--phd-splash-ms" as string]: `${config.splashMs ?? 900}ms`,
    ["--phd-animation-ms" as string]: `${animationMs}ms`,
  };

  const panelState = phase;
  const overlayState = phase;

  const overlay = mounted ? (
    <>
      <div
        className="phd-overlay"
        data-phase={overlayState}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          startClose("overlay");
        }}
      />
      <div
        className="phd-panel"
        data-phase={panelState}
        role="dialog"
        aria-modal="true"
        onMouseDown={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        {showSplash && (
          <div className="phd-demo-splash" aria-hidden="true">
            <div className="phd-demo-splash-inner">
              <PHDLogo className="phd-logo phd-logo-splash" />
            </div>
          </div>
        )}
        <div className={`phd-demo-content ${showSplash ? "is-splashing" : ""}`}>
          <div className="phd-demo-brand">
            <PHDLogo className="phd-logo phd-logo-brand" />
            <div className="phd-demo-brand-text">P. HEINIGER DESIGN</div>
          </div>
          <div className="phd-demo-header">
            <h2 className="phd-demo-title">{t("title")}</h2>
            <div className="phd-demo-locale-toggle" aria-label="Locale">
              {config.locales.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  className={loc === locale ? "is-active" : undefined}
                  onClick={() => handleLocaleChange(loc)}
                >
                  {LOCALE_LABELS[loc]}
                </button>
              ))}
            </div>
          </div>

          {step === "main" && (
            <>
              <p className="phd-demo-body">{t("body")}</p>
              <div className="phd-demo-actions">
                <button
                  type="button"
                  className="phd-demo-btn primary"
                  data-locked={isLocked}
                  onClick={handleInterested}
                >
                  {t("interested")}
                </button>
                <button
                  type="button"
                  className="phd-demo-btn secondary"
                  data-locked={isLocked}
                  onClick={handleNotInterested}
                >
                  {t("notInterested")}
                </button>
                <button
                  type="button"
                  className="phd-demo-btn ghost"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    startClose("view-site");
                  }}
                >
                  {t("closeToBar")}
                </button>
                <div
                  className={`phd-demo-tooltip ${showTooltip ? "is-visible" : ""}`}
                >
                  {t("tooltip")}
                </div>
              </div>
            </>
          )}

          {step === "intake" && (
            <>
              <p className="phd-demo-body">{t("intakeIntro")}</p>
              <div className="phd-demo-section">
                <div className="phd-demo-field">
                  <label htmlFor="phd-demo-link">{t("demoLinkLabel")}</label>
                  <div id="phd-demo-link" className="phd-demo-demo-row">
                    <span className="phd-demo-demo-url">{demoUrl || "-"}</span>
                    <button
                      type="button"
                      className="phd-demo-btn tiny"
                      onClick={handleCopyDemoUrl}
                      disabled={!demoUrl}
                    >
                      {copied ? t("copied") : t("copy")}
                    </button>
                  </div>
                </div>
                <div className="phd-demo-field">
                  <label htmlFor="phd-current-website">
                    {t("currentWebsiteLabel")}
                  </label>
                  <input
                    id="phd-current-website"
                    type="url"
                    placeholder="https://"
                    value={intake.currentWebsite}
                    onChange={(event) =>
                      setIntake((prev) => ({
                        ...prev,
                        currentWebsite: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="phd-demo-field">
                  <label htmlFor="phd-q1">{t("q1")}</label>
                  <textarea
                    id="phd-q1"
                    value={intake.q1}
                    onChange={(event) =>
                      setIntake((prev) => ({
                        ...prev,
                        q1: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="phd-demo-field">
                  <label htmlFor="phd-q2">{t("q2")}</label>
                  <textarea
                    id="phd-q2"
                    value={intake.q2}
                    onChange={(event) =>
                      setIntake((prev) => ({
                        ...prev,
                        q2: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="phd-demo-field">
                  <label htmlFor="phd-q3">{t("q3")}</label>
                  <textarea
                    id="phd-q3"
                    value={intake.q3}
                    onChange={(event) =>
                      setIntake((prev) => ({
                        ...prev,
                        q3: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="phd-demo-footer-actions">
                <button
                  type="button"
                  className="phd-demo-btn primary"
                  onClick={handleSendAndBook}
                  data-locked={!canSendIntake}
                  disabled={!canSendIntake}
                >
                  {t("sendBook")}
                </button>
                <button
                  type="button"
                  className="phd-demo-btn secondary"
                  onClick={handleSkipAndBook}
                >
                  {t("skipBook")}
                </button>
                <button
                  type="button"
                  className="phd-demo-btn ghost"
                  onClick={handleBackToMain}
                >
                  {t("back")}
                </button>
              </div>
              {showMailHelper && (
                <div className="phd-demo-helper">{t("helper")}</div>
              )}
            </>
          )}

          {step === "notInterested" && (
            <>
              <div className="phd-demo-section">
                <div className="phd-demo-field">
                  <label htmlFor="phd-reason">{t("reasonLabel")}</label>
                  <select
                    id="phd-reason"
                    value={notInterestedReason}
                    onChange={(event) =>
                      setNotInterestedReason(event.target.value)
                    }
                  >
                    <option value="">{t("reasonPlaceholder")}</option>
                    {config.reasons.map((reason) => (
                      <option key={reason.value} value={reason.value}>
                        {reason.labels[locale]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="phd-demo-field">
                  <label htmlFor="phd-context">{t("contextLabel")}</label>
                  <textarea
                    id="phd-context"
                    value={notInterestedNote}
                    onChange={(event) =>
                      setNotInterestedNote(event.target.value)
                    }
                  />
                </div>
              </div>
              <div className="phd-demo-footer-actions">
                <button
                  type="button"
                  className="phd-demo-btn primary"
                  onClick={handleNotInterestedSubmit}
                  data-locked={!notInterestedReason}
                  disabled={!notInterestedReason}
                >
                  {t("submit")}
                </button>
                <button
                  type="button"
                  className="phd-demo-btn ghost"
                  onClick={handleBackToMain}
                >
                  {t("back")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  ) : null;

  const isBlockingHandle = mounted;
  const handle = (
    <div
      className="phd-handle-wrap"
      onClick={() => {
        if (isBlockingHandle) return;
        if (Date.now() < suppressOpenUntilRef.current) return;
        open();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (isBlockingHandle) return;
          if (Date.now() < suppressOpenUntilRef.current) return;
          open();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Open demo engagement layer"
      style={{ pointerEvents: isBlockingHandle ? "none" : "auto" }}
    >
      <div className="phd-handle">
        <PHDLogo className="phd-logo phd-handle__logo" />
      </div>
      <div className="phd-handle__label">P. HEINIGER DESIGN</div>
    </div>
  );

  const portalContent = (
    <div className="phd-demo-portal phd-demo-layer" style={layerStyle}>
      <div className="phd-leftLine" aria-hidden="true" />
      {handle}
      {overlay}
    </div>
  );

  return isBrowser ? createPortal(portalContent, document.body) : null;
};

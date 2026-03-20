import type { DemoLayerConfig } from "@pascalheiniger/demo-layer";

export const demoLayerConfig: DemoLayerConfig = {
  enabled: true,
  demoId: 'aurora',
  splashEnabled: true,
  splashMs: 900,
  handleHeightPx: 76,
  handleWidthPx: 38,
  handleLineOpacity: 0.65,
  animationMs: 420,
  studioName: 'P. Heiniger Design',
  contactEmail: 'design@pascalheiniger.ch',
  schedulerUrl: 'https://calendar.app.google/6BZHBKDxmYpMikvb7',
  collectorEnabled: true,
  collectorUrl:
    'https://script.google.com/macros/s/AKfycbzzyq1Z-FFBUfFXTPNwy_XYNcio80UfZE_ioBGjZ7p5KcTywpjS3lYzrgJ-2j_A69x_/exec',
  collectorTrackEvents: true,
  openDelayMs: 5000,
  unlockAfterMs: 12000,
  unlockOnScrollPx: 120,
  dismissTtlDays: 7,
  locales: ['de', 'en', 'fr', 'it'] as const,
  defaultLocale: 'de',
  theme: {
    accent: '#ff4da6',
    panelBg: '#0b0b0b',
  },
  reasons: [
    {
      value: 'style',
      labels: {
        de: 'Stil / Look & Feel',
        en: 'Style / look & feel',
        fr: 'Style / look & feel',
        it: 'Stile / look & feel',
      },
    },
    {
      value: 'scope',
      labels: {
        de: 'Umfang / Aufwand',
        en: 'Scope / complexity',
        fr: 'Périmètre / complexité',
        it: 'Ambito / complessità',
      },
    },
    {
      value: 'missing',
      labels: {
        de: 'Fehlende Funktion',
        en: 'Missing feature',
        fr: 'Fonction manquante',
        it: 'Funzione mancante',
      },
    },
    {
      value: 'timing',
      labels: {
        de: 'Timing / Dringlichkeit',
        en: 'Timing / priority',
        fr: 'Timing / priorité',
        it: 'Timing / priorità',
      },
    },
    {
      value: 'other',
      labels: {
        de: 'Anderes',
        en: 'Other',
        fr: 'Autre',
        it: 'Altro',
      },
    },
  ],
};

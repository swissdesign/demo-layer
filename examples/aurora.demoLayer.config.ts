export type DemoLayerConfig = {
  enabled: boolean;
  demoId: string;
  projectName?: string;
  currentWebsitePrefill?: string;
  headerOffsetSelectors?: string[];
  splashMs?: number;
  splashEnabled?: boolean;
  handleHeightPx?: number;
  handleWidthPx?: number;
  handleLineOpacity?: number;
  animationMs?: number;
  studioName: string;
  contactEmail: string;
  schedulerUrl: string;
  openDelayMs: number;
  unlockAfterMs: number;
  unlockOnScrollPx: number;
  dismissTtlDays: number;
  barHeightPx: number;
  locales: readonly ['de', 'en', 'fr', 'it'];
  defaultLocale: 'de' | 'en' | 'fr' | 'it';
  theme: {
    barBg: string;
    accent: string;
    panelBg: string;
  };
  reasons: Array<{
    value: string;
    labels: {
      de: string;
      en: string;
      fr: string;
      it: string;
    };
  }>;
};

export const demoLayerConfig: DemoLayerConfig = {
  enabled: true,
  demoId: 'aurora',
  // If your sticky header uses different selectors, update this list.
  headerOffsetSelectors: [
    'header',
    'nav',
    '.navbar',
    '.nav',
    '.site-header',
    '.header',
    '#header',
    '#navbar',
  ],
  splashEnabled: true,
  splashMs: 900,
  handleHeightPx: 76,
  handleWidthPx: 38,
  handleLineOpacity: 0.65,
  animationMs: 420,
  studioName: 'P. Heiniger Design',
  contactEmail: 'design@pascalheiniger.ch',
  schedulerUrl: 'https://calendar.app.google/6BZHBKDxmYpMikvb7',
  openDelayMs: 5000,
  unlockAfterMs: 12000,
  unlockOnScrollPx: 120,
  dismissTtlDays: 7,
  barHeightPx: 44,
  locales: ['de', 'en', 'fr', 'it'] as const,
  defaultLocale: 'de',
  theme: {
    barBg: '#000',
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

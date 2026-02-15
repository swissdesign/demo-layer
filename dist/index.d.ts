import * as React from 'react';

type DemoLayerTransport = {
    type: "mailto";
} | {
    type: "http";
    endpoint: string;
    apiKeyHeader?: string;
};
type DemoLayerConfig = {
    enabled: boolean;
    demoId: string;
    projectName?: string;
    studioName: string;
    contactEmail: string;
    schedulerUrl: string;
    transport?: DemoLayerTransport;
    collectorEnabled?: boolean;
    collectorUrl?: string;
    collectorToken?: string;
    collectorTrackEvents?: boolean;
    locales: Array<"de" | "en" | "fr" | "it">;
    defaultLocale: "de" | "en" | "fr" | "it";
    openDelayMs: number;
    unlockAfterMs: number;
    unlockOnScrollPx: number;
    dismissTtlDays: number;
    currentWebsitePrefill?: string;
    splashEnabled?: boolean;
    splashMs?: number;
    animationMs?: number;
    handleHeightPx?: number;
    handleWidthPx?: number;
    handleLineOpacity?: number;
    theme: {
        accent: string;
        panelBg: string;
    };
    reasons: Array<{
        value: string;
        labels: Record<"de" | "en" | "fr" | "it", string>;
    }>;
};

type Props = {
    config: DemoLayerConfig;
};
declare const DemoLayer: React.FC<Props>;

export { DemoLayer, type DemoLayerConfig, type DemoLayerTransport };

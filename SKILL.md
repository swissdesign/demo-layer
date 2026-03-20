---
name: inject-demo-layer
description: Injects the P. Heiniger Design Demo Layer (lead-capture overlay) into a Vite/React or Astro application.
trigger: "inject the demo overlay"
model_preference: GPT-OSS / Claude 4.6
---

# INSTRUCTION
Your task is to integrate the proprietary `@pascalheiniger/demo-layer` into the current application. You must follow these steps precisely based on the detected framework (Astro vs. Pure React). 

## STEP 1: Add Dependency
Modify `package.json`. Add the following to the `dependencies` object:
`"@pascalheiniger/demo-layer": "github:swissdesign/demo-layer#v0.1.4"`
Do not remove any existing dependencies. 

## STEP 2: Create the Configuration File
Create a new file at `src/demoLayer.config.ts`. 
For the `demoId` and `projectName`, extract the `name` field from `package.json`. If none exists, use "phd-demo".
Use this exact template:

\`\`\`typescript
import type { DemoLayerConfig } from "@pascalheiniger/demo-layer";

export const demoLayerConfig = {
  enabled: true,
  demoId: "YOUR_EXTRACTED_ID",
  projectName: "YOUR_EXTRACTED_ID",
  
  // Collector & Analytics Setup
  collectorEnabled: true,
  collectorUrl: import.meta.env.VITE_DEMO_COLLECTOR_URL || "",
  collectorToken: import.meta.env.VITE_DEMO_COLLECTOR_TOKEN || "",
  collectorTrackEvents: true,

  splashEnabled: true,
  splashMs: 900,
  handleHeightPx: 76,
  handleWidthPx: 38,
  handleLineOpacity: 0.65,
  animationMs: 420,
  studioName: "P. Heiniger Design",
  contactEmail: "design@pascalheiniger.ch",
  schedulerUrl: "https://calendar.app.google/6BZHBKDxmYpMikvb7",
  openDelayMs: 5000,
  unlockAfterMs: 12000,
  unlockOnScrollPx: 120,
  dismissTtlDays: 7,
  locales: ["de", "en", "fr", "it"] as const,
  defaultLocale: "de",
  theme: { accent: "#ff4da6", panelBg: "#0b0b0b" },
  reasons: [
    { value: "style", labels: { de: "Stil / Look & Feel", en: "Style / look & feel", fr: "Style / look & feel", it: "Stile / look & feel" } },
    { value: "scope", labels: { de: "Umfang / Aufwand", en: "Scope / complexity", fr: "Périmètre / complexité", it: "Ambito / complessità" } },
    { value: "missing", labels: { de: "Fehlende Funktion", en: "Missing feature", fr: "Fonction manquante", it: "Funzione mancante" } },
    { value: "timing", labels: { de: "Timing / Dringlichkeit", en: "Timing / priority", fr: "Timing / priorité", it: "Timing / priorità" } },
    { value: "other", labels: { de: "Anderes", en: "Other", fr: "Autre", it: "Altro" } },
  ],
} satisfies DemoLayerConfig;
\`\`\`

## STEP 3: Detect Framework & Inject
Check the `package.json` dependencies to determine the framework.

### IF ASTRO (has `astro` in dependencies):
1. Locate the main layout file (usually `src/layouts/Layout.astro`).
2. Inside the frontmatter (the `---` block at the top), add:
   `import { DemoLayer as PHDDemoLayer } from "@pascalheiniger/demo-layer";`
   `import "@pascalheiniger/demo-layer/demoLayer.css";`
   `import { demoLayerConfig } from "../demoLayer.config";`
3. Inside the `<body>` tag (preferably at the very end, just before `</body>`), add the React Island:
   `<PHDDemoLayer config={demoLayerConfig} client:only="react" />`

### IF PURE VITE/REACT (has `react` but NO `astro`):
1. Locate the root component (usually `src/App.tsx` or `src/main.tsx`).
2. Add imports at the top:
   `import { DemoLayer as PHDDemoLayer } from "@pascalheiniger/demo-layer";`
   `import "@pascalheiniger/demo-layer/demoLayer.css";`
   `import { demoLayerConfig } from "./demoLayer.config";`
3. Place `<PHDDemoLayer config={demoLayerConfig} />` as high in the component tree as possible (but not wrapping the app).

## STEP 4: Terminal Execution
Run `npm install` in the terminal to fetch the updated dependencies.

## CRITICAL RULES
- Do NOT delete or modify existing UI components.
- In Astro, you MUST use `client:only="react"` to ensure the overlay renders purely on the client side.
- Your only job is injection. Act like a surgical tool.
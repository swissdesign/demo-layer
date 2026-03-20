---
name: inject-demo-layer
description: Injects the P. Heiniger Design Demo Layer (lead-capture overlay) into a Vite/React or Astro application.
trigger: "inject the demo overlay"
model_preference: GPT-OSS / Claude 4.6
---

# INSTRUCTION
Your task is to integrate `@pascalheiniger/demo-layer` into the current application. Follow these steps precisely. Do not modify any existing UI, routes, or business logic.

---

## STEP 1: Add Dependency

In `package.json`, add to the `dependencies` object:
```
"@pascalheiniger/demo-layer": "github:swissdesign/demo-layer#v0.1.6"
```
Do not remove any existing dependencies.

---

## STEP 2: Create the Configuration File

**Determine the demoId:** Read `package.json` `name` field. Strip any scope prefix (e.g. `@scope/`), replace spaces and slashes with hyphens, lowercase everything. Use this as `demoId` and `projectName`. If `name` is missing use `"phd-demo"`.

**Create the file at `src/demoLayer.config.ts`** (always inside `src/`, never at the project root):
```typescript
import type { DemoLayerConfig } from "@pascalheiniger/demo-layer";

export const demoLayerConfig = {
  enabled: true,
  demoId: "REPLACE_WITH_EXTRACTED_ID",
  projectName: "REPLACE_WITH_EXTRACTED_ID",

  collectorEnabled: true,
  collectorUrl: "https://script.google.com/macros/s/AKfycbzzyq1Z-FFBUfFXTPNwy_XYNcio80UfZE_ioBGjZ7p5KcTywpjS3lYzrgJ-2j_A69x_/exec",
  collectorToken: "REPLACE_WITH_COLLECTOR_TOKEN",
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
```

---

## STEP 3: Detect Framework and Inject

Check `package.json` dependencies.

### IF ASTRO (has `"astro"` in dependencies or devDependencies):

1. Find the main layout file. Look for `src/layouts/Layout.astro` or `src/layouts/BaseLayout.astro`. If neither exists, find the `.astro` file most likely to be the root layout.

2. In the frontmatter `---` block at the top, add these three imports:
```
import { DemoLayer as PHDDemoLayer } from "@pascalheiniger/demo-layer";
import "@pascalheiniger/demo-layer/demoLayer.css";
import { demoLayerConfig } from "../demoLayer.config";
```
Note: the import path `"../demoLayer.config"` is correct when the layout is inside `src/layouts/` and the config is at `src/demoLayer.config.ts`.

3. Inside the `<body>` tag, just before `</body>`, add:
```
<PHDDemoLayer config={demoLayerConfig} client:only="react" />
```

### IF PURE VITE/REACT (has `"react"` but NO `"astro"`):

1. Find the root component file. Check in this order: `src/App.tsx`, `src/App.jsx`, `src/main.tsx`, `src/main.jsx`. Use the first one that exists and contains JSX.

2. Add these three imports at the top of that file:
```typescript
import { DemoLayer as PHDDemoLayer } from "@pascalheiniger/demo-layer";
import "@pascalheiniger/demo-layer/demoLayer.css";
import { demoLayerConfig } from "./demoLayer.config";
```
The import path `"./demoLayer.config"` is correct because both `App.tsx` and `demoLayer.config.ts` are inside `src/`.

3. Place `<PHDDemoLayer config={demoLayerConfig} />` as a sibling inside the outermost JSX return — not wrapping the app, just alongside the existing content.

---

## STEP 4: Run npm install
```
npm install
```

This fetches the package from GitHub. Confirm it completes without errors.

---

## STEP 5: Verify Build

Run:
```
npm run build
```

The build must pass with no errors. If it fails:
- Check that `src/demoLayer.config.ts` exists
- Check that the import path in App.tsx or the layout file exactly matches the relative path to `src/demoLayer.config.ts`
- Check that `@pascalheiniger/demo-layer` is present in `node_modules` after npm install

Do not proceed if the build fails.

---

## CRITICAL RULES
- The config file goes in `src/demoLayer.config.ts` — never in the project root
- Import paths must reflect actual file locations — verify before writing
- Do NOT modify any existing routes, components, or styles
- In Astro, always use `client:only="react"` on the component
- Run `npm run build` and confirm it passes before finishing
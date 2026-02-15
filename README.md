# Demo Layer

A lightweight React demo engagement layer with optional collector integration.

## Install
- GitHub (until published): `npm install git+https://github.com/pheiniger/demo-layer.git`
- npm (later): `npm install @pascalheiniger/demo-layer`

## Usage
```tsx
import { DemoLayer } from "@pascalheiniger/demo-layer";
import "@pascalheiniger/demo-layer/demoLayer.css";

export function App() {
  return <DemoLayer config={/* your config */} />;
}
```

## Collector (optional)
- Set `collectorEnabled: true` and `collectorUrl` in your config (optionally `collectorToken` and `collectorTrackEvents`).
- Data posts are fire-and-forget via `navigator.sendBeacon`/`fetch` with `no-cors` as `FormData` or `application/x-www-form-urlencoded`.
- The collector expects Google Sheet tabs named `leads`, `feedback`, and `events`.

### Collector config example
```ts
const config = {
  collectorEnabled: true,
  collectorUrl:
    "https://script.google.com/macros/s/AKfycbzzyq1Z-FFBUfFXTPNwy_XYNcio80UfZE_ioBGjZ7p5KcTywpjS3lYzrgJ-2j_A69x_/exec",
  collectorTrackEvents: true,
  collectorToken: "optional-token",
};
```

## Next.js note
If you use Next.js, import the CSS in your app entry (`pages/_app.tsx` or `app/layout.tsx`):
`import "@pascalheiniger/demo-layer/demoLayer.css";`

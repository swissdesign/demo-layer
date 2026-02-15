# Demo Layer

## Collector (optional)
- Set `collectorEnabled: true` and `collectorUrl` in your config (optionally `collectorToken` and `collectorTrackEvents`).
- Data posts are fire-and-forget via `navigator.sendBeacon`/`fetch` with `no-cors` as `FormData` or `application/x-www-form-urlencoded`.
- The collector expects Google Sheet tabs named `leads`, `feedback`, and `events`.

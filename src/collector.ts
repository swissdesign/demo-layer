export function postCollector(
  url: string,
  data: Record<string, string>,
): void {
  try {
    const payload = { ...data, hp: "" };
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon === "function"
    ) {
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
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body,
      });
    }
  } catch {
    // noop
  }
}

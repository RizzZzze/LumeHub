// Lumera Testnet LCD Endpoints (expanded node pool)
// These endpoints are used to query the Lumera blockchain (testnet).
// The app will try each endpoint in order until a successful response is found.
// If all endpoints fail (due to CORS, downtime, or timeout), it will
// gracefully return dummy data to prevent breaking the UI.

export const LCDS = [
  // From ecosystem operators
  "https://lumera-testnet-api.linknode.org",
  "https://lumera-testnet-rest.stakerhouse.com",
  "https://lumera-testnet-api.polkachu.com",
  "https://lumera-testnet.api.decentrio.ventures",
  "https://lumera-testnet-api.corenodehq.xyz",
  "https://lumera-testnet-api.mekonglabs.tech",
  // From original set
  "https://lumera-testnet.api.kjnodes.com",
  "https://api.lumera-t.nodevism.com",
  "https://api.t.lumera.bh.rocks:443"
];

// getJSON() helper
// This helper fetches JSON data from the Lumera LCD endpoints.
// It includes:
//  • a timeout guard (6s per endpoint)
//  • sequential fallback if one endpoint fails
//  • offline dummy data as a last resort (to avoid UI errors)

export async function getJSON(path) {
  // Timeout wrapper using AbortController
  const withTimeout = (ms, doFetch) => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort("timeout"), ms);
    return doFetch(ctrl.signal).finally(() => clearTimeout(timer));
  };

  let lastErr = null;

  for (const base of LCDS) {
    const url = `${base}${path}`;
    try {
      const res = await withTimeout(6000, (signal) =>
        fetch(url, { signal, headers: { accept: "application/json" } })
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      lastErr = e;
      // Try the next available endpoint
    }
  }

  // All endpoints failed → don’t break the UI, return dummy data instead.
  return { _offline: true, items: [] };
}

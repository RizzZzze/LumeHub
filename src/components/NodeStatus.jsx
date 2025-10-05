import React, { useEffect, useState } from "react";
import { LCDS } from "../config.js";

const TEST_PATH = "/cosmos/base/tendermint/v1beta1/blocks/latest";

async function ping(base) {
  const started = performance.now();
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort("timeout"), 5000);
    const r = await fetch(base + TEST_PATH, {
      signal: ctrl.signal,
      headers: { accept: "application/json" },
      cache: "no-store",
    });
    clearTimeout(t);
    return { base, ok: r.ok, ms: Math.round(performance.now() - started), status: r.status };
  } catch (e) {
    return { base, ok: false, ms: Math.round(performance.now() - started), err: String(e) };
  }
}

export default function NodeStatus() {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const out = [];
      for (const base of LCDS) out.push(await ping(base));
      if (!alive) return;
      out.sort((a,b) => Number(b.ok) - Number(a.ok) || a.ms - b.ms);
      setRows(out);
    })();
    return () => { alive = false; };
  }, []);

  if (!rows) return <p>Checking endpoints…</p>;

  return (
    <div style={{maxWidth:900}}>
      <h2>Node Status</h2>
      <div className="table-wrap">
        <table className="clean">
          <thead>
            <tr>
              <th style={{textAlign:"left"}}>Endpoint</th>
              <th style={{textAlign:"left"}}>OK</th>
              <th style={{textAlign:"left"}}>Latency</th>
              <th style={{textAlign:"left"}}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td style={{wordBreak:"break-all"}}>{r.base}</td>
                <td>{r.ok ? "✅" : "❌"}</td>
                <td>{r.ms} ms</td>
                <td>{r.status || r.err || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


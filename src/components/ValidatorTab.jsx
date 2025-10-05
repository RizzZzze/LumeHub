import React, { useEffect, useState } from "react";
import { getJSON } from "../config.js";

const nf = new Intl.NumberFormat("en-US", { maximumFractionDigits: 3 });

function statusBadge(status) {
  const s = String(status || "").toLowerCase();
  if (s.includes("bonded")) return <span className="badge bonded">BONDED</span>;
  if (s.includes("unbonding")) return <span className="badge unbonding">UNBONDING</span>;
  return <span className="badge unbonded">UNBONDED</span>;
}

export default function ValidatorTab() {
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const url = "/cosmos/staking/v1beta1/validators?pagination.limit=300";
        const data = await getJSON(url);
        const list = (data?.validators || []).map(v => ({
          moniker: v?.description?.moniker ?? "-",
          votingPower: Number(v?.tokens ?? 0) / 1e6, // assume ulume -> lume
          commission: Number(v?.commission?.commission_rates?.rate ?? 0) * 100,
          status: v?.status ?? "BOND_STATUS_UNBONDED",
        }));
        if (alive) setRows(list);
      } catch (e) {
        if (alive) setErr(e.message || String(e));
      }
    })();
    return () => { alive = false; };
  }, []);

  if (err) return <p style={{color:"#ff9c9c"}}>Failed to load validators: {err}</p>;
  if (!rows) return <p>Loading validators…</p>;

  rows.sort((a,b) => (b.votingPower - a.votingPower));

  return (
    <div>
      <h2>🛠 Validators</h2>
      <div className="table-wrap">
        <table className="clean">
          <thead>
            <tr>
              <th style={{textAlign:"left"}}>#</th>
              <th style={{textAlign:"left"}}>Moniker</th>
              <th className="num">Voting Power</th>
              <th className="num">Commission</th>
              <th style={{textAlign:"left"}}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{i+1}</td>
                <td style={{maxWidth:280, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{r.moniker}</td>
                <td className="num">{nf.format(r.votingPower)}</td>
                <td className="num">{nf.format(r.commission)}%</td>
                <td>{statusBadge(r.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{opacity:.7, marginTop:8}}>Sorted by voting power (desc). Numbers are in <code>lume</code>.</p>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { getJSON } from "../config.js";
export default function WalletTab(){
  const [addr,setAddr]=useState(""); const [balances,setBalances]=useState(null); const [err,setErr]=useState("");
  useEffect(()=>{ if(!addr){setBalances(null);return;}
    (async()=>{try{
      setErr(""); setBalances(null);
      const d=await getJSON(`/cosmos/bank/v1beta1/balances/${addr}`);
      setBalances(d.balances||[]);
    }catch(e){setErr("Failed to load balances.");}})();
  },[addr]);
  return (
    <div style={{display:"grid",gap:12}}>
      <h3>🪙 Wallet</h3>
      <input placeholder="Enter Lumera bech32 address…" value={addr} onChange={e=>setAddr(e.target.value.trim())}
        style={{padding:10,borderRadius:8,border:"1px solid #36365a",background:"rgba(255,255,255,0.02)",color:"white"}}/>
      {!addr && <p style={{opacity:.8}}>Tip: paste any known testnet address to see balances.</p>}
      {err && <p style={{color:"#fca5a5"}}>{err}</p>}
      {balances && balances.length>0 && <ul>{balances.map(b=><li key={b.denom}>{b.denom}: {Number(b.amount).toLocaleString()}</li>)}</ul>}
      {balances && balances.length===0 && <p>No balances found.</p>}
    </div>
  );
}

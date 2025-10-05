import React, { useState } from "react";
import { getJSON } from "../config.js";
export default function CosmWasmPlayground(){
  const [contract,setContract]=useState(""); const [query,setQuery]=useState(`{"get_config":{}}`);
  const [result,setResult]=useState(null); const [err,setErr]=useState("");
  const run = async () => {
    try{
      setErr(""); setResult(null);
      JSON.parse(query); // validate JSON
      const encoded = btoa(query);
      const d = await getJSON(`/cosmwasm/wasm/v1/contract/${contract}/smart/${encoded}`);
      setResult(d);
    }catch(e){ setErr("Query failed (invalid JSON or endpoint error)."); }
  };
  return (
    <div style={{display:"grid",gap:12}}>
      <h3>🧠 CosmWasm Playground</h3>
      <input placeholder="Contract address" value={contract} onChange={e=>setContract(e.target.value.trim())}
        style={{padding:10,borderRadius:8,border:"1px solid #36365a",background:"rgba(255,255,255,0.02)",color:"white"}}/>
      <textarea rows={3} value={query} onChange={e=>setQuery(e.target.value)}
        style={{padding:10,borderRadius:8,border:"1px solid #36365a",background:"rgba(255,255,255,0.02)",color:"white"}}/>
      <button onClick={run} style={{padding:"10px 14px",borderRadius:8,border:"none",background:"rgba(0,255,255,0.12)",color:"white",cursor:"pointer"}}>Run Query</button>
      {err && <p style={{color:"#fca5a5"}}>{err}</p>}
      {result && <pre style={{background:"rgba(255,255,255,0.05)",padding:10,borderRadius:8,overflowX:"auto"}}>{JSON.stringify(result,null,2)}</pre>}
    </div>
  );
}

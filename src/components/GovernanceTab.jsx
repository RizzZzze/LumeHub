import React, { useEffect, useState } from "react";
import { getJSON } from "../config.js";
export default function GovernanceTab(){
  const [list,setList]=useState(null); const [err,setErr]=useState("");
  useEffect(()=>{(async()=>{try{
    const d=await getJSON("/cosmos/gov/v1beta1/proposals");
    setList(d.proposals||[]);
  }catch(e){setErr("Failed to load proposals.");}})()},[]);
  return (
    <div>
      <h3>🏛 Governance Proposals</h3>
      {!list && !err && <p>Loading proposals...</p>}
      {err && <p style={{color:"#fca5a5"}}>{err}</p>}
      {list && list.length>0 && (
        <ul style={{margin:0,paddingLeft:18}}>
          {list.map(p=>(
            <li key={p.proposal_id} style={{margin:"6px 0"}}>
              <strong>#{p.proposal_id}</strong> — {p.title || p.content?.title || "Untitled"}
              <span style={{opacity:.8}}> (status: {p.status})</span>
            </li>
          ))}
        </ul>
      )}
      {list && list.length===0 && <p>No proposals.</p>}
    </div>
  );
}

import React, { useState } from "react";
import WalletTab from "./components/WalletTab.jsx";
import ValidatorTab from "./components/ValidatorTab.jsx";
import GovernanceTab from "./components/GovernanceTab.jsx";
import CosmWasmPlayground from "./components/CosmWasmPlayground.jsx";
import NodeStatus from "./components/NodeStatus.jsx";

const TABS = [
  { id: "wallet", label: "Wallet" },
  { id: "validators", label: "Validators" },
  { id: "governance", label: "Governance" },
  { id: "wasm", label: "Wasm" },
  { id: "nodes", label: "Nodes" }, // ← NEW
];

export default function App() {
  const [tab, setTab] = useState("wallet");

  return (
    <div style={{ padding: "24px" }}>
      <header style={{ marginBottom: 16 }}>
        <span style={{ fontSize: "1.6rem", fontWeight: 700 }}>LumeHub</span>
        <div style={{ opacity: .7 }}>Your all-in-one Lumera Testnet Explorer</div>
      </header>

      <nav className="tabbar" style={{ marginBottom: 16 }}>
        {TABS.map(t => (
          <button
            key={t.id}
            className={"tabbtn " + (tab === t.id ? "active" : "")}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === "wallet" && <WalletTab />}
      {tab === "validators" && <ValidatorTab />}
      {tab === "governance" && <GovernanceTab />}
      {tab === "wasm" && <CosmWasmPlayground />}
      {tab === "nodes" && <NodeStatus />} {/* ← render NodeStatus */}
    </div>
  );
}

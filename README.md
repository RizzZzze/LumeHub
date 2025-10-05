# 🌌 LumeHub — Lumera Testnet Explorer (Frontend-only)

[![Live Demo](https://img.shields.io/badge/Live%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://lume-hub.vercel.app/)
[![Lumera Network](https://img.shields.io/badge/Lumera-Testnet-blue?style=for-the-badge)](https://lumera.io)

A **read-only DApp** that pulls real data from the **Lumera testnet LCD** — no backend required.  
It provides a clean UI for viewing on-chain data modules:

### 🧩 Modules
- 💰 **Wallet** — check balances by address  
- 🧠 **Validators** — staking module and validator info  
- 🏛 **Governance** — view proposals and statuses  
- 🧬 **CosmWasm Playground** — test smart queries interactively  
- 🛰 **Node Status** — shows endpoint uptime and latency  

**Endpoints used:**  
KJNodes (primary), Nodevism, BlockHunters (fallbacks)

---

## ⚙️ Run Locally

```bash
npm install
npm run dev

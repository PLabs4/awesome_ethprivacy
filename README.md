# Ethereum Native Privacy Landscape

Living sketch of design questions for **native privacy on Ethereum** — what must stay private on L1, which primitives and protocols fit, and how that stacks with compliance, post-quantum, and backward compatibility.

**Interactive map:** [https://plabs4.github.io/awesome_ethprivacy/](https://plabs4.github.io/awesome_ethprivacy/) · continuously updated

Not an official roadmap.

---

## Categories

| Category | Focus |
|---|---|
| **Privacy** | Scope, primitives, ZK notes, amount / address privacy, gas sponsorship, shared UTXO pool |
| **Compliance** | Association sets, Proof of Innocence, frozen-note policy without deanonymizing users |
| **Post-quantum** | PQ replacements for ECDSA, BLS, and pairing SNARKs used by private spends |
| **Backward compatibility** | ETH/ERC-20, private tokens, wallets, EOAs, DeFi bridges, Private DeFi |

---

## Topics & links

### Privacy

| Topic | Links |
|---|---|
| L1 privacy scope | [Kohaku Roadmap](https://notes.ethereum.org/@niard/KohakuRoadmap) · [Vitalik — simple L1 privacy roadmap](https://ethereum-magicians.org/t/a-maximally-simple-l1-privacy-roadmap/23459) |
| Primitives (ZK / FHE / MPC / TEE) | [Aztec — Is ZK-MPC-FHE-TEE a real creature?](https://aztec.network/blog/is-zk-mpc-fhe-tee-a-real-creature) |
| Why ZK | [Zcash Protocol Spec](https://zips.z.cash/protocol/protocol.pdf) · [Local Merkle witness demo](./zcash-local-witness-flow.html) |
| Amount & address privacy (notes) | [PLabs — Privacy101 / Orchard](https://x.com/_PLabs/status/2065052710228152360) · [Local Merkle witness demo](./zcash-local-witness-flow.html) |
| Gas sponsorship | [EIP-8141 Frame Transactions](https://eips.ethereum.org/EIPS/eip-8141) |
| Shared UTXO pool | [EIP-8182 Private ETH and ERC-20 Transfers](https://eips.ethereum.org/EIPS/eip-8182) |

### Compliance

| Topic | Links |
|---|---|
| Deposit association sets (ASP) | [Privacy Pools paper](https://privacypools.com/whitepaper.pdf) · [ASP docs](https://docs.privacypools.com/layers/asp) |
| Proof of Innocence | [Railgun POI](https://docs.railgun.org/wiki/assurance/private-proofs-of-innocence) |
| Association note sets | Prove note ∉ frozen set on every spend (governance still open) |

### Post-quantum

| Topic | Links |
|---|---|
| ECDSA → hash-based sigs | [SPHINCS- on EVM](https://ethresear.ch/t/sphincs-minus-efficient-stateless-post-quantum-signature-verification-on-the-evm/25165) · [leanSPHINCS / leanVM](https://github.com/leanEthereum/leanVM) |
| BLS → leanXMSS + aggregation | [leanVM](https://github.com/leanEthereum/leanVM) |
| Pairing SNARK → recursive STARK | [leanVM](https://github.com/leanEthereum/leanVM) |

### Backward compatibility

| Topic | Links |
|---|---|
| ETH & ERC-20 shield / unshield | Railgun · Privacy Pools · PLabs (see projects below) |
| Private fungible tokens | [ERC-8302 pERC20](https://github.com/ethereum/ERCs/pull/1817) |
| Wallets / SDK | [Kohaku](https://github.com/ethereum/kohaku) · [Roadmap](https://notes.ethereum.org/@niard/KohakuRoadmap) |
| EOA privacy txs | [EIP-8141](https://eips.ethereum.org/EIPS/eip-8141) |
| Concurrent private spends | [EIP-8250 Keyed Nonces](https://eips.ethereum.org/EIPS/eip-8250) |
| Nullifier / note state scaling | [Vitalik note](https://x.com/VitalikButerin/status/2051675198068330996) |
| Public DeFi interaction | [Railgun DEX / Adapt flow](https://docs.railgun.org/wiki/learn/integrating-railgun/example-dex-swaps) |
| Private DeFi | PLabs and related programmable private layers |

---

## Projects & Twitter

| Project | Role (short) | Twitter / X |
|---|---|---|
| **PLabs** | Notes, amount/address privacy education, private DeFi direction, EIP work | [@_PLabs](https://x.com/_PLabs) |
| **Railgun** | Shielded pool, POI, private↔public DeFi (Adapt) | [@RAILGUN_Project](https://x.com/RAILGUN_Project) |
| **Privacy Pools / 0xbow** | Association sets, ASP, ragequit path | [@0xbowio](https://x.com/0xbowio) |
| **Tornado Cash** | Classic fixed-denomination pool / relayer pattern | [@TornadoCash](https://x.com/TornadoCash) |
| **Aztec** | Client ZK + privacy stack writing; L2 privacy | [@aztecnetwork](https://x.com/aztecnetwork) |
| **Kohaku** (EF) | Privacy SDK + reference wallet | [GitHub](https://github.com/ethereum/kohaku) |
| **leanEthereum / leanVM** | PQ signatures + recursive STARK proving path | [GitHub](https://github.com/leanEthereum/leanVM) |
| **Zcash** | Production note / nullifier blueprint for private money | [@zcash](https://x.com/zcash) |

---

## Local preview

```bash
python3 -m http.server 8765
```

Open http://localhost:8765

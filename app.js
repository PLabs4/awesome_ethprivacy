const PRIVACY = [
  {
    id: "p1",
    lane: "privacy",
    n: 1,
    short: "Privacy scope",
    question: "What is in scope for L1 privacy?",
    answer: "Address · Amount · Metadata · Linkage",
    scope: ["Address", "Amount", "Metadata", "Linkage"],
    artifacts: [
      {
        label: "Kohaku",
        kind: "project",
        url: "https://notes.ethereum.org/@niard/KohakuRoadmap",
      },
      {
        label: "Simple L1 privacy roadmap",
        kind: "note",
        url: "https://ethereum-magicians.org/t/a-maximally-simple-l1-privacy-roadmap/23459",
      },
    ],
    detail:
      "Native privacy starts by defining scope: what the public ledger and its clients must stop exposing. In scope are identity (who sends / receives), value (how much), correlating metadata (timing, calldata, mempool, fee-payer linkage), and linkage across apps, RPCs, and the network. The question is which of these stay public, and which leave the record.",
    related: [
      {
        title: "Kohaku Roadmap",
        url: "https://notes.ethereum.org/@niard/KohakuRoadmap",
        points: [
          "Private send / receive / payment flows in the wallet",
          "Aggregated view of shielded balances across protocols",
          "One account per dApp by default (cut cross-app address linkage)",
          "Hide IP / traffic metadata",
          "Private state reads: TEE+ORAM now, PIR later",
        ],
      },
      {
        title: "A maximally simple L1 privacy roadmap — Vitalik",
        url: "https://ethereum-magicians.org/t/a-maximally-simple-l1-privacy-roadmap/23459",
        points: [
          "Onchain payment privacy",
          "Break public links between activity across apps",
          "Private chain reads / RPC",
          "Network-level anonymization",
          "Direction: default shielded sends, one-address-per-app, TEE→PIR, multi-RPC / mixnet",
        ],
      },
    ],
  },
  {
    id: "p2",
    lane: "privacy",
    n: 2,
    short: "Primitives",
    question: "Which privacy primitives exist today?",
    answer: "TEE · FHE · GC · ZK",
    artifacts: [
      {
        label: "Aztec",
        kind: "project",
        url: "https://aztec.network/blog/is-zk-mpc-fhe-tee-a-real-creature",
      },
    ],
    detail:
      "TEE leans on hardware trust; FHE/MPC fit general confidential compute but are expensive or hard to verify on-chain; client-side ZK best matches public verifiability. Combinations (ZK-MPC, ZK-FHE, …) are possible, but “ZK-MPC-FHE-TEE” is not automatically useful—use the lightest stack that fits the trust and verify model.",
    related: [
      {
        title: "Is ZK-MPC-FHE-TEE a real creature? — Aztec",
        url: "https://aztec.network/blog/is-zk-mpc-fhe-tee-a-real-creature",
        points: [
          "Surveys client-side ZK, FHE, MPC, and TEE: strengths, limits, and when each fits",
          "Client-side ZK: user proves locally; strong for private execution / verify-on-chain, weak on shared private state alone",
          "MPC / FHE: shared or encrypted compute; heavy and often need extra ZK for blockchain verifiability",
          "TEE: practical short-term privacy, but hardware trust—not the same assurance class as pure crypto",
          "Combinations (ZK-MPC, ZK-FHE, …) can help; stacking everything is usually pointless",
          "Today’s sensible on-chain privacy stacks lean client-side ZK, optionally with MPC for shared state",
        ],
      },
    ],
  },
  {
    id: "p3",
    lane: "privacy",
    n: 3,
    short: "Why ZK",
    question: "Why is ZK the best fit?",
    answer: "Publicly verifiable · trust-minimized",
    artifacts: [
      {
        label: "Zcash",
        kind: "project",
        url: "https://zips.z.cash/protocol/protocol.pdf",
      },
    ],
    detail:
      "ZK lets any node verify a private transfer’s validity without learning amounts or parties—no hardware vendor, no online MPC quorum. That matches Ethereum’s verify-locally model. Zcash showed this works as private money at scale for years; Ethereum privacy designs (shielded pools, notes, nullifiers) largely inherit that shape.",
    related: [
      {
        title: "Zcash Protocol Specification",
        url: "https://zips.z.cash/protocol/protocol.pdf",
        points: [
          "ZK-based private money: shielded value with on-chain verifiable conservation",
          "Long production history—practical reference for Ethereum native privacy",
          "Core pattern reused on Ethereum: commitments, Merkle membership, nullifiers, client proofs",
          "Related Ethereum-direction projects: Railgun, Privacy Pools, PLabs, Aztec",
        ],
      },
    ],
  },
  {
    id: "p4",
    lane: "privacy",
    n: 4,
    short: "Amount privacy",
    question: "How do we get amount privacy?",
    answer: "UTXO notes + client proofs",
    artifacts: [
      {
        label: "PLabs",
        kind: "project",
        url: "https://x.com/_PLabs/status/2065052710228152360",
      },
    ],
    detail:
      "Mechanism: UTXO + client ZKP. Value lives in private notes, not account balances. On chain, observers see commitments (and later nullifiers), not plaintext amounts; the spender proves value conservation, Merkle membership, and nullifier correctness with a client-generated ZKP.",
    related: [
      {
        title: "Privacy101: Zcash Orchard — how money stays private — PLabs",
        url: "https://x.com/_PLabs/status/2065052710228152360",
        points: [
          "Shielded balance = a bag of notes, not an account balance",
          "Note keeps recipient / value private; chain only sees cmx (create) and nf (spend)",
          "C_enc carries encrypted payload—observers cannot read amount or address fields",
          "cmx and nf stay unlinkable without FVK (nk); amount + address privacy from the same note model",
          "Same Orchard pattern underpins Ethereum designs using notes + client ZKPs",
        ],
      },
    ],
  },
  {
    id: "p5",
    lane: "privacy",
    n: 5,
    short: "Address privacy",
    question: "How do we get address privacy?",
    answer: "IVK scan · one-time receive addresses",
    artifacts: [
      {
        label: "PLabs",
        kind: "project",
        url: "https://x.com/_PLabs/status/2065052710228152360",
      },
    ],
    detail:
      "Address privacy has two layers. (1) Shielded transfers do not put the recipient address on chain—the note is encrypted, and the recipient finds it by trial-decrypting with an incoming viewing key (IVK). (2) One-time / diversified receive addresses go further: different senders to the same person can use distinct private payment addresses, so public observers (and often co-senders) cannot treat “same receive address” as a link.",
    related: [
      {
        title: "Privacy101: Zcash Orchard — notes, IVK, unlinkability — PLabs",
        url: "https://x.com/_PLabs/status/2065052710228152360",
        points: [
          "On-chain Action shows cmx / nf / C_enc—not plaintext recipient or value",
          "Recipient scans with IVK: trial-decrypt C_enc; only own notes decrypt",
          "Observers cannot read address fields from C_enc or link create (cmx) to spend (nf) without FVK",
          "Layer 1 of address privacy: the public tx never carries a usable recipient address",
        ],
      },
      {
        title: "Ephemeral key pairs + account abstraction — ethresear.ch",
        url: "https://ethresear.ch/t/achieving-quantum-safety-through-ephemeral-key-pairs-and-account-abstraction/24273",
        points: [
          "Layer 2: rotate / diversify keys so reuse does not create a stable public identity",
          "Stable smart-account identity + per-use or per-tx signer (or fresh receive paths)",
          "Different counterparties need not share one long-lived receive address",
          "Also reduces long-term public-key exposure (including quantum consideration)",
        ],
      },
    ],
  },
  {
    id: "p6",
    lane: "privacy",
    n: 6,
    short: "Gas sponsorship",
    question: "How do we pay gas without linking the user?",
    answer: "Third-party fee payment · relayers",
    artifacts: [
      {
        label: "EIP-8141",
        kind: "eip",
        url: "https://eips.ethereum.org/EIPS/eip-8141",
      },
    ],
    detail:
      "Gas payment always leaks identity: the fee payer’s signature and ETH balance delta are public even when transfer contents are private. Native privacy therefore requires sponsorship—someone else pays inclusion—so the private spender is not the on-chain feepayer.",
    related: [
      {
        title: "EIP-8141 Frame Transactions — Approve / payment separation",
        url: "https://eips.ethereum.org/EIPS/eip-8141",
        points: [
          "Frame tx separates verification from payment: Approve can let a third party pay gas",
          "Protocol-level path for paymasters without bundler-only hacks",
          "Target shape for privacy protocols that need sponsored inclusion on L1",
        ],
      },
      {
        title: "Today’s privacy protocols — relayer broadcast",
        links: [
          { label: "Railgun", url: "https://x.com/RAILGUN_Project" },
          { label: "Privacy Pools", url: "https://x.com/0xbowio" },
          { label: "Tornado Cash", url: "https://x.com/TornadoCash" },
          { label: "PLabs", url: "https://x.com/_PLabs" },
        ],
        points: [
          "Current stacks hide the user by having a relayer submit the tx",
          "Relayer pays gas / appears as the feepayer so the shielded spend is not linked via fee payment",
          "Works operationally, but depends on relayer availability, trust, and mempool policy—EIP-8141 aims to standardize the sponsorship seam",
        ],
      },
    ],
  },
  {
    id: "p7",
    lane: "privacy",
    n: 7,
    short: "Shared UTXO pool",
    question: "How do we keep private UTXOs in one anonymity set?",
    answer: "Canonical shared pool · EIP-8182",
    artifacts: [
      {
        label: "EIP-8182",
        kind: "eip",
        url: "https://eips.ethereum.org/EIPS/eip-8182",
      },
    ],
    detail:
      "App-level privacy pools always fragment anonymity and liquidity: each product must bootstrap its own note tree and nullifier set, so privacy strength tracks pool size, not just circuit quality. Native privacy therefore needs a shared UTXO layer—one canonical shielded pool that wallets and apps deposit into and spend from together.",
    related: [
      {
        title: "EIP-8182 — Private ETH and ERC-20 Transfers",
        url: "https://eips.ethereum.org/EIPS/eip-8182",
        points: [
          "Protocol system contract: shared note-commitment tree + nullifier set (no admin / proxy upgrades—hard-fork only)",
          "Split-proof design: fork-managed pool proof for value / nullifier / membership invariants + pluggable auth proofs",
          "Users register their own spend auth (ECDSA, passkey, …) without each app forking a new pool",
          "Gives Ethereum a shared private-transfer default so apps build on one anonymity set instead of competing pools",
        ],
      },
      {
        title: "Today’s privacy protocols — separate pools",
        links: [
          { label: "Railgun", url: "https://x.com/RAILGUN_Project" },
          { label: "Privacy Pools", url: "https://x.com/0xbowio" },
          { label: "Tornado Cash", url: "https://x.com/TornadoCash" },
          { label: "PLabs", url: "https://x.com/_PLabs" },
        ],
        points: [
          "Each stack runs (or plans) its own shielded pool / note set—anonymity does not automatically compose across them",
          "Users and liquidity must be won per pool; small pools stay weak even with strong ZK",
          "Works as product experiments, but fragments the ecosystem—EIP-8182 targets one protocol-owned shared UTXO base",
        ],
      },
    ],
  },
];

const COMPLIANCE = [
  {
    id: "c1",
    lane: "compliance",
    n: 1,
    short: "Deposit association sets",
    question: "How can withdrawals stay private and still meet policy checks?",
    answer: "Prove membership in a deposit subset · ASP",
    artifacts: [
      {
        label: "Privacy Pools",
        kind: "project",
        url: "https://x.com/0xbowio",
      },
    ],
    detail:
      "At withdraw, Privacy Pools let a user ZK-prove that their deposit coin ID sits in (or outside) a declared association set—not merely “some prior deposit”—without publishing the link graph. The set is curated deposits (commitments), not the withdrawal EVM address. Open problem: who maintains the set? The paper leaves this to Association Set Providers; 0xbow today runs an ASP where authorized postmen publish approved-deposit roots on-chain, so policy trust sits with that operator as much as with the cryptography.",
    related: [
      {
        title: "Privacy Pools — association sets (Buterin et al. / 0xbow)",
        links: [
          { label: "Paper", url: "https://privacypools.com/whitepaper.pdf" },
          { label: "ASP docs", url: "https://docs.privacypools.com/layers/asp" },
          { label: "0xbow", url: "https://x.com/0xbowio" },
        ],
        points: [
          "ZK at withdraw: same coin ID proves into the full deposit tree and into RA (association-set root)",
          "Set = curated subset of deposits; not a whitelist of withdraw addresses",
          "Open governance: who is the ASP, who revokes labels, can users pick among competing sets?",
          "0xbow today: ASP holds approved deposit labels; postmen update roots; failed inclusion → ragequit",
        ],
      },
    ],
  },
  {
    id: "c2",
    lane: "compliance",
    n: 2,
    short: "Proof of Innocence",
    question: "How does Railgun handle provenance without Privacy Pools?",
    answer: "POI · List Providers · shield-time exclusion",
    artifacts: [
      {
        label: "Railgun",
        kind: "project",
        url: "https://docs.railgun.org/wiki/assurance/private-proofs-of-innocence",
      },
    ],
    detail:
      "Railgun did not adopt Privacy Pools’ withdraw-membership protocol. Instead it ships Private Proofs of Innocence (POI): at shield, a ZK proof that the funds are not on List Provider bad-lists (addresses / txs)—exclusion, not “member of this good deposit set.” List Providers publish those lists; wallets, the SDK, and POI nodes enforce proofs. The core RAILGUN contract does not verify POI on-chain. Valid POIs inherit through later private spends so counterparties can check cleanliness without seeing 0zk balances or history.",
    related: [
      {
        title: "Railgun — Private Proofs of Innocence",
        links: [
          {
            label: "POI docs",
            url: "https://docs.railgun.org/wiki/assurance/private-proofs-of-innocence",
          },
          { label: "Railgun", url: "https://x.com/RAILGUN_Project" },
        ],
        points: [
          "Not Privacy Pools: no on-contract association-set membership at withdraw",
          "Shield-time ZK: non-inclusion vs List Provider blocklists",
          "Enforcement is wallet / SDK / POI nodes—not the RAILGUN core contract",
          "Open problem still similar: who runs List Providers, and which lists wallets require by default?",
        ],
      },
    ],
  },
  {
    id: "c3",
    lane: "compliance",
    n: 3,
    short: "Association note sets",
    question: "How do we freeze bad notes across every spend?",
    answer: "Non-inclusion vs frozen note sets",
    detail:
      "Unlike deposit-level association sets at withdraw (C1) or shield-time POI (C2), association note sets apply on every spend: transfer or withdraw must ZK-prove that the spent note is not in a frozen set. Policy can freeze notes as they surface without waiting for an exit. Open problem remains—who maintains the frozen sets, under what evidence, and with what revoke / appeal path is still the hard governance question, not the circuit shape.",
    related: [
      {
        title: "Association note sets — every spend",
        points: [
          "Spend path (private transfer or withdraw) proves the note ∉ frozen set",
          "Object is the note / commitment, not the EVM withdraw address",
          "Differs from Privacy Pools C1 (deposit association at withdraw) and Railgun POI (shield-time vs address/tx lists)",
          "Open: who publishes and updates frozen note sets, and how users contest a freeze",
        ],
      },
    ],
  },
];

const PQ = [
  {
    id: "q1",
    lane: "pq",
    n: 1,
    short: "ECDSA",
    question: "How do user transaction signatures survive quantum?",
    answer: "SPHINCS- · leanSPHINCS",
    artifacts: [
      {
        label: "SPHINCS-",
        kind: "project",
        url: "https://ethresear.ch/t/sphincs-minus-efficient-stateless-post-quantum-signature-verification-on-the-evm/25165",
      },
    ],
    detail:
      "Today users authorize spends and account ops with ECDSA (secp256k1). Quantum breaks ECDSA, so native privacy cannot keep long-lived spend keys on that curve alone. Concrete PQ replacements include SPHINCS- (EVM-native hash-based verify) and the leanEthereum line (leanSPHINCS at the execution layer). Shielded spend auth has to migrate with those account schemes—not only the note circuits.",
    related: [
      {
        title: "SPHINCS- — PQ ECDSA replacement on the EVM",
        url: "https://ethresear.ch/t/sphincs-minus-efficient-stateless-post-quantum-signature-verification-on-the-evm/25165",
        points: [
          "Hash-based, stateless SPHINCS+ / SLH-DSA family tuned for EVM verification",
          "Goal: replace account ECDSA without waiting on a new precompile—Solidity verifier already ~150K gas for a standardized-style parameter set",
          "KECCAK-native variants cut verifier cost further for wallet-scale signature budgets",
          "Formal Lean 4 + Verity proofs of the verifiers",
        ],
      },
      {
        title: "leanVM paper — leanSPHINCS for execution-layer signatures",
        url: "https://github.com/leanEthereum/leanVM",
        points: [
          "leanEthereum direction: leanSPHINCS (hash-based) as the PQ replacement for user / execution-layer signatures",
          "Poseidon2 / hash-friendly instantiations for SNARK-friendliness",
          "Same stack that also covers consensus sigs (leanXMSS + leanVM aggregation) and the PQ proving system (see Q2 / Q3)",
        ],
      },
    ],
  },
  {
    id: "q2",
    lane: "pq",
    n: 2,
    short: "BLS",
    question: "How do consensus signatures survive quantum?",
    answer: "leanXMSS · leanVM aggregation",
    artifacts: [
      {
        label: "LeanVM",
        kind: "project",
        url: "https://github.com/leanEthereum/leanVM",
      },
    ],
    detail:
      "Ethereum consensus relies on BLS for attestations and algebraic aggregation. Quantum breaks that pairing / discrete-log stack. The leanEthereum line replaces BLS with hash-based validator signatures (leanXMSS / leanSig). Those signatures lack BLS-style aggregation, so the paper aggregates them with a hash-based SNARK instead: leanVM is the minimal zkVM used as glue to verify many XMSS signatures and recursively merge aggregate proofs. Native privacy inherits this—private funds that settle under fallen consensus crypto are not safe in practice.",
    related: [
      {
        title: "leanVM paper — leanXMSS + zkVM aggregation (BLS → PQ)",
        url: "https://github.com/leanEthereum/leanVM",
        points: [
          "leanXMSS (hash-based) as the consensus-layer replacement for BLS",
          "Aggregate with a hash-based SNARK; leanVM is the Cairo-inspired zkVM glue for signature verification + recursive merge",
          "Program attests that a set of signers have valid XMSS signatures for a given message, then recursively merges sub-proofs",
          "Same paper stack also points at leanSPHINCS for execution-layer sigs (see Q1) and the PQ proving stack (see Q3)",
        ],
      },
    ],
  },
  {
    id: "q3",
    lane: "pq",
    n: 3,
    short: "SNARK",
    question: "How do privacy proof systems survive quantum?",
    answer: "recursive STARK · LeanVM",
    artifacts: [
      {
        label: "LeanVM",
        kind: "project",
        url: "https://github.com/leanEthereum/leanVM",
      },
    ],
    detail:
      "Pairing-based SNARKs used for private transfers are not post-quantum. The leanEthereum / leanVM stack uses a recursive STARK proving system—that is the PQ proof-system direction. Native private-spend circuits should move onto recursive STARKs so note proofs stay sound when pairing SNARKs are no longer trusted.",
    related: [
      {
        title: "recursive STARK — PQ proof system (leanVM)",
        url: "https://github.com/leanEthereum/leanVM",
        points: [
          "Proof system: recursive STARK (not pairing-based)",
          "leanVM instantiates that stack",
          "Same engine glues leanXMSS aggregation (Q2) and is the proving path privacy circuits should align with",
          "Native privacy: replace pairing SNARKs with recursive STARKs for private spends",
        ],
      },
    ],
  },
];

const COMPAT = [
  {
    id: "n1",
    lane: "compat",
    n: 1,
    short: "ETH & ERC-20",
    question: "How do today’s ETH and ERC-20 fuse with private notes?",
    answer: "Public ↔ shielded boundary",
    artifacts: [
      { label: "Railgun", kind: "project", url: "https://x.com/RAILGUN_Project" },
      { label: "Privacy Pools", kind: "project", url: "https://x.com/0xbowio" },
      { label: "PLabs", kind: "project", url: "https://x.com/_PLabs" },
    ],
    detail:
      "Backward compatibility starts with the assets people already hold. ETH and ERC-20 must map into the private note model without replacing the public token standards: typically a protocol shield (public → commitment) and unshield (commitment → public) boundary. Amounts may leak at that edge; in-pool transfers stay private. Railgun, Privacy Pools, and PLabs already ship shield / unshield for that public↔private asset swap.",
    related: [
      {
        title: "Shield / unshield in the wild",
        links: [
          { label: "Railgun", url: "https://x.com/RAILGUN_Project" },
          { label: "Privacy Pools", url: "https://x.com/0xbowio" },
          { label: "PLabs", url: "https://x.com/_PLabs" },
        ],
        points: [
          "All three support shield (public ETH/ERC-20 → private note) and unshield (note → public)",
          "That boundary is how today’s assets interchange between public ledger form and private form",
          "Pattern is proven; native privacy still wants one shared / standard path instead of per-app doors",
        ],
      },
    ],
  },
  {
    id: "n2",
    lane: "compat",
    n: 2,
    short: "pERC20",
    question: "How do we issue assets private from day one?",
    answer: "ERC-8302 · private fungible tokens",
    artifacts: [
      {
        label: "ERC-8302",
        kind: "eip",
        url: "https://github.com/ethereum/ERCs/pull/1817",
      },
    ],
    detail:
      "Not every private asset should be “mint as public ERC-20 then shield.” pERC20 (ERC-8302) is a private-by-default fungible token standard—minted, held, and transferred as notes from issuance—so private stablecoins, RWA, and other on-chain assets can launch already private while keeping an ERC-20-shaped method surface for issuers and wallets.",
    related: [
      {
        title: "ERC-8302 — pERC20 / Private Fungible Tokens",
        url: "https://github.com/ethereum/ERCs/pull/1817",
        points: [
          "Private-by-default fungible token standard: mint / hold / transfer as Orchard-style notes—no public balanceOf phase, no “mint then shield”",
          "Target issuance: private stablecoins, RWA, and other chain-native assets that should never be public tokens first",
          "Capability-complete with ERC-20 (transfer, approve, allowance, transferFrom) but not byte-compatible—different ABI, no public balances",
          "Approved spending via ZIP-32 subaccounts: approve / allowance / transferFrom without revealing the relationship on-chain",
          "Complements shared-pool paths (e.g. shield/unshield of public ETH/ERC-20): those privatize existing assets; pERC20 defines private asset issuance",
        ],
      },
    ],
  },
  {
    id: "n3",
    lane: "compat",
    n: 3,
    short: "Wallets",
    question: "How do existing wallets and client tools absorb native privacy?",
    answer: "Kohaku SDK · reference wallet",
    artifacts: [
      {
        label: "Kohaku",
        kind: "project",
        url: "https://github.com/ethereum/kohaku",
      },
    ],
    detail:
      "Users live in wallets they already have. Compatibility means those clients absorb note scanning, viewing keys, client proofs, shielded-pool plugins, and sponsorship UX—via an SDK other wallets can take in full or in parts—not a forced greenfield monoculture. Kohaku is the EF-led path: privacy-first SDK + a power-user reference wallet that demonstrates the stack.",
    related: [
      {
        title: "Kohaku — GitHub & roadmap",
        links: [
          { label: "GitHub", url: "https://github.com/ethereum/kohaku" },
          { label: "Roadmap", url: "https://notes.ethereum.org/@niard/KohakuRoadmap" },
          {
            label: "Extension",
            url: "https://github.com/ethereum/kohaku-extension",
          },
        ],
        points: [
          "Goals: SDK of privacy/security primitives · power-user reference wallet on that SDK · collaborate so other wallets adopt full or partial plugins",
          "Reference wallet: Ambire-fork browser extension (not a consumer mass product); mainnet-first, then stage-1+ L2s",
          "Plugins for shielded pools (Railgun, Tornado Cash, Privacy Pools) so wallets pick protocols without rebuilding infrastructure",
          "Roadmap features: private send/receive · aggregated shielded balances · one account per dApp · hide IP/traffic metadata · private state reads (TEE+ORAM → PIR) · Helios lightclient in-browser",
          "Toward progressive private DeFi interactions and longer-term native AA / protocol privacy absorption",
        ],
      },
    ],
  },
  {
    id: "n4",
    lane: "compat",
    n: 4,
    short: "EOA",
    question: "How do EOAs send privacy transactions?",
    answer: "EIP-8141 Frame Tx",
    artifacts: [
      {
        label: "EIP-8141",
        kind: "eip",
        url: "https://eips.ethereum.org/EIPS/eip-8141",
      },
    ],
    detail:
      "Most users still hold keys as EOAs. EIP-8141 Frame Transactions let an EOA stay the tx sender while packaging privacy flows as ordered frames—validate, (optionally) sponsor gas, then call the shielded pool—without first migrating to a separate smart-account product.",
    related: [
      {
        title: "EOA privacy txs via EIP-8141",
        url: "https://eips.ethereum.org/EIPS/eip-8141",
        points: [
          "EOA remains `tx.sender`; signs the frame transaction (secp256k1 / later schemes in `signatures`)",
          "VERIFY frame: confirm the EOA authorized this tx (and any policy) before execution",
          "Optional paymaster / payment frame: a sponsor can pay gas while the EOA still authorizes the private action",
          "Execution / SENDER frame(s): call the shielded pool (shield, private transfer, unshield) and update state",
          "Atomic batch when needed: e.g. unshield → public step → re-shield as one all-or-nothing privacy flow",
        ],
      },
    ],
  },
  {
    id: "p9",
    lane: "compat",
    n: 5,
    short: "Keyed Nonce",
    question: "How do independent private spends avoid a shared-sender nonce bottleneck?",
    answer: "EIP-8250",
    artifacts: [
      {
        label: "EIP-8250",
        kind: "eip",
        url: "https://eips.ethereum.org/EIPS/eip-8250",
      },
    ],
    detail:
      "Privacy users often share one public sender (or sponsor) across many unrelated spends. A single linear account nonce makes that sender a throughput bottleneck: one inclusion can invalidate every other pending withdrawal. EIP-8250 replaces the frame-tx nonce with `(nonce_keys, nonce_seq)` so disjoint non-zero key sets are replay-independent—e.g. derive a key from a nullifier—and consume those keys atomically at payment approval.",
    related: [
      {
        title: "EIP-8250 — Keyed Nonces for Frame Transactions",
        url: "https://eips.ethereum.org/EIPS/eip-8250",
        points: [
          "Payload: `(nonce_keys, nonce_seq)` instead of one linear sender nonce; `nonce_keys == [0]` aliases the legacy account nonce",
          "Non-zero keys live in a `NONCE_MANAGER` system contract; transactions on non-overlapping key sets are replay-independent",
          "Built for privacy / shared-sender / relayer patterns—nullifier-derived keys so concurrent private withdrawals do not block each other",
          "Nonce consumption runs on payment-scoped APPROVE: atomic spent-once for selected keys even if later frames revert",
          "Does not by itself change public-mempool “one pending frame tx per sender” policy; removes the protocol obstacle to keyed-aware concurrent admission later",
        ],
      },
    ],
  },
  {
    id: "p10",
    lane: "compat",
    n: 6,
    short: "State scaling",
    question: "How does note / nullifier state fit beside today’s L1 state?",
    answer: "CM + NF · specialized storage",
    detail:
      "Ethereum state today is general-purpose. Private notes need CM trees and nullifier sets with restricted access (append / membership). Compatibility means specialized storage—sharding, blooms, etc.—that can host those structures beside ordinary state without forcing every node into a monolith that cannot decentralize.",
    related: [
      {
        title: "Specialized nullifier storage — Vitalik",
        url: "https://x.com/VitalikButerin/status/2051675198068330996",
        points: [
          "Nullifiers are hard to prune; dedicated storage can scale better than general state",
          "Restricted access patterns unlock sharding / bloom-style designs dynamic state cannot use",
        ],
      },
    ],
  },
  {
    id: "n5",
    lane: "compat",
    n: 7,
    short: "DeFi interaction",
    question: "How do private balances call today’s public DeFi?",
    answer: "unshield → contract → shield · Railgun",
    artifacts: [
      {
        label: "Railgun",
        kind: "project",
        url: "https://docs.railgun.org/wiki/learn/integrating-railgun/example-dex-swaps",
      },
    ],
    detail:
      "Public DeFi (Uniswap, 0x, lending, …) still speaks public balances. The practical bridge—implemented today by Railgun—is a single Adapt multicall: unshield notes to a temporary public leg, call the DeFi contract, then shield outputs back into the private balance. Token amounts/types on that middle hop are visible; the user’s 0zk identity stays unlinked.",
    related: [
      {
        title: "Railgun — DEX swap / Adapt Module flow",
        url: "https://docs.railgun.org/wiki/learn/integrating-railgun/example-dex-swaps",
        points: [
          "Today only Railgun has shipped this private↔public DeFi interaction pattern in production wallets",
          "Step 1 — unshield: `transact()` pulls the sold asset from the private UTXO set (nullifier + funds check)",
          "Step 2 — contract call: Adapt Module multicall hits public DeFi (e.g. 0x / DEX swap) with the unshielded tokens",
          "Step 3 — shield: `shield()` returns output tokens (and leftovers) into new private notes; Merkle tree updates",
          "Outside observers see a Broadcaster + the public swap size/type; they do not see the user’s 0zk address or private history",
        ],
      },
    ],
  },
  {
    id: "n6",
    lane: "compat",
    n: 8,
    short: "Private DeFi",
    question: "Why isn’t unshield → DeFi → shield enough?",
    answer: "Private DeFi · PLabs and similar",
    artifacts: [
      { label: "PLabs", kind: "project", url: "https://x.com/_PLabs" },
    ],
    detail:
      "Even with Railgun-style DeFi interaction, the middle hop is public: amounts and token types leak on the unshield → contract → shield path. That is good enough for many use cases, but not full privacy. A complete privacy design therefore needs Private DeFi—trading, lending, and market-making as stateful machines over commitments and proofs—so users never have to surface value on a public venue just to use DeFi. PLabs-style work explores that programmable private layer while still settling on Ethereum.",
    related: [
      {
        title: "Private DeFi — close the amount leak",
        links: [
          { label: "PLabs", url: "https://x.com/_PLabs" },
          {
            label: "Railgun DEX flow",
            url: "https://docs.railgun.org/wiki/learn/integrating-railgun/example-dex-swaps",
          },
        ],
        points: [
          "Public DeFi interaction (B7) still exposes swap size / asset type on the unshielded middle step",
          "Perfect privacy needs apps that operate on private notes end-to-end—no temporary public balance for the DeFi call",
          "Private DeFi: private order flow, lending, MM over commitments/proofs, with settlement still on Ethereum rails",
        ],
      },
    ],
  },
];

const ALL = [...PRIVACY, ...COMPLIANCE, ...PQ, ...COMPAT];
const byId = Object.fromEntries(ALL.map((b) => [b.id, b]));

const LANE_META = {
  privacy: {
    prefix: "P",
    rib: "#057a55",
    label: "Privacy",
  },
  compliance: {
    prefix: "C",
    rib: "#c2410c",
    label: "Compliance",
  },
  pq: {
    prefix: "Q",
    rib: "#be123c",
    label: "Post-quantum",
  },
  compat: {
    prefix: "B",
    rib: "#1d4ed8",
    label: "Backward compatibility",
  },
};

const diagramHost = document.getElementById("diagram-host");
const panel = document.getElementById("detail-panel");
const panelLane = document.getElementById("panel-lane");
const panelQuestion = document.getElementById("panel-question");
const panelDetail = document.getElementById("panel-detail");
const panelRelated = document.getElementById("panel-related");
const panelRelatedList = document.getElementById("panel-related-list");
const panelRefs = document.getElementById("panel-refs");
const panelClose = document.getElementById("panel-close");

let selectedId = null;

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function linkifyRefs(refs) {
  if (!refs) return "";
  return escapeHtml(refs).replace(
    /(https?:\/\/[^\s·]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>',
  );
}

function estimateLabelWidth(idText, label, artifactText) {
  const lines = [
    idText.length * 6.4 + 18,
    label.length * 7.4 + 22,
    artifactText ? artifactText.length * 6.1 + 20 : 0,
  ];
  return Math.ceil(Math.max(88, ...lines));
}

function artifactCaption(b) {
  const items = (b.artifacts || []).filter(
    (a) => a.kind === "project" || a.kind === "eip",
  );
  if (!items.length) return "";
  // Keep the plate readable: at most two names on the bone.
  return items
    .slice(0, 2)
    .map((a) => a.label)
    .join(" · ");
}

function buildRib(b, geom) {
  const base = LANE_META[b.lane]?.rib || "#7a8596";
  return `
    <g class="bone-rib ${b.lane}" data-id="${b.id}">
      <path class="rib-hit" d="M ${geom.attachX} ${geom.spineY} L ${geom.tipX} ${geom.tipY}"
            fill="none" stroke="transparent" stroke-width="28" stroke-linecap="round" />
      <path class="rib" d="M ${geom.attachX} ${geom.spineY} L ${geom.tipX} ${geom.tipY}"
            fill="none" stroke="${base}" stroke-width="2.1" stroke-linecap="round" />
      <circle class="joint" cx="${geom.attachX}" cy="${geom.spineY}" r="3.6"
              fill="#fbfcfd" stroke="${base}" stroke-width="1.8" />
    </g>
  `;
}

function buildPlate(b, geom) {
  const prefix = LANE_META[b.lane]?.prefix || "?";
  const idText = `${prefix}${b.n}`;
  const artifacts = artifactCaption(b);
  const w = estimateLabelWidth(idText, b.short, artifacts);
  const h = artifacts ? 52 : 38;
  const plateX = geom.tipX - w / 2;
  const plateY = geom.tipY - h / 2;
  const idY = artifacts ? geom.tipY - 12 : geom.tipY - 4;
  const labelY = artifacts ? geom.tipY + 3 : geom.tipY + 12;
  const artY = geom.tipY + 17;

  const artifactText = artifacts
    ? `<text class="plate-artifacts" x="${geom.tipX}" y="${artY}" text-anchor="middle">${escapeHtml(artifacts)}</text>`
    : "";

  return `
    <g class="bone ${b.lane}" data-id="${b.id}" role="button" tabindex="0"
       aria-label="${idText} ${escapeHtml(b.short)}${artifacts ? ` ${escapeHtml(artifacts)}` : ""}">
      <path class="rib-hit" d="M ${geom.attachX} ${geom.spineY} L ${geom.tipX} ${geom.tipY}"
            fill="none" stroke="transparent" stroke-width="28" stroke-linecap="round" />
      <rect class="plate" x="${plateX}" y="${plateY}" width="${w}" height="${h}" rx="8" ry="8" />
      <text class="plate-id" x="${geom.tipX}" y="${idY}" text-anchor="middle">${idText}</text>
      <text class="plate-label" x="${geom.tipX}" y="${labelY}" text-anchor="middle">${escapeHtml(b.short)}</text>
      ${artifactText}
    </g>
  `;
}

function plateMetrics(b) {
  const prefix = LANE_META[b.lane]?.prefix || "?";
  const idText = `${prefix}${b.n}`;
  const artifacts = artifactCaption(b);
  const w = estimateLabelWidth(idText, b.short, artifacts);
  const h = artifacts ? 52 : 38;
  return { idText, artifacts, w, h };
}

function plateBox(geom, metrics, pad = 6) {
  return {
    left: geom.tipX - metrics.w / 2 - pad,
    right: geom.tipX + metrics.w / 2 + pad,
    top: geom.tipY - metrics.h / 2 - pad,
    bottom: geom.tipY + metrics.h / 2 + pad,
  };
}

function boxesOverlap(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

/** Classic fish outline: short near tail/head, longest mid-body. */
function fishRibLength(attachX, { minX, maxX, minLen, maxLen }) {
  const span = Math.max(1, maxX - minX);
  const t = Math.min(1, Math.max(0, (attachX - minX) / span));
  const envelope = Math.sin(Math.PI * t);
  return Math.round(minLen + (maxLen - minLen) * envelope);
}

/**
 * Real fishbone: one smooth envelope (short → long → short).
 * No dual-track zigzag — plates are spaced horizontally so they never cover.
 */
function layoutFishSide(items, {
  spineY,
  startX,
  endX,
  up,
  minLen,
  maxLen,
  bodyMinX,
  bodyMaxX,
  tipMinY,
  tipMaxY,
}) {
  const n = items.length;
  const minX = bodyMinX ?? startX;
  const maxX = bodyMaxX ?? endX;
  const lo = minLen;
  const hi = maxLen;
  const gap = 14;

  const metrics = items.map((b) => plateMetrics(b));

  // Place tip centers so consecutive plates do not overlap in X.
  const tipXs = [];
  let cursor = startX;
  for (let i = 0; i < n; i++) {
    const half = metrics[i].w / 2;
    if (i === 0) {
      tipXs.push(cursor + half);
    } else {
      const need = metrics[i - 1].w / 2 + half + gap;
      tipXs.push(Math.max(tipXs[i - 1] + need, tipXs[i - 1] + 1));
    }
  }

  // If the packed row overshoots endX, keep relative spacing and scale into [startX, endX].
  const packedStart = tipXs[0];
  const packedEnd = tipXs[n - 1];
  const packedSpan = Math.max(1, packedEnd - packedStart);
  const targetSpan = Math.max(packedSpan, endX - startX);
  for (let i = 0; i < n; i++) {
    const u = (tipXs[i] - packedStart) / packedSpan;
    tipXs[i] = startX + u * Math.min(targetSpan, endX - startX);
  }
  // If still wider than available, compress proportionally into [startX, endX].
  if (tipXs[n - 1] > endX) {
    const s0 = tipXs[0];
    const s1 = tipXs[n - 1];
    for (let i = 0; i < n; i++) {
      tipXs[i] = startX + ((tipXs[i] - s0) / (s1 - s0)) * (endX - startX);
    }
  }

  const drafts = items.map((b, i) => {
    const tipX = tipXs[i];
    const t = Math.min(1, Math.max(0, (tipX - minX) / Math.max(1, maxX - minX)));
    // Classic fish lean toward the head.
    const lean = 10 + Math.round(18 * Math.sin(Math.PI * t));
    const attachX = tipX - lean;
    // Single envelope — consecutive ribs follow the silhouette, no inner/outer zigzag.
    const len = fishRibLength(tipX, { minX, maxX, minLen: lo, maxLen: hi });
    let tipY = up ? spineY - len : spineY + len;
    const halfH = metrics[i].h / 2 + 4;
    if (up) {
      const minTip = (tipMinY ?? 52) + halfH;
      if (tipY < minTip) tipY = minTip;
    } else {
      const maxTip = (tipMaxY ?? 768) - halfH;
      if (tipY > maxTip) tipY = maxTip;
    }
    return {
      bone: b,
      geom: {
        attachX,
        tipX,
        tipY,
        spineY,
        len: Math.abs(spineY - tipY),
      },
      metrics: metrics[i],
    };
  });

  // If any pair still overlaps (after clamp), nudge tipX apart only — keep lengths on envelope.
  for (let iter = 0; iter < 20; iter++) {
    let moved = false;
    for (let i = 0; i < drafts.length - 1; i++) {
      const a = drafts[i];
      const b = drafts[i + 1];
      if (!boxesOverlap(plateBox(a.geom, a.metrics, 4), plateBox(b.geom, b.metrics, 4))) {
        continue;
      }
      moved = true;
      const need =
        (a.metrics.w + b.metrics.w) / 2 + gap - (b.geom.tipX - a.geom.tipX);
      const shift = Math.ceil(need / 2) + 2;
      a.geom.tipX -= shift;
      b.geom.tipX += shift;
      a.geom.attachX = a.geom.tipX - (a.geom.tipX - a.geom.attachX);
      // recompute lean-based attach from tip
      const ta = Math.min(1, Math.max(0, (a.geom.tipX - minX) / Math.max(1, maxX - minX)));
      const tb = Math.min(1, Math.max(0, (b.geom.tipX - minX) / Math.max(1, maxX - minX)));
      a.geom.attachX = a.geom.tipX - (10 + Math.round(18 * Math.sin(Math.PI * ta)));
      b.geom.attachX = b.geom.tipX - (10 + Math.round(18 * Math.sin(Math.PI * tb)));
      // refresh lengths from new tip X so silhouette stays consistent
      a.geom.len = fishRibLength(a.geom.tipX, { minX, maxX, minLen: lo, maxLen: hi });
      b.geom.len = fishRibLength(b.geom.tipX, { minX, maxX, minLen: lo, maxLen: hi });
      a.geom.tipY = up ? spineY - a.geom.len : spineY + a.geom.len;
      b.geom.tipY = up ? spineY - b.geom.len : spineY + b.geom.len;
    }
    if (!moved) break;
  }

  return drafts.map(({ bone, geom }) => ({
    bone,
    geom: {
      attachX: geom.attachX,
      tipX: geom.tipX,
      tipY: geom.tipY,
      spineY: geom.spineY,
    },
  }));
}

function renderDiagram() {
  const W = 1680;
  const H = 820;
  const spineY = 410;
  const tailX = 40;
  const headBoxX = 1485;
  const headBoxW = 160;
  const headBoxH = 58;
  const spineEnd = headBoxX - 18;

  const bodyMinX = 70;
  const bodyMaxX = 1450;

  // Continuous fish sides: Privacy→Compliance (upper), PQ→Compat (lower).
  // Single smooth rib envelope — spaced horizontally so plates do not cover.
  const upperLayout = layoutFishSide([...PRIVACY, ...COMPLIANCE], {
    spineY,
    startX: 80,
    endX: 1430,
    up: true,
    minLen: 150,
    maxLen: 310,
    bodyMinX,
    bodyMaxX,
    tipMinY: 44,
  });
  const lowerLayout = layoutFishSide([...PQ, ...COMPAT], {
    spineY,
    startX: 80,
    endX: 1430,
    up: false,
    minLen: 145,
    maxLen: 300,
    bodyMinX,
    bodyMaxX,
    tipMaxY: 776,
  });

  const all = [...upperLayout, ...lowerLayout];
  const ribs = all.map(({ bone, geom }) => buildRib(bone, geom)).join("");
  const plates = all.map(({ bone, geom }) => buildPlate(bone, geom)).join("");

  diagramHost.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Ishikawa fishbone diagram for Ethereum native privacy">
      <defs>
        <marker id="spine-arrow" markerWidth="12" markerHeight="10" refX="10" refY="5" orient="auto">
          <path d="M0,0 L12,5 L0,10 Z" fill="#243447" />
        </marker>
      </defs>

      <text x="70" y="32" fill="${LANE_META.privacy.rib}" font-size="13" font-weight="700"
            font-family="Source Sans 3, sans-serif">Privacy</text>
      <text x="1050" y="32" fill="${LANE_META.compliance.rib}" font-size="13" font-weight="700"
            font-family="Source Sans 3, sans-serif">Compliance</text>
      <text x="70" y="800" fill="${LANE_META.pq.rib}" font-size="13" font-weight="700"
            font-family="Source Sans 3, sans-serif">Post-quantum</text>
      <text x="620" y="800" fill="${LANE_META.compat.rib}" font-size="13" font-weight="700"
            font-family="Source Sans 3, sans-serif">Backward compatibility</text>

      <g class="layer-ribs">${ribs}</g>

      <line x1="${tailX}" y1="${spineY}" x2="${spineEnd}" y2="${spineY}"
            stroke="#243447" stroke-width="3.5" stroke-linecap="round"
            marker-end="url(#spine-arrow)" />

      <rect x="${headBoxX}" y="${spineY - headBoxH / 2}" width="${headBoxW}" height="${headBoxH}"
            rx="10" ry="10" fill="#243447" />
      <text x="${headBoxX + headBoxW / 2}" y="${spineY - 4}" text-anchor="middle"
            fill="#f5f7fa" font-size="14" font-weight="700"
            font-family="Bricolage Grotesque, sans-serif">Native Privacy</text>
      <text x="${headBoxX + headBoxW / 2}" y="${spineY + 14}" text-anchor="middle"
            fill="#b8c2cf" font-size="11"
            font-family="IBM Plex Mono, monospace">on Ethereum</text>

      <g class="layer-plates">${plates}</g>
    </svg>
  `;

  const onPick = (el) => {
    const id = el.getAttribute("data-id");
    if (id) select(id, true);
  };

  diagramHost.querySelectorAll(".bone, .bone-rib").forEach((el) => {
    el.addEventListener("click", () => onPick(el));
  });
  diagramHost.querySelectorAll(".bone").forEach((el) => {
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onPick(el);
      }
    });
  });
}

function setActiveUi(id) {
  diagramHost.querySelectorAll(".bone, .bone-rib").forEach((el) => {
    el.classList.toggle("is-active", el.getAttribute("data-id") === id);
  });
}

function flash(el) {
  el.classList.remove("is-enter");
  void el.offsetWidth;
  el.classList.add("is-enter");
}

function renderRelated(related) {
  if (!related || !related.length) {
    panelRelated.hidden = true;
    panelRelatedList.innerHTML = "";
    return;
  }

  panelRelated.hidden = false;
  panelRelatedList.innerHTML = related
    .map((item) => {
      const title = item.url
        ? `<a class="related-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)}</a>`
        : `<span class="related-link related-link-plain">${escapeHtml(item.title)}</span>`;
      const links = item.links?.length
        ? `<p class="related-links">${item.links
            .map(
              (l) =>
                `<a href="${escapeHtml(l.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.label)}</a>`,
            )
            .join("<span class=\"related-links-sep\"> · </span>")}</p>`
        : "";
      const points = item.points?.length
        ? `<ul class="related-points">${item.points
            .map((p) => `<li>${escapeHtml(p)}</li>`)
            .join("")}</ul>`
        : item.summary
          ? `<p class="related-summary">${escapeHtml(item.summary)}</p>`
          : "";
      return `
      <article class="related-item">
        ${title}
        ${links}
        ${points}
      </article>
    `;
    })
    .join("");
}

function renderPanel(bone) {
  panel.classList.toggle("is-privacy", !!bone && bone.lane === "privacy");
  panel.classList.toggle("is-compliance", !!bone && bone.lane === "compliance");
  panel.classList.toggle("is-pq", !!bone && bone.lane === "pq");
  panel.classList.toggle("is-compat", !!bone && bone.lane === "compat");

  if (!bone) {
    panelLane.textContent = "—";
    panelQuestion.textContent = "Select a bone";
    panelDetail.textContent =
      "Click a rib on the fishbone to inspect that design question.";
    renderRelated(null);
    panelRefs.hidden = true;
    panelClose.hidden = true;
    return;
  }

  const prefix = LANE_META[bone.lane]?.prefix || "?";
  panelLane.textContent = `${prefix}${bone.n}`;
  panelQuestion.textContent = bone.question;
  panelDetail.textContent = bone.detail;
  panelClose.hidden = false;

  renderRelated(bone.related);

  if (!bone.related?.length && bone.refs) {
    panelRefs.hidden = false;
    panelRefs.innerHTML = `Refs: ${linkifyRefs(bone.refs)}`;
  } else {
    panelRefs.hidden = true;
  }

  flash(panelQuestion);
  flash(panelDetail);
}

function select(id, pushHash) {
  const bone = byId[id];
  if (!bone) return;
  selectedId = id;
  setActiveUi(id);
  renderPanel(bone);
  if (pushHash) history.replaceState(null, "", `#${id}`);
}

function clearSelection() {
  selectedId = null;
  setActiveUi(null);
  renderPanel(null);
  history.replaceState(null, "", location.pathname + location.search);
}

function bootFromHash() {
  const id = (location.hash || "").replace(/^#/, "");
  if (id && byId[id]) select(id, false);
  else select("p1", true);
}

panelClose.addEventListener("click", clearSelection);
window.addEventListener("hashchange", () => {
  const id = (location.hash || "").replace(/^#/, "");
  if (id && byId[id]) select(id, false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") clearSelection();
});

renderDiagram();
bootFromHash();

# BadgeMint 🏅

**Decentralized Achievement NFTs on OneChain — Mint, Own, and Showcase Accomplishments**

BadgeMint is an on-chain achievement platform where accomplishments are represented as NFTs. Each badge is permanent, verifiable, and owned by the recipient — creating a decentralized system for recognizing skills, milestones, and participation.

## 🌐 Overview

Achievements today are often locked within centralized platforms — certificates, badges, or awards that cannot be independently verified or transferred across ecosystems.

BadgeMint solves this by introducing a **decentralized badge system** where achievements are:

* **Permanent** → stored immutably on-chain
* **Verifiable** → publicly viewable and provable
* **Transferable** → owned as NFTs in user wallets
* **Composable** → usable across Web3 applications

This creates a universal layer for **on-chain credentials and recognition**.

## ❗ The Problem

* Achievements are platform-dependent
* Certificates can be forged or manipulated
* No standard way to verify skills on-chain
* Limited portability across platforms
* Lack of ownership over earned recognition

## 💡 The Solution

BadgeMint mints each achievement as a **non-fungible token (NFT)** on OneChain. These badges act as verifiable proof of accomplishments that users can own, display, and share across platforms.

By combining NFTs with metadata and optional AI-generated descriptions, BadgeMint enhances both **credibility and presentation**.

## ✨ Key Features

* **NFT-Based Badge Minting**
  Create unique on-chain badges representing achievements

* **Wallet Ownership**
  Badges are stored directly in recipient wallets

* **Public Verification**
  Anyone can verify badge authenticity on-chain

* **AI-Generated Descriptions**
  Automatically generate polished and inspiring badge descriptions

* **Transferable Assets**
  Badges can be transferred or showcased across platforms

* **Lightweight & Scalable Design**
  Efficient contract structure for large-scale usage

## ⚙️ How It Works

1. Creator defines badge details (name, description, image)
2. Badge is minted as an NFT on-chain
3. NFT is sent to recipient wallet
4. Users can view and manage badges via frontend
5. Badges remain permanently stored and verifiable

## 📦 Deployed Contract

* **Network:** OneChain Testnet

* **Package ID:**
  `0x7bac0e92cd0b7aaa7407f70702fa9e185aa95a73b1b7057f5f20d9dfe7e3b8f1`

* **Deploy Transaction:**
  `FG3jWEVjVPvTNk47NzxHhc273JjErjZ4Rgag8E87dDTj`

* **Explorer Links:**
  [https://onescan.cc/testnet/packageDetail?packageId=0x7bac0e92cd0b7aaa7407f70702fa9e185aa95a73b1b7057f5f20d9dfe7e3b8f1](https://onescan.cc/testnet/packageDetail?packageId=0x7bac0e92cd0b7aaa7407f70702fa9e185aa95a73b1b7057f5f20d9dfe7e3b8f1)
  [https://onescan.cc/testnet/transactionBlocksDetail?digest=FG3jWEVjVPvTNk47NzxHhc273JjErjZ4Rgag8E87dDTj](https://onescan.cc/testnet/transactionBlocksDetail?digest=FG3jWEVjVPvTNk47NzxHhc273JjErjZ4Rgag8E87dDTj)

## 🛠 Tech Stack

**Smart Contract**

* Move (OneChain)

**Frontend**

* React
* TypeScript
* Vite

**Wallet Integration**

* @mysten/dapp-kit

**AI Integration**

* GPT-4o-mini (badge description generation)

**Network**

* OneChain Testnet

## 🔍 Use Cases

* **Skill Certification**
  Represent verified skills and achievements

* **Event Participation Badges**
  Issue proof of attendance or contribution

* **Educational Credentials**
  Store certificates and course completions

* **Gamified Rewards Systems**
  Incentivize users with collectible badges

* **Reputation & Identity Systems**
  Integrate with profiles and trust scores

## 🚀 Why BadgeMint Stands Out

* **Verifiable Achievements** — no fake certificates
* **User-Owned Credentials** — stored in wallets
* **Cross-Platform Utility** — usable across dApps
* **AI-Enhanced Experience** — better badge creation
* **Composable Web3 Primitive** — integrates with identity & reputation
* **Hackathon-Ready Impact** — real-world applicable system

## 🔮 Future Improvements

* Badge collections and series
* Soulbound (non-transferable) badge support
* Metadata standards for interoperability
* Integration with ChainProfile and ReputationScore
* On-chain verification badges
* Advanced search and discovery system

## ⚙️ Contract API

```move id="k3p9zx"
// Mint a badge NFT to any recipient
public fun mint(
    name: vector<u8>,
    description: vector<u8>,
    image_url: vector<u8>,
    recipient: address,
    ctx: &mut TxContext
)

// Burn a badge (owner only)
public fun burn(badge: Badge, ctx: &TxContext)
```

## 💻 Local Development

```bash id="w8n2qa"
~/.cargo/bin/one move build --path contracts
~/.cargo/bin/one client publish --gas-budget 50000000 contracts
cd frontend && npm install && npm run dev
```

Set in `frontend/.env`:

```env id="z5x1pl"
VITE_PACKAGE_ID=<package_id>
VITE_OPENAI_KEY=<openai_api_key>
```

## 📄 License

MIT License
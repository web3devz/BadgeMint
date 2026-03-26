# BadgeMint

An NFT-based achievement platform built on **OneChain**. Mint digital badges representing accomplishments — permanent, transferable, and publicly verifiable. Badges can represent skills, milestones, or event participation.

---

## Deployed Contracts (Testnet)

| Name | Address |
|------|---------|
| Package ID | `0x7bac0e92cd0b7aaa7407f70702fa9e185aa95a73b1b7057f5f20d9dfe7e3b8f1` |
| Deploy Transaction | `FG3jWEVjVPvTNk47NzxHhc273JjErjZ4Rgag8E87dDTj` |

- [View Package](https://onescan.cc/testnet/objectDetails?address=0x7bac0e92cd0b7aaa7407f70702fa9e185aa95a73b1b7057f5f20d9dfe7e3b8f1)
- [View Deploy Tx](https://onescan.cc/testnet/transactionDetail?digest=FG3jWEVjVPvTNk47NzxHhc273JjErjZ4Rgag8E87dDTj)

---

## Contract API

```move
// Mint a badge NFT to any recipient
public fun mint(name: vector<u8>, description: vector<u8>, image_url: vector<u8>, recipient: address, ctx: &mut TxContext)

// Burn a badge (owner only)
public fun burn(badge: Badge, ctx: &TxContext)
```

---

## Local Development

```bash
~/.cargo/bin/one move build --path contracts
~/.cargo/bin/one client publish --gas-budget 50000000 contracts
cd frontend && npm install && npm run dev
```

Set in `frontend/.env`:
```env
VITE_PACKAGE_ID=<package_id>
```

## License
MIT

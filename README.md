# Bridge Pass

Bridge Pass offers a unique cross-chain gift card solution, allowing you to send gift cards to your loved ones across different blockchain networks. With Bridge Pass, you can easily purchase a gift card and let the recipient redeem it on their desired chain. Additionally, Bridge Pass also supports same-chain gift cards for those who prefer to redeem on the same network.

# Team Members

- [Shantanu Bharadwaj](https://github.com/itsshantanu)
- [Jeet Patel](https://github.com/jeet-patel313)
- [Mohit Chandel](https://github.com/mohitchandel)
- [Karan Goraniya](https://github.com/karangorania)

## How it's works ?

Bridge Pass leverages the ERC-721 NFT standard to create Soul Bound Tokens, facilitating seamless cross-chain asset transfers through Connext Smart Contracts. For on-chain transfers, Gift Card employs the same ERC-721 NFT standard to ensure a smooth, secure, and efficient process.​

The Gift Card contains a value of 0.0001 + relayer fees, which are negligible. However, these fees may be higher on testnets due to increased traffic and limited liquidity.​

## How to use ?

There are two types of Gift cards: one for cross-chain transactions and the other for on-chain transactions (same-blockchain). Let's discuss Bridge Pass first.

### Bridge Pass

In Bridge Pass, you need to purchase a pass for an amount of 0.0001 ETH + 0.0003 Relayer fees. Once you buy the pass and enter the recipient's details, triggering the transaction will provide you with a unique Token ID. This Token ID is used to redeem the pass on the respective chain. We utilize the ERC-721 NFT Standard as Soul Bound Tokens to ensure that the gift cannot be transferred to someone else. After completing these steps, inform your loved ones to redeem the gift by entering the Token ID, and voila! They will have successfully redeemed the gift card.

Bridge Pass is available on testnet and Mainnet.

### Supported Chains

#### Mainnet

| Mainnet  | Redeem to |
| :------- | :-------- |
| Optimism | Arbitrum  |
| Arbitrum | Optimism  |

#### Mainnet Contracts

- [Optimism](https://optimistic.etherscan.io/address/0x463e6d4993d30D9f2987a4C53d4E4a18DE195586)
- [Arbitrum](https://arbiscan.io/address/0x7bFDe3c8a9444882FbEB20e7CB2c992925102792)

#### Testnet

| Mainnet         | Testnet         |
| :-------------- | :-------------- |
| Goerli          | Optimism-Goerli |
| Optimism-Goerli | Goerli          |

#### Testnet Contracts

- [Goerli Testnet](https://goerli.etherscan.io/address/0x71Ad2386c3C7c94B5D3967dCD4d9748a0AaFf9dB)
- [Optimism-Goerli](https://goerli-optimism.etherscan.io/address/0x6C8AA605436c1846fCFEB0171f8e7274967E44e2)

### Gift Card

Note : Note: All contract address of Gift are same on respective deployed chain.​

When the deployer address and nonce are the same, the resulting contract address will also be the same​

In Gift Card for same-chain transactions, you need to purchase a pass for an amount of 0.0001 ETH. Once you buy the pass and enter the recipient's details, triggering the transaction will provide you with a unique Token ID. This Token ID is used to redeem the pass on the same chain. We utilize the ERC-721 NFT Standard as Soul Bound Tokens to ensure that the gift cannot be transferred to someone else. After completing these steps, inform your loved ones to redeem the gift by entering the Token ID, and voila! They will have successfully redeemed the gift card.

Gift Card is available on testnet and Mainnet.

#### Mainnet Contracts

- [Optimism-Mainnet](https://optimistic.etherscan.io/address/0x7bFDe3c8a9444882FbEB20e7CB2c992925102792)

#### Testnet Contracts

- [Scroll Testnet](https://blockscout.scroll.io/address/0x7bFDe3c8a9444882FbEB20e7CB2c992925102792)
- [Goerli Testnet](https://goerli.etherscan.io/address/0x7bFDe3c8a9444882FbEB20e7CB2c992925102792)
- [Mumbai](https://mumbai.polygonscan.com/address/0x7bFDe3c8a9444882FbEB20e7CB2c992925102792)
- [ZKEVM](https://testnet-zkevm.polygonscan.com/address/0x7bFDe3c8a9444882FbEB20e7CB2c992925102792)
- [Optimism-Goerli](https://goerli-optimism.etherscan.io/address/0x7bFDe3c8a9444882FbEB20e7CB2c992925102792)
- [Sepolia](https://sepolia.etherscan.io/address/0x7bFDe3c8a9444882FbEB20e7CB2c992925102792)

## Tech Stack

- [Wagmi](https://wagmi.sh/)
- [Rainbow Kit](https://rainbowkit.com/)
- [Next Js](https://nextjs.org/)
- [Tailwind Css](https://tailwindcss.com/)
- [Next UI](https://nextui.org/)

## Sponsored Stacks

- [Connext](https://www.connext.network/)
- [Polybase](https://polybase.xyz/)
- [Optimism](https://www.optimism.io/)
- [Polygon ZKEVM](https://polygon.technology/polygon-zkevm)
- [Scroll](https://scroll.io/)
- [Taiko](https://taiko.xyz/)

## Testnet Faucet

- [Alchemy](https://sepoliafaucet.com/)
- [Coinbase](https://coinbase.com/faucets)
- [QuickNode](https://faucet.quicknode.com/drip)
- [Mumbai Faucet](https://mumbaifaucet.com/)

## Run Locally

Clone the project

```bash
git clone git@github.com:karangorania/bridgepass-fe.git
```

Go to the project directory

```bash
cd bridgepass-fe
```

Install dependencies

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

```bash
npm run dev
```

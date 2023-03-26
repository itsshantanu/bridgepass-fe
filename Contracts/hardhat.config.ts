import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
require('dotenv').config();

const { PRIVATE_KEY, ETHERSCAN_API_KEY, SEPOLIA_RPC } = process.env;

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  networks: {
    mumbai: {
      url: `https://rpc.ankr.com/polygon_mumbai`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    op: {
      url: `https://rpc.ankr.com/optimism_testnet`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    goerli: {
      url: `https://rpc.ankr.com/eth_goerli`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    scroll: {
      url: `https://alpha-rpc.scroll.io/l2`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    opMainnet: {
      url: `https://rpc.ankr.com/optimism`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    gnosis: {
      url: `https://rpc.ankr.com/gnosis`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    zkEVM: {
      url: `https://rpc.public.zkevm-test.net`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${SEPOLIA_RPC}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    taiko: {
      url: `https://rpc.a2.taiko.xyz`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    arbitrum: {
      url: `https://rpc.ankr.com/arbitrum`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;

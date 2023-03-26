import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  Chain,
  RainbowKitProvider,
  darkTheme as RainDark,
} from '@rainbow-me/rainbowkit';
import { createTheme, NextUIProvider } from '@nextui-org/react';

import { configureChains, createClient, WagmiConfig } from 'wagmi';
import {
  polygonMumbai,
  optimism,
  optimismGoerli,
  goerli,
  arbitrum,
  sepolia,
} from 'wagmi/chains';
// import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
// import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { Navbar, Footer } from '../components';

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    // colors: {...}, // override dark theme colors
  },
});

interface alchemyProvider {
  apiKey: string;
}

const ZKEVM: Chain = {
  id: 1442,
  name: 'ZKEVM',
  network: 'zKEVM',
  iconUrl:
    'https://roadtoweb3.infura-ipfs.io/ipfs/QmbsCXewp99LzJJ84GiJBXtPe6WxR5KkTyxmoL3PZ53TEG',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'ZKEVM',
    symbol: 'ZKEVM',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.public.zkevm-test.net'],
    },
    public: {
      http: ['https://rpc.public.zkevm-test.net'],
    },
  },
  blockExplorers: {
    default: { name: 'ZK EVM', url: 'https://explorer.public.zkevm-test.net' },
    etherscan: {
      name: 'ZK EVM',
      url: 'https://explorer.public.zkevm-test.net',
    },
  },
  testnet: false,
};
const Scroll: Chain = {
  id: 534353,
  name: 'Scroll',
  network: 'Scroll',
  iconUrl:
    'https://roadtoweb3.infura-ipfs.io/ipfs/QmWc6wpzANexnfBKdbjSRftbHe2qz5q3ptXY2ssa96QyS1',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Scroll',
    symbol: 'Scroll',
  },
  rpcUrls: {
    default: {
      http: ['https://alpha-rpc.scroll.io/l2'],
    },
    public: {
      http: ['https://alpha-rpc.scroll.io/l2'],
    },
  },
  blockExplorers: {
    default: { name: 'Scroll', url: 'https://blockscout.scroll.io' },
    etherscan: {
      name: 'Scroll',
      url: 'https://blockscout.scroll.io',
    },
  },
  testnet: false,
};
const Taiko: Chain = {
  id: 167004,
  name: 'Taiko',
  network: 'taiko',
  iconUrl:
    'https://roadtoweb3.infura-ipfs.io/ipfs/QmbFWsnQhJZXjGRy2fiiEdKfxpMAFi4dnb1nKqxzcYjh3R',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Taiko',
    symbol: 'taiko',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.a2.taiko.xyz'],
    },
    public: {
      http: ['https://rpc.a2.taiko.xyz'],
    },
  },
  blockExplorers: {
    default: { name: 'Taiko', url: 'https://explorer.a2.taiko.xyz' },
    etherscan: {
      name: 'Taiko',
      url: 'https://explorer.a2.taiko.xyz',
    },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [
    Scroll,
    ZKEVM,
    goerli,
    polygonMumbai,
    optimism,
    arbitrum,
    optimismGoerli,
    sepolia,
    Taiko,
  ],
  [
    // this is optional if you want to use your own RPC otherwise it will work with public providers
    //  alchemyProvider({ apiKey: 'YOUR_API_KEY' }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextUIProvider theme={darkTheme}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            theme={RainDark({
              accentColor: '#7b3fe4',
              accentColorForeground: 'white',
              // borderRadius: 'small',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
            showRecentTransactions={true}
          >
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </RainbowKitProvider>
        </WagmiConfig>
      </NextUIProvider>
    </>
  );
}

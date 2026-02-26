export interface ChainConfig {
  chainId: number;
  name: string;
  defaultRpc: string;
  nativeSymbol: string;
}

export const CHAINS: ChainConfig[] = [
  { chainId: 1,     name: "Ethereum",          defaultRpc: "https://eth.drpc.org",                      nativeSymbol: "ETH"  },
  { chainId: 137,   name: "Polygon",            defaultRpc: "https://polygon.drpc.org",                  nativeSymbol: "POL"  },
  { chainId: 56,    name: "BNB Smart Chain",    defaultRpc: "https://bsc-dataseed.binance.org",          nativeSymbol: "BNB"  },
  { chainId: 42161, name: "Arbitrum One",       defaultRpc: "https://arb1.arbitrum.io/rpc",              nativeSymbol: "ETH"  },
  { chainId: 10,    name: "Optimism",           defaultRpc: "https://mainnet.optimism.io",               nativeSymbol: "ETH"  },
  { chainId: 8453,  name: "Base",               defaultRpc: "https://mainnet.base.org",                  nativeSymbol: "ETH"  },
  { chainId: 43114, name: "Avalanche C-Chain",  defaultRpc: "https://api.avax.network/ext/bc/C/rpc",     nativeSymbol: "AVAX" },
];

export const CHAINS_MAP: Record<string, ChainConfig> = Object.fromEntries(
  CHAINS.map((c) => [String(c.chainId), c])
);

export const CUSTOM_CHAIN_VALUE = "custom";

export type metaTestMetaData = {
  chainId: string;
  chainName: string;
  rpcUrls: string[];
  nativeCurrency: {
    name: string;
    decimals: number;
    symbol: string;
  };
};

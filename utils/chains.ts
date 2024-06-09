import { type Chain } from 'viem'

export const onchain = {
  id: 27563,
  name: 'Onchain',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://mainnet.onchaincoin.io'] },
  },
  blockExplorers: {
    default: { name: 'OnchainScan', url: 'https://scan.onchaincoin.io/' },
  },
}
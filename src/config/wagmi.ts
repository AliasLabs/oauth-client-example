import { connector as alias } from 'alias-wallet';
import {
  cookieStorage, 
  createConfig, 
  createStorage, 
  http
} from 'wagmi'
import {
  sepolia, 
  optimismSepolia, 
  baseSepolia, 
  arbitrumSepolia, 
} from 'wagmi/chains'

export const wagmiConfig = createConfig({
  chains: [
    sepolia,
    optimismSepolia,
    baseSepolia,
    arbitrumSepolia,
  ],
  connectors: [
    alias({
      keysUrl: `${process.env.NEXT_PUBLIC_ALIAS_URL}/wallet`,
      appName: 'Local App',
      appLogoUrl: `${process.env.NEXT_PUBLIC_ALIAS_URL}/vercel.svg`,
    })
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  transports: {
    [sepolia.id]: http('https://ethereum-sepolia-rpc.publicnode.com'),
    [optimismSepolia.id]: http('https://optimism-sepolia-rpc.publicnode.com'),
    [baseSepolia.id]: http('https://base-sepolia-rpc.publicnode.com'),
    [arbitrumSepolia.id]: http('https://arbitrum-sepolia-rpc.publicnode.com'),
  }
})
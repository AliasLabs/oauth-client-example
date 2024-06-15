import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { alias } from '@/config/connector';
import { cookieToInitialState, cookieStorage, createConfig, createStorage, custom, http } from 'wagmi'
import { localhost } from 'wagmi/chains'
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alias Client",
  description: "An example app with Alias integrated.",
};

export const wagmiConfig = createConfig({
  chains: [localhost],
  connectors: [
    alias({
      preference: 'smartWalletOnly',
      keysUrl: `http://localhost:3000/wallet`,
      appName: 'Local App',
      appLogoUrl: 'http://localhost:3000/vercel.svg',
    })
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  transports: {
    [localhost.id]: http('http://localhost:8545'),
  }
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get("cookie")
  )
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers initialState={initialState}>
          {children}
        </Providers>
      </body>
    </html>
  );
}

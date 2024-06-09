import "../styles/style.scss";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { RootStore } from "../stores/RootStore";
import { Provider } from "inversify-react";
import { ModalsContainer } from "../modals";
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense } from "react";
import "../components/polyfills";
const rootStore = new RootStore();
const container = rootStore.container;
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import "@farcaster/auth-kit/styles.css";
import { base, sepolia } from "wagmi/chains";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { AuthKitProvider } from "@farcaster/auth-kit";
import {
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  trustWallet,
  coinbaseWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import Header from "../components/Header/header";
// import { SessionProvider, getCsrfToken } from "next-auth/react";
const projectId = "8271a5dee2c5981640ad5d12b20132af";
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        rainbowWallet,
        walletConnectWallet,
        metaMaskWallet,
        trustWallet,
        coinbaseWallet,
        ledgerWallet,
      ],
    },
  ],
  {
    appName: "My RainbowKit App",
    projectId: projectId,
  }
);
const wagmiConfig = createConfig({
  connectors,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});
// export async function getServerSideProps(context: any) {
//   const csrfToken = await getCsrfToken(context);
//   return { props: { csrfToken } };
// }
const queryClient = new QueryClient();
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const AnyComponent = Component as any;
  console.log(pageProps);
  const [loading, setLoading] = useState(false);
  // try reconnect to web3
  useEffect(() => {
    setLoading(true);
  }, []);
  const config = {
    rpcUrl: "https://mainnet.optimism.io",
  };
  return (
    <>
      {loading ? (
        <AuthKitProvider config={config}>
          <Provider container={container}>
            <WagmiProvider config={wagmiConfig}>
              <QueryClientProvider client={queryClient}>
                <RainbowKitProvider initialChain={sepolia}>
                  <Suspense fallback={<h1>Loading posts...</h1>}>
                    {/* <Rotate /> */}
                    <Head>
                      <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                      ></meta>
                    </Head>
                    <Header />
                    <AnyComponent {...pageProps} />
                    <ToastContainer style={{ zIndex: 10000000000 }} />
                    <ModalsContainer />
                  </Suspense>
                </RainbowKitProvider>
              </QueryClientProvider>
            </WagmiProvider>
          </Provider>
        </AuthKitProvider>
      ) : (
        <></>
      )}
    </>
  );
}

export default MyApp;

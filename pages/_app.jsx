import "../assets/styles/index.css";
import React from "react";
import { ChainId, DAppProvider } from "@usedapp/core";
import { Catoshi_Mainnet, Catoshi_Testnet } from "../shared/config";

function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <DAppProvider
        config={{ supportedChains: [Catoshi_Mainnet.chainID, Catoshi_Testnet.chainID] }}
      >
        <Component {...pageProps} />
      </DAppProvider>
    </React.StrictMode>
  );
}

export default MyApp;
// Arbitrum = 42161,
// ArbitrumRinkeby = 421611,
// ArbitrumGoerli = 421613,

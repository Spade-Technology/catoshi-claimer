import '../assets/styles/index.css'
import React from 'react'
import { ChainId, DAppProvider } from '@usedapp/core'

function MyApp({ Component, pageProps }) {
    return (
        <React.StrictMode>
            <DAppProvider config={{supportedChains:[42161,421613, 97]}}>
                <Component {...pageProps} />
            </DAppProvider>
        </React.StrictMode>
    )
}

export default MyApp
// Arbitrum = 42161,
// ArbitrumRinkeby = 421611,
// ArbitrumGoerli = 421613,
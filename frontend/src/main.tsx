import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PrivyProvider } from '@privy-io/react-auth'
import {westendAssetHub} from 'viem/chains';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrivyProvider
      appId='cm9z2wleh02d7jr0m8syfjcgp'
      clientId='client-WY5ixw7UF7TMJ2SiZg4PbATkhYboB6Wcf1mUHDoa8U9xL'
      config={{
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'users-without-wallets'
        },
        defaultChain: westendAssetHub,
        supportedChains: [westendAssetHub],
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>,
)

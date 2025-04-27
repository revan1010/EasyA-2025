import Dashboard from './components/dashboard/Dashboard'
import SupplyBorrow from './components/supply-borrow/SupplyBorrow'
import { usePrivy } from '@privy-io/react-auth'
import { useEffect, useState } from 'react'
import { createPublicClient, http, formatEther } from 'viem'
import { westendAssetHub, unichain, base } from 'viem/chains'

const ConnectWallet = () => {
  const { login, logout, authenticated, ready, user } = usePrivy();
  const [balance, setBalance] = useState<string>('0');
  const [network, setNetwork] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchBalanceAndChain = async () => {
      if (authenticated && user?.wallet?.address) {
        try {
          const publicClient = createPublicClient({
            chain: westendAssetHub,
            transport: http()
          });

          const balance = await publicClient.getBalance({
            address: user.wallet.address as `0x${string}`
          });

          setBalance(formatEther(balance));
          setNetwork('WestEnd Asset Hub');
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    fetchBalanceAndChain();
  }, [authenticated, user?.wallet?.address]);

  if (!ready) return null;

  if (!authenticated) {
    return (
      <button
        onClick={login}
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity"
      >
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity flex items-center gap-2"
      >
        <span className="hidden sm:inline">{user?.wallet?.address?.slice(0, 6)}...{user?.wallet?.address?.slice(-4)}</span>
        <span className="sm:hidden">Wallet</span>
        <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg bg-background-card border border-border shadow-lg p-4 z-50">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-text-secondary">Network</p>
              <p className="font-medium text-text-primary">{network}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Balance</p>
              <p className="font-medium text-text-primary">{balance} WND</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Address</p>
              <p className="font-medium text-text-primary break-all">{user?.wallet?.address}</p>
            </div>
            <button
              onClick={logout}
              className="w-full mt-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent-blue to-secondary bg-clip-text text-transparent">
              Cross-Chain Lending
            </h1>
            <p className="mt-2 text-text-secondary">Manage your cross-chain assets in one place</p>
          </div>
          <ConnectWallet />
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Dashboard />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-background-card rounded-2xl shadow-lg border border-border p-6">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">Supply/Borrow</h2>
              <SupplyBorrow />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-background-card rounded-2xl shadow-lg border border-border p-6">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">Cross-Chain Transfers</h2>
              {/* Cross-chain visualization will go here */}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

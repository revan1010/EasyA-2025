import Dashboard from './components/dashboard/Dashboard'
import SupplyBorrow from './components/supply-borrow/SupplyBorrow'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Cross-Chain Lending
          </h1>
          <p className="mt-2 text-gray-600">Manage your cross-chain assets in one place</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Dashboard />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-semibold mb-4">Supply/Borrow</h2>
              <SupplyBorrow />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-semibold mb-4">Cross-Chain Transfers</h2>
              {/* Cross-chain visualization will go here */}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

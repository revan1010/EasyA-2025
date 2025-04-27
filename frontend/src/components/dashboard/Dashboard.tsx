import HealthFactor from './HealthFactor';
import SummaryCard from './SummaryCard';
import PositionsTable from './PositionsTable';

const Dashboard = () => {
  // Mock data - in a real app, this would come from your API
  const mockData = {
    healthFactor: 1.8,
    totalSupplied: 1250.75,
    totalBorrowed: 695.25,
    positions: [
      { chain: 'Moonbeam', asset: 'GLMR', supplied: 500, borrowed: 0, apy: 3.2 },
      { chain: 'Acala', asset: 'ACA', supplied: 750, borrowed: 0, apy: 2.8 },
      { chain: 'Astar', asset: 'ASTR', supplied: 0, borrowed: 695, apy: 4.5 }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HealthFactor value={mockData.healthFactor} />
        <SummaryCard
          title="Total Supplied"
          value={mockData.totalSupplied}
          change={2.5}
          icon="💰"
          subtitle="Total value locked"
        />
        <SummaryCard
          title="Total Borrowed"
          value={mockData.totalBorrowed}
          change={-1.2}
          icon="📊"
          subtitle="Current borrowed amount"
        />
      </div>

      <PositionsTable positions={mockData.positions} />
    </div>
  );
};

export default Dashboard; 
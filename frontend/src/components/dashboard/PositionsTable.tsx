interface Position {
  chain: string;
  asset: string;
  supplied: number;
  borrowed: number;
  apy: number;
}

interface PositionsTableProps {
  positions: Position[];
}

const PositionsTable = ({ positions }: PositionsTableProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800">Your Positions</h3>
          <p className="text-sm text-gray-500">Overview of your lending and borrowing positions</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Chain</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Asset</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Supplied</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Borrowed</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">APY</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position, index) => (
              <tr 
                key={index} 
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150
                  ${index === positions.length - 1 ? 'border-b-0' : ''}`}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">{position.chain}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="font-medium text-gray-900">{position.asset}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className={`font-medium ${position.supplied > 0 ? 'text-emerald-600' : 'text-gray-500'}`}>
                    {position.supplied.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className={`font-medium ${position.borrowed > 0 ? 'text-rose-600' : 'text-gray-500'}`}>
                    {position.borrowed.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="font-medium text-emerald-600">
                    {position.apy.toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PositionsTable; 
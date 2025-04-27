import { useState } from 'react';
import { RepayModal } from '../RepayModal';

type TokenSymbol = 'GLMR' | 'ACA' | 'ASTR' | 'DOT' | 'USDC' | 'USDT';

interface Position {
  chain: string;
  asset: TokenSymbol;
  supplied: number;
  borrowed: number;
  apy: number;
}

interface PositionsTableProps {
  positions: Position[];
}

const PositionsTable = ({ positions }: PositionsTableProps) => {
  const [isRepayModalOpen, setIsRepayModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  const handleRepay = (position: Position) => {
    setSelectedPosition(position);
    setIsRepayModalOpen(true);
  };

  const getValueGradient = (value: number, type: 'supplied' | 'borrowed') => {
    if (value === 0) return 'text-text-muted';
    return type === 'supplied'
      ? 'bg-gradient-to-r from-accent-green to-accent-green-light bg-clip-text text-transparent'
      : 'bg-gradient-to-r from-accent-red to-accent-red-light bg-clip-text text-transparent';
  };

  return (
    <>
      <div className="bg-gradient-card from-background-gradient-from to-background-gradient-to rounded-2xl shadow-lg border border-border/50 backdrop-blur-sm p-6 relative overflow-hidden group transition-all duration-300 hover:bg-gradient-card-hover">
        <div className="absolute inset-px bg-background-card/50 rounded-2xl -z-10" />
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-medium bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">Your Positions</h3>
            <p className="text-sm text-text-secondary">Overview of your lending and borrowing positions</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/70">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Chain</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Asset</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Supplied</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Borrowed</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">APY</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-border/40 hover:bg-background-light/50 transition-all duration-200
                    ${index === positions.length - 1 ? 'border-b-0' : ''}`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <span className="font-medium bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">{position.chain}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">{position.asset}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={`font-medium ${getValueGradient(position.supplied, 'supplied')}`}>
                      {position.supplied.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={`font-medium ${getValueGradient(position.borrowed, 'borrowed')}`}>
                      {position.borrowed.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-medium bg-gradient-to-r from-accent-green via-accent-green-light to-accent-green bg-clip-text text-transparent">
                      {position.apy.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    {position.borrowed > 0 && (
                      <button
                        onClick={() => handleRepay(position)}
                        className="bg-gradient-to-r from-primary via-primary-dark to-primary px-4 py-2 rounded-lg hover:from-primary-light hover:via-primary hover:to-primary-dark transition-all duration-200 shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 text-white font-medium"
                      >
                        Repay
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPosition && (
        <RepayModal
          isOpen={isRepayModalOpen}
          onClose={() => {
            setIsRepayModalOpen(false);
            setSelectedPosition(null);
          }}
          loanAmount={selectedPosition.borrowed}
          loanToken={selectedPosition.asset}
        />
      )}
    </>
  );
};

export default PositionsTable; 
import { useState } from 'react';
import { RepayModal as TokenRepayModal } from '../RepayModal';

type TokenSymbol = 'GLMR' | 'ACA' | 'ASTR' | 'DOT' | 'USDC' | 'USDT';

interface Position {
  chain: string;
  asset: TokenSymbol;
  borrowed: number;
  apy: number;
}

interface RepayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data - in production this would come from your API or state management
const BORROWED_POSITIONS: Position[] = [
  { chain: 'Astar', asset: 'ASTR', borrowed: 695, apy: 4.5 }
];

const RepayModal: React.FC<RepayModalProps> = ({ isOpen, onClose }) => {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg w-[400px]">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Select Position to Repay</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="p-4">
            <div className="space-y-2">
              {BORROWED_POSITIONS.map((position) => (
                <button
                  key={position.asset}
                  onClick={() => setSelectedPosition(position)}
                  className="w-full p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{position.asset}</div>
                      <div className="text-sm text-gray-500">{position.chain}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-rose-600">
                        ${position.borrowed.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {position.apy}% APY
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedPosition && (
        <TokenRepayModal
          isOpen={!!selectedPosition}
          onClose={() => setSelectedPosition(null)}
          loanAmount={selectedPosition.borrowed}
          loanToken={selectedPosition.asset}
        />
      )}
    </>
  );
};

export default RepayModal; 
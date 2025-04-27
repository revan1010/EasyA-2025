import { useState } from 'react';
import Modal from '../shared/Modal';

interface RepayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tokens = [
  { symbol: 'GLMR', name: 'Moonbeam', borrowed: 0 },
  { symbol: 'ACA', name: 'Acala', borrowed: 0 },
  { symbol: 'ASTR', name: 'Astar', borrowed: 695 },
];

const RepayModal = ({ isOpen, onClose }: RepayModalProps) => {
  const [selectedToken, setSelectedToken] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle repayment logic here
    console.log('Repaying:', { token: selectedToken, amount });
    onClose();
  };

  const selectedTokenDetails = tokens.find(t => t.symbol === selectedToken);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Repay Loan">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Token to Repay
          </label>
          <select
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
            required
          >
            <option value="">Select a token</option>
            {tokens.filter(token => token.borrowed > 0).map((token) => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol} - {token.name} (Borrowed: ${token.borrowed})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount to Repay
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="0.00"
              required
              min="0"
              max={selectedTokenDetails?.borrowed || 0}
              step="0.01"
            />
            {selectedToken && (
              <span className="absolute right-3 top-2 text-gray-500">
                {selectedToken}
              </span>
            )}
          </div>
          {selectedTokenDetails && (
            <p className="mt-2 text-sm text-gray-500">
              Maximum repayable amount: ${selectedTokenDetails.borrowed}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 text-white font-medium bg-rose-600 rounded-xl hover:bg-rose-700 transition-colors duration-200"
        >
          Repay Loan
        </button>
      </form>
    </Modal>
  );
};

export default RepayModal; 
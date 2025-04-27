import { useState } from 'react';
import Modal from '../shared/Modal';

interface LendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tokens = [
  { symbol: 'GLMR', name: 'Moonbeam', apy: 3.2 },
  { symbol: 'ACA', name: 'Acala', apy: 2.8 },
  { symbol: 'ASTR', name: 'Astar', apy: 4.5 },
];

const LendModal = ({ isOpen, onClose }: LendModalProps) => {
  const [selectedToken, setSelectedToken] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle lending logic here
    console.log('Lending:', { token: selectedToken, amount });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Lend Assets">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Token
          </label>
          <select
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
            required
          >
            <option value="">Select a token</option>
            {tokens.map((token) => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol} - {token.name} (APY: {token.apy}%)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
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
              step="0.01"
            />
            {selectedToken && (
              <span className="absolute right-3 top-2 text-gray-500">
                {selectedToken}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 text-white font-medium bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors duration-200"
        >
          Add to Pool
        </button>
      </form>
    </Modal>
  );
};

export default LendModal; 
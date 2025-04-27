import { useState } from 'react';
import Modal from '../shared/Modal';
import { ethers } from 'ethers';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import VAULT_ABI from '../../contracts/abi/vault.json';
import ERC20_ABI from '../../contracts/abi/mUSDC.json';
import { toast } from 'react-hot-toast';

interface LendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VAULT_ADDRESS = "0x2a971E9F6BD32a7D20026DE9Eb186E69Aa29d56A";

const tokens = [
  { 
    symbol: 'USDC', 
    name: 'USD Coin', 
    apy: 1.5,
    address: "0x91C0ed808e4B283FcBfD94af7FFc3241dAa2CC89",
    decimals: 18
  },
  // Add other tokens here
];

const LendModal = ({ isOpen, onClose }: LendModalProps) => {
  const [selectedToken, setSelectedToken] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const activeWallet = wallets[0]; // Using the first connected wallet

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || !authenticated || !activeWallet) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      setIsLoading(true);
      const token = tokens.find(t => t.symbol === selectedToken);
      if (!token) {
        throw new Error('Token not found');
      }

      const provider = await activeWallet.getEthereumProvider();
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();

      // Initialize contracts
      const tokenContract = new ethers.Contract(
        token.address,
        ERC20_ABI,
        signer
      );
      const vaultContract = new ethers.Contract(
        VAULT_ADDRESS,
        VAULT_ABI,
        signer
      );

      // Parse amount to proper decimals
      const depositAmount = ethers.parseUnits(amount, token.decimals);

      // First approve vault to spend tokens
      const approveTx = await tokenContract.approve(VAULT_ADDRESS, depositAmount);
      await approveTx.wait();
      
      // Then deposit into vault
      const depositTx = await vaultContract.depositERC20(token.address, depositAmount);
      await depositTx.wait();

      toast.success('Successfully deposited tokens!');
      onClose();
    } catch (error) {
      console.error('Lending error:', error);
      toast.error('Failed to deposit tokens. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading || !ready || !authenticated}
          className={`w-full px-4 py-3 text-white font-medium bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors duration-200 ${
            (isLoading || !ready || !authenticated) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Processing...' : 'Add to Pool'}
        </button>
      </form>
    </Modal>
  );
};

export default LendModal; 
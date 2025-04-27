import { useState, useRef } from 'react';
import Modal from '../shared/Modal';
import { ethers } from 'ethers';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import LENDING_ENGINE_ABI from '../../contracts/abi/lendingEngine.json';
import ERC20_ABI from '../../contracts/abi/mUSDC.json';
import { toast } from 'react-hot-toast';

interface BorrowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CollateralType = 'nft' | 'token';

const LENDING_ENGINE_ADDRESS = "0x2a971E9F6BD32a7D20026DE9Eb186E69Aa29d56A"; // Replace with actual address

const tokens = [
  { 
    symbol: 'USDC', 
    name: 'USD Coin', 
    available: 500,
    address: "0x91C0ed808e4B283FcBfD94af7FFc3241dAa2CC89",
    decimals: 18
  },
  { 
    symbol: 'DAI', 
    name: 'Dai Stablecoin', 
    available: 750,
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    decimals: 18
  },
  // Add other tokens here
];

const BorrowModal = ({ isOpen, onClose }: BorrowModalProps) => {
  const [selectedToken, setSelectedToken] = useState('');
  const [amount, setAmount] = useState('');
  const [nftImage, setNftImage] = useState<string | null>(null);
  const [collateralType, setCollateralType] = useState<CollateralType>('token');
  const [collateralToken, setCollateralToken] = useState('');
  const [collateralAmount, setCollateralAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const activeWallet = wallets[0];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNftImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || !authenticated || !activeWallet) {
      toast.error('Please connect your wallet first');
      return;
    }

    // If NFT collateral is selected, show mock message and return
    if (collateralType === 'nft') {
      toast.success('NFT collateral functionality coming soon!');
      return;
    }

    try {
      setIsLoading(true);
      const token = tokens.find(t => t.symbol === selectedToken);
      const collateral = tokens.find(t => t.symbol === collateralToken);
      
      if (!token || !collateral) {
        throw new Error('Token not found');
      }

      const provider = await activeWallet.getEthereumProvider();
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();

      // Initialize contracts
      const lendingEngine = new ethers.Contract(
        LENDING_ENGINE_ADDRESS,
        LENDING_ENGINE_ABI,
        signer
      );
      
      const collateralTokenContract = new ethers.Contract(
        collateral.address,
        ERC20_ABI,
        signer
      );

      // Parse amounts
      const borrowAmount = ethers.parseUnits(amount, token.decimals);
      const collateralTokenAmount = ethers.parseUnits(collateralAmount, collateral.decimals);

      // First approve lending engine to spend collateral tokens
      console.log('Approving collateral spend...');
      const approveTx = await collateralTokenContract.approve(LENDING_ENGINE_ADDRESS, collateralTokenAmount);
      await approveTx.wait();
      console.log('Collateral approved');
      
      // Then borrow tokens
      // We use the collateral token as the fee asset
      // The third parameter is for slippage/deadline, using 0 as default
      console.log('Borrowing tokens...');
      console.log('Amount:', borrowAmount.toString());
      console.log('Fee Asset:', collateral.address);
      const borrowTx = await lendingEngine.borrow(
        borrowAmount,         // Amount to borrow
        collateral.address,   // Using collateral token as fee asset
        0                    // Slippage/deadline parameter
      );
      await borrowTx.wait();
      console.log('Borrow successful');

      toast.success('Successfully borrowed tokens!');
      onClose();
    } catch (error) {
      console.error('Borrowing error:', error);
      toast.error('Failed to borrow tokens. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Borrow Assets">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Token to Borrow
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
                {token.symbol} - {token.name} (Available: ${token.available})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount to Borrow
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

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Collateral Type
          </label>
          
          <div className="flex justify-center space-x-4 p-2 bg-gray-100 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setCollateralType('nft');
                setCollateralAmount(''); // Reset collateral amount when switching
              }}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                collateralType === 'nft'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              NFT Proof
            </button>
            <button
              type="button"
              onClick={() => setCollateralType('token')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                collateralType === 'token'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Token Collateral
            </button>
          </div>

          {collateralType === 'nft' ? (
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl">
              <div className="space-y-1 text-center">
                {nftImage ? (
                  <div className="relative">
                    <img
                      src={nftImage}
                      alt="NFT Preview"
                      className="mx-auto h-32 w-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setNftImage(null)}
                      className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          ref={fileInputRef}
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Collateral Token
                </label>
                <select
                  value={collateralToken}
                  onChange={(e) => setCollateralToken(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                  required={collateralType === 'token'}
                >
                  <option value="">Select a token</option>
                  {tokens.map((token) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol} - {token.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Collateral Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={collateralAmount}
                    onChange={(e) => setCollateralAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="0.00"
                    required={collateralType === 'token'}
                    min="0"
                    step="0.01"
                  />
                  {collateralToken && (
                    <span className="absolute right-3 top-2 text-gray-500">
                      {collateralToken}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  You'll need to approve this token for use as collateral
                </p>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !ready || !authenticated}
          className={`w-full px-4 py-3 text-white font-medium bg-primary rounded-xl hover:bg-primary-dark transition-colors duration-200 ${
            (isLoading || !ready || !authenticated) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Processing...' : 'Submit Borrow Request'}
        </button>
      </form>
    </Modal>
  );
};

export default BorrowModal; 
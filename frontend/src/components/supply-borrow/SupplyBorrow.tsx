import { useState } from 'react';
import LendModal from './LendModal';
import BorrowModal from './BorrowModal';
import RepayModal from './RepayModal';

const SupplyBorrow = () => {
  const [isLendModalOpen, setIsLendModalOpen] = useState(false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [isRepayModalOpen, setIsRepayModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setIsLendModalOpen(true)}
          className="w-full px-4 py-3 text-white font-medium bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors duration-200"
        >
          Lend
        </button>
        <button
          onClick={() => setIsBorrowModalOpen(true)}
          className="w-full px-4 py-3 text-white font-medium bg-primary rounded-xl hover:bg-primary-dark transition-colors duration-200"
        >
          Borrow
        </button>
      </div>

      {/* Repay Button */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-2 bg-white text-sm text-gray-500">Active Loans</span>
        </div>
      </div>

      <button
        onClick={() => setIsRepayModalOpen(true)}
        className="w-full px-4 py-3 text-white font-medium bg-rose-600 rounded-xl hover:bg-rose-700 transition-colors duration-200 relative"
      >
        <div className="absolute -top-1 -right-1 h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
        </div>
        Repay Loan
      </button>

      <LendModal 
        isOpen={isLendModalOpen} 
        onClose={() => setIsLendModalOpen(false)} 
      />
      
      <BorrowModal 
        isOpen={isBorrowModalOpen} 
        onClose={() => setIsBorrowModalOpen(false)} 
      />

      <RepayModal
        isOpen={isRepayModalOpen}
        onClose={() => setIsRepayModalOpen(false)}
      />
    </div>
  );
};

export default SupplyBorrow; 
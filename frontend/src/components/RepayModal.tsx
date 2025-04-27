import React, { useState, useEffect } from 'react';

type TokenSymbol = 'GLMR' | 'ACA' | 'ASTR' | 'DOT' | 'USDC' | 'USDT';

interface ExchangeRate {
  USD: number;
}

type ExchangeRates = {
  [key in TokenSymbol]: ExchangeRate;
};

// Mock exchange rates - In production, these would come from an oracle or API
const MOCK_EXCHANGE_RATES: ExchangeRates = {
  GLMR: { USD: 0.45 },
  ACA: { USD: 0.12 },
  ASTR: { USD: 0.08 },
  DOT: { USD: 9.50 },
  USDC: { USD: 1.00 },
  USDT: { USD: 1.00 }
};

interface Token {
  symbol: TokenSymbol;
  name: string;
  network: string;
}

const AVAILABLE_TOKENS: Token[] = [
  { symbol: 'ASTR', name: 'Astar', network: 'Astar Network' },
  { symbol: 'GLMR', name: 'Moonbeam', network: 'Moonbeam Network' },
  { symbol: 'ACA', name: 'Acala', network: 'Acala Network' }
];

interface RepayModalProps {
  isOpen: boolean;
  onClose: () => void;
  loanAmount: number;
  loanToken: TokenSymbol;
}

export const RepayModal: React.FC<RepayModalProps> = ({
  isOpen,
  onClose,
  loanAmount,
  loanToken
}) => {
  const [selectedToken, setSelectedToken] = useState<TokenSymbol>(loanToken);
  const [repayAmount, setRepayAmount] = useState<string>(loanAmount.toString());

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[400px]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Repay Loan</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-4">
          {/* Loan Information */}
          <div className="mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Loan Amount</span>
              <span className="font-medium">{loanAmount} {loanToken}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">USD Value</span>
              <span className="font-medium">$55.60</span>
            </div>
          </div>

          {/* Token Selection */}
          <div className="mb-6">
            <label className="block text-sm mb-2">Select Token to Repay</label>
            <div className="space-y-2">
              {AVAILABLE_TOKENS.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => setSelectedToken(token.symbol)}
                  className={`w-full p-3 rounded-lg flex items-center justify-between ${
                    selectedToken === token.symbol
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                      {token.symbol.charAt(0)}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{token.symbol}</span>
                      <span className="text-sm text-gray-500">{token.network}</span>
                    </div>
                  </div>
                  {selectedToken === token.symbol && (
                    <span className="text-green-500">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm mb-2">Amount to Repay</label>
            <div className="relative">
              <input
                type="text"
                value={repayAmount}
                onChange={(e) => setRepayAmount(e.target.value)}
                className="w-full p-3 pr-16 border rounded-lg"
                placeholder="0.00"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {selectedToken}
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Maximum repayable amount: {loanAmount} {loanToken}
            </div>
            <div className="mt-1 text-sm text-gray-600">
              You will repay: {repayAmount} {selectedToken}
            </div>
          </div>

          {/* Repay Button */}
          <button
            onClick={() => {
              console.log(`Repaying ${repayAmount} ${selectedToken}`);
              onClose();
            }}
            className="w-full bg-[#E31B7D] text-white py-3 rounded-lg hover:bg-[#C8186F] transition-colors duration-200"
          >
            Repay Loan
          </button>
        </div>
      </div>
    </div>
  );
}; 
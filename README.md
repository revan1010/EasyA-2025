# EasyA-2025: Cross-Chain Lending Protocol

A decentralized lending protocol built on Asset Hub that enables users to lend and borrow assets using both token and NFT collateral.

## 🎥 Demo Video

[Watch the Full Demo](https://www.youtube.com/watch?v=fxqqwEfpG0I)

[![Demo Video](path-to-thumbnail)](https://www.youtube.com/watch?v=fxqqwEfpG0I)

## 📸 UI Screenshots

### Lending Interface
![Lending Interface](path-to-lending-screenshot)
- Clean and intuitive interface for lending assets
- Real-time APY display
- Transaction status notifications

### Borrowing Interface
![Borrowing Interface](path-to-borrowing-screenshot)
- Support for multiple collateral types (Tokens & NFTs)
- Clear collateral requirements
- Easy-to-use token selection

### Portfolio Dashboard
![Portfolio Dashboard](path-to-dashboard-screenshot)
- Overview of lending positions
- Active borrows tracking
- Collateral health monitoring

## 🔧 Smart Contract Architecture

Our protocol consists of three main smart contracts:

### 1. Vault Contract
- Handles asset deposits and withdrawals
- Manages lending pool liquidity
- Tracks user deposits and earnings

```solidity
function depositERC20(address token, uint256 amount) external {
    // Deposit logic
}
```

### 2. Lending Engine Contract
- Manages borrowing operations
- Handles collateral locking and release
- Implements interest rate calculations

```solidity
function borrow(uint256 amount, address feeAsset, uint256 slippage) external {
    // Borrowing logic
}
```

### 3. Asset Conversion Contract
- Handles token swaps and conversions
- Provides price feeds for collateral valuation
- Manages slippage protection

```solidity
function swapExactInput(
    address tokenIn,
    address tokenOut,
    uint256 amountIn,
    uint256 slippage
) external returns (uint256 amountOut) {
    // Swap logic
}
```

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── supply-borrow/
│   │   │   ├── LendModal.tsx      # Lending interface
│   │   │   └── BorrowModal.tsx    # Borrowing interface
│   │   └── shared/
│   ├── contracts/
│   │   ├── abi/                   # Contract ABIs
│   │   └── configs/               # Contract addresses
│   └── hooks/                     # Custom React hooks
└── public/

contracts/
├── Vault.sol                      # Asset vault contract
├── LendingEngine.sol             # Core lending logic
└── Conversion.sol                # Asset conversion
```

## 🔍 Key Features

1. **Multi-Asset Support**
   - Support for multiple tokens (USDC, DAI)
   - NFT collateral support (coming soon)

2. **User-Friendly Interface**
   - Intuitive UI for lending and borrowing
   - Real-time transaction status
   - Clear error messaging

3. **Security Features**
   - Secure contract interactions
   - Slippage protection
   - Transaction confirmation steps

## 🌐 Deployed Contracts

### Asset Hub (Polkadot)
- Vault: [`0x2a971E9F6BD32a7D20026DE9Eb186E69Aa29d56A`](block-explorer-link)
- Lending Engine: [`0x91C0ed808e4B283FcBfD94af7FFc3241dAa2CC89`](block-explorer-link)
- Asset Conversion: [`0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063`](block-explorer-link)

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/EasyA-2025.git
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Add your configuration
```

4. Run the development server:
```bash
npm run dev
```

## 🛠️ Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Web3**: ethers.js, Privy
- **Smart Contracts**: Solidity
- **Testing**: Hardhat, Chai

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Asset Hub team for the infrastructure
- EasyA hackathon organizers
- Our mentors and supporters

## 📞 Contact

For questions or support, reach out to:
- Email: your.email@example.com
- Twitter: [@yourhandle](https://x.com/revanchonnad) 

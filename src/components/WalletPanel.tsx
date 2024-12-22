import React from 'react';
import { Wallet } from 'lucide-react';

interface WalletPanelProps {
  balance: number;
  depositAmount: string;
  withdrawAmount: string;
  onDeposit: () => void;
  onWithdraw: () => void;
  onDepositAmountChange: (amount: string) => void;
  onWithdrawAmountChange: (amount: string) => void;
}

export default function WalletPanel({
  balance,
  depositAmount,
  withdrawAmount,
  onDeposit,
  onWithdraw,
  onDepositAmountChange,
  onWithdrawAmountChange
}: WalletPanelProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="text-blue-500" />
        <span className="text-xl font-bold">${balance.toFixed(2)}</span>
      </div>
      
      <div className="space-y-4">
        <div>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => onDepositAmountChange(e.target.value)}
            placeholder="Enter deposit amount"
            className="w-full p-2 border rounded-md mb-2"
          />
          <button
            onClick={onDeposit}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Deposit
          </button>
        </div>
        
        <div>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => onWithdrawAmountChange(e.target.value)}
            placeholder="Enter withdrawal amount"
            className="w-full p-2 border rounded-md mb-2"
          />
          <button
            onClick={onWithdraw}
            className="w-full bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
interface WalletActionsProps {
  depositAmount: string;
  withdrawAmount: string;
  onDeposit: () => void;
  onWithdraw: () => void;
  onDepositAmountChange: (amount: string) => void;
  onWithdrawAmountChange: (amount: string) => void;
  maxWithdraw: number;
}

export default function WalletActions({
  depositAmount,
  withdrawAmount,
  onDeposit,
  onWithdraw,
  onDepositAmountChange,
  onWithdrawAmountChange,
  maxWithdraw
}: WalletActionsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Wallet Actions</h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deposit Funds
          </label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => onDepositAmountChange(e.target.value)}
            placeholder="Enter deposit amount"
            className="w-full p-2 border rounded-md mb-2"
          />
          <button
            onClick={onDeposit}
            disabled={!depositAmount || Number(depositAmount) <= 0}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Deposit
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Withdraw Funds (Max: ${maxWithdraw.toFixed(2)})
          </label>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => onWithdrawAmountChange(e.target.value)}
            placeholder="Enter withdrawal amount"
            max={maxWithdraw}
            className="w-full p-2 border rounded-md mb-2"
          />
          <button
            onClick={onWithdraw}
            disabled={!withdrawAmount || Number(withdrawAmount) <= 0 || Number(withdrawAmount) > maxWithdraw}
            className="w-full bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
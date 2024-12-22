import { Color } from '../types';

interface BetFormProps {
  amount: string;
  onAmountChange: (amount: string) => void;
  onPlaceBet: () => void;
  selectedColor: Color | null;
  disabled?: boolean;
}

export default function BetForm({ 
  amount, 
  onAmountChange, 
  onPlaceBet, 
  selectedColor,
  disabled 
}: BetFormProps) {
  return (
    <div className="space-y-4">
      <input
        type="number"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        placeholder="Enter bet amount"
        disabled={disabled}
        className="w-full p-2 border rounded-md disabled:bg-gray-100"
      />
      <button
        onClick={onPlaceBet}
        disabled={!selectedColor || !amount || disabled}
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Place Bet
      </button>
    </div>
  );
}
import { Bet } from '../types';
import { formatDate } from '../utils/format';

interface BetHistoryProps {
  bets: Bet[];
}

export default function BetHistory({ bets }: BetHistoryProps) {
  return (
    <div className="space-y-4">
      {bets.map((bet, key) => (
        <div
          key={key}
          className={`p-4 rounded-md ${
            bet.result === 'pending'
              ? 'bg-gray-100'
              : bet.result === 'win'
              ? 'bg-green-100'
              : 'bg-red-100'
          }`}
        >
          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              Selected: 
              <span className={`
                w-4 h-4 rounded-full inline-block
                ${bet.selectedColor === 'green' ? 'bg-green-500' : ''}
                ${bet.selectedColor === 'red' ? 'bg-red-500' : ''}
                ${bet.selectedColor === 'yellow' ? 'bg-yellow-500' : ''}
              `}/>
            </span>
            <span>Amount: ${bet.amount}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>{formatDate(bet.timestamp)}</span>
            <span>
              {bet.result === 'pending' ? (
                'Waiting for result...'
              ) : (
                <>
                  {bet.result === 'win' ? 'Won: ' : 'Lost: '}
                  ${Math.abs(bet.profit || 0)}
                </>
              )}
            </span>
          </div>
          {bet.winningColor && (
            <div className="mt-2 text-sm text-gray-600">
              Winning color: 
              <span className={`
                w-3 h-3 rounded-full inline-block ml-2
                ${bet.winningColor === 'green' ? 'bg-green-500' : ''}
                ${bet.winningColor === 'red' ? 'bg-red-500' : ''}
                ${bet.winningColor === 'yellow' ? 'bg-yellow-500' : ''}
              `}/>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
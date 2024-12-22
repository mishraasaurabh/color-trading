import React from 'react';
import { Bet } from '../types';

interface CurrentRoundProps {
  currentBets: Bet[];
}

export default function CurrentRound({ currentBets }: CurrentRoundProps) {
  const totalBets = currentBets.length;
  const totalAmount = currentBets.reduce((sum, bet) => sum + bet.amount, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold mb-4">Current Round</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-500">{totalBets}</div>
          <div className="text-gray-600">Total Bets</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-green-500">${totalAmount}</div>
          <div className="text-gray-600">Total Amount</div>
        </div>
      </div>
    </div>
  );
}
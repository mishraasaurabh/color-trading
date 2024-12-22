import { GamePhase } from '../types';
import { Timer } from 'lucide-react';

interface GameStatusProps {
  phase: GamePhase;
  timeLeft: number;
}

export default function GameStatus({ phase, timeLeft }: GameStatusProps) {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center gap-2">
        <Timer className="text-blue-500" />
        <span className="font-bold text-xl">{timeLeft}s</span>
      </div>
      <div className="text-lg">
        {phase === 'waiting' && 'Next round starts in...'}
        {phase === 'betting' && 'Place your bets!'}
        {phase === 'revealing' && 'Revealing winner...'}
      </div>
    </div>
  );
}
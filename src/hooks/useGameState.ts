import { useState, useEffect } from 'react';
import { GameState, Color } from '../types';

const WAITING_TIME = 10;
const BETTING_TIME = 30;
const REVEALING_TIME = 10;

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'waiting',
    timeLeft: WAITING_TIME,
    roundId: crypto.randomUUID(),
    winningColor: null,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setGameState(prev => {
        const timeLeft = prev.timeLeft - 1;

        if (timeLeft <= 0) {
          switch (prev.phase) {
            case 'waiting':
              return {
                phase: 'betting',
                timeLeft: BETTING_TIME,
                roundId: prev.roundId,
                winningColor: null,
              };
            case 'betting':
              return {
                phase: 'revealing',
                timeLeft: REVEALING_TIME,
                roundId: prev.roundId,
                winningColor: ['green', 'red', 'yellow'][Math.floor(Math.random() * 3)] as Color,
              };
            case 'revealing':
              return {
                phase: 'waiting',
                timeLeft: WAITING_TIME,
                roundId: crypto.randomUUID(),
                winningColor: null,
              };
          }
        }

        return { ...prev, timeLeft };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return gameState;
}
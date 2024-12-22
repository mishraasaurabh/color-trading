export type Color = 'green' | 'red' | 'yellow';

export type GamePhase = 'waiting' | 'betting' | 'revealing';

export interface User {
  id: string;
  email: string;
  password: string;
  balance: number;
}

export interface Bet {
  id: string;
  userId: string;
  selectedColor: Color;
  amount: number;
  winningColor: Color | null;
  timestamp: number;
  result: 'win' | 'loss' | 'pending';
  profit?: number;
  roundId: string;
}

export interface GameState {
  phase: GamePhase;
  timeLeft: number;
  roundId: string;
  winningColor: Color | null;
}
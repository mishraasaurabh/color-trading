import { User, Bet } from '../types';

export const getUsers = (): User[] => {
  return JSON.parse(localStorage.getItem('users') || '[]');
};

export const saveUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  const currentUserId = localStorage.getItem('currentUserId');
  if (!currentUserId) return null;
  
  const users = getUsers();
  return users.find(user => user.id === currentUserId) || null;
};

export const updateUserBalance = (userId: string, newBalance: number) => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex].balance = newBalance;
    localStorage.setItem('users', JSON.stringify(users));
  }
};

export const getBets = (): Bet[] => {
  return JSON.parse(localStorage.getItem('bets') || '[]');
};

export const saveBet = (bet: Bet) => {
  const bets = getBets();
  bets.push(bet);
  localStorage.setItem('bets', JSON.stringify(bets));
};
import {useEffect, useState} from 'react';
import {Bet, Color, User} from '../types';
import {getBets, saveBet, updateUserBalance} from '../utils/storage';
import {History} from 'lucide-react';
import ColorPicker from './ColorPicker';
import BetForm from './BetForm';
import BetHistory from './BetHistory';
import GameStatus from './GameStatus';
import CurrentRound from './CurrentRound';
import Header from './Header';
import {useGameState} from '../hooks/useGameState';

interface TradingProps {
    user: User;
    onUpdateUser: (user: User) => void;
    onLogout: () => void;
}

export default function Trading({user, onUpdateUser, onLogout}: TradingProps) {
    const gameState = useGameState();
    const [selectedColor, setSelectedColor] = useState<Color | null>(null);
    const [betAmount, setBetAmount] = useState('');
    // const [depositAmount, setDepositAmount] = useState('');
    // const [withdrawAmount, setWithdrawAmount] = useState('');
    const [showHistory, setShowHistory] = useState(false);
    const [userBets, setUserBets] = useState<Bet[]>([]);

    useEffect(() => {
        const bets = getBets().filter(bet => bet.userId === user.id);
        setUserBets(bets);
    }, [user.id]);

    useEffect(() => {
        if (gameState.phase === 'revealing' && gameState.winningColor) {
            const currentRoundBets = userBets.filter(
                bet => bet.roundId === gameState.roundId && bet.result === 'pending'
            );

            currentRoundBets.forEach(bet => {
                const won = bet.selectedColor === gameState.winningColor;
                const profit = won ? bet.amount * 2 : -bet.amount;

                const updatedBet = {
                    ...bet,
                    winningColor: gameState.winningColor,
                    result: won ? 'win' : 'loss' as 'win' | 'loss',
                    profit
                };

                const newBalance = user.balance + profit;
                updateUserBalance(user.id, newBalance);
                onUpdateUser({...user, balance: newBalance});

                saveBet(updatedBet);
                setUserBets(prev =>
                    prev.map(b => b.id === bet.id ? updatedBet : b)
                );
            });
        }
    }, [gameState.phase, gameState.winningColor]);

    const placeBet = () => {
        if (!selectedColor || !betAmount || gameState.phase !== 'betting') return;

        const amount = Number(betAmount);
        if (amount <= 0 || amount > user.balance) return;

        const bet: Bet = {
            id: crypto.randomUUID(),
            userId: user.id,
            selectedColor,
            amount,
            winningColor: null,
            timestamp: Date.now(),
            result: 'pending',
            roundId: gameState.roundId
        };

        const newBalance = user.balance - amount;
        updateUserBalance(user.id, newBalance);
        onUpdateUser({...user, balance: newBalance});
        saveBet(bet);
        setUserBets(prev => [...prev, bet]);
        setBetAmount('');
        setSelectedColor(null);
    };

    // const handleDeposit = () => {
    //   const amount = Number(depositAmount);
    //   if (amount <= 0) return;
    //   const newBalance = user.balance + amount;
    //   updateUserBalance(user.id, newBalance);
    //   onUpdateUser({ ...user, balance: newBalance });
    //   setDepositAmount('');
    // };
    //
    // const handleWithdraw = () => {
    //   const amount = Number(withdrawAmount);
    //   if (amount <= 0 || amount > user.balance) return;
    //   const newBalance = user.balance - amount;
    //   updateUserBalance(user.id, newBalance);
    //   onUpdateUser({ ...user, balance: newBalance });
    //   setWithdrawAmount('');
    // };

    const currentRoundBets = userBets.filter(bet => bet.roundId === gameState.roundId);

    return (
        <div className="min-h-screen bg-gray-100 p-2">
            <div className="max-w-4xl mx-auto">
                <Header
                    email={user.email}
                    balance={user.balance}
                    onLogout={onLogout}
                />

                <GameStatus phase={gameState.phase} timeLeft={gameState.timeLeft}/>

                <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                    <h3 className="text-xl font-bold mb-6">Place Your Bet</h3>
                    <div className="space-y-6">
                        <div className="flex-1 justify-items-center">
                            <ColorPicker
                                selectedColor={selectedColor}
                                onColorSelect={setSelectedColor}
                                disabled={gameState.phase !== 'betting'}
                            />
                        </div>

                        <BetForm
                            amount={betAmount}
                            onAmountChange={setBetAmount}
                            onPlaceBet={placeBet}
                            selectedColor={selectedColor}
                            disabled={gameState.phase !== 'betting'}
                        />
                    </div>
                </div>

              <CurrentRound currentBets={currentRoundBets}/>

                <div className="mt-4">
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className="flex items-center gap-2 mb-4 text-blue-500 hover:text-blue-600"
                    >
                        <History/>
                        {showHistory ? 'Hide History' : 'Show History'}
                    </button>

                    {showHistory && (
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4">Betting History</h3>
                            <BetHistory bets={userBets}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
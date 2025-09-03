import React from 'react';
import { Player, GameStatus as Status } from '../types/game';
import { Trophy, Users, Bot, Loader2 } from 'lucide-react';

interface GameStatusProps {
  status: Status;
  currentPlayer: Player;
  winner: Player | null;
  mode: string;
  isThinking: boolean;
}

export const GameStatus: React.FC<GameStatusProps> = ({
  status,
  currentPlayer,
  winner,
  mode,
  isThinking
}) => {
  const getStatusMessage = () => {
    if (status === 'won') {
      return (
        <div className="flex items-center gap-2 text-xl font-bold">
          <Trophy className="text-yellow-500" size={24} />
          Player {winner} Wins!
        </div>
      );
    }

    if (status === 'draw') {
      return (
        <div className="flex items-center gap-2 text-xl font-bold text-gray-600 dark:text-gray-400">
          <Users size={24} />
          It's a Draw!
        </div>
      );
    }

    if (isThinking && mode === 'computer' && currentPlayer === 'O') {
      return (
        <div className="flex items-center gap-2 text-lg font-semibold text-blue-600">
          <Loader2 className="animate-spin" size={20} />
          Computer is thinking...
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 text-lg font-semibold">
        {mode === 'computer' && currentPlayer === 'O' ? (
          <>
            <Bot size={20} />
            Computer's Turn
          </>
        ) : (
          <>
            <Users size={20} />
            Player {currentPlayer}'s Turn
          </>
        )}
      </div>
    );
  };

  return (
    <div className="text-center py-4">
      <div className={`
        transition-all duration-300
        ${status === 'won' ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-700 dark:text-gray-300'}
      `}>
        {getStatusMessage()}
      </div>
    </div>
  );
};
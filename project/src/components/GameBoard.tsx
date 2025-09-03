import React from 'react';
import { Board, Player } from '../types/game';
import { X, Circle } from 'lucide-react';

interface GameBoardProps {
  board: Board;
  onCellClick: (index: number) => void;
  disabled: boolean;
  winningLine?: number[];
}

export const GameBoard: React.FC<GameBoardProps> = ({ 
  board, 
  onCellClick, 
  disabled,
  winningLine = []
}) => {
  const renderCell = (value: Player | null, index: number) => {
    const isWinningCell = winningLine.includes(index);
    
    return (
      <button
        key={index}
        onClick={() => onCellClick(index)}
        disabled={disabled || value !== null}
        className={`
          aspect-square bg-white/20 backdrop-blur-sm border-2 border-white/30
          rounded-xl flex items-center justify-center text-4xl font-bold
          transition-all duration-200 hover:bg-white/30 hover:scale-105
          disabled:cursor-not-allowed active:scale-95
          ${isWinningCell ? 'bg-yellow-400/30 border-yellow-400/50' : ''}
          ${value ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {value === 'X' && (
          <X 
            size={40} 
            className={`text-blue-600 transition-all duration-300 ${isWinningCell ? 'animate-pulse' : ''}`}
          />
        )}
        {value === 'O' && (
          <Circle 
            size={40} 
            className={`text-orange-600 transition-all duration-300 ${isWinningCell ? 'animate-pulse' : ''}`}
          />
        )}
      </button>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-3 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
      {board.map((cell, index) => renderCell(cell, index))}
    </div>
  );
};
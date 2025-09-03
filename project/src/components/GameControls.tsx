import React from 'react';
import { GameMode, Difficulty } from '../types/game';
import { RotateCcw, User, Bot, Brain, Zap, Target } from 'lucide-react';

interface GameControlsProps {
  mode: GameMode;
  difficulty: Difficulty;
  onModeChange: (mode: GameMode) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onReset: () => void;
  isThinking: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  mode,
  difficulty,
  onModeChange,
  onDifficultyChange,
  onReset,
  isThinking
}) => {
  const difficultyIcons = {
    easy: <Zap size={16} />,
    medium: <Brain size={16} />,
    hard: <Target size={16} />
  };

  const difficultyColors = {
    easy: 'from-green-500 to-emerald-600',
    medium: 'from-yellow-500 to-orange-600',
    hard: 'from-red-500 to-pink-600'
  };

  return (
    <div className="space-y-4">
      {/* Game Mode Selection */}
      <div className="flex gap-2">
        <button
          onClick={() => onModeChange('human')}
          className={`
            flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200
            flex items-center justify-center gap-2
            ${mode === 'human'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
              : 'bg-white/20 text-gray-700 dark:text-gray-300 hover:bg-white/30'
            }
          `}
        >
          <User size={16} />
          2 Players
        </button>
        <button
          onClick={() => onModeChange('computer')}
          className={`
            flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200
            flex items-center justify-center gap-2
            ${mode === 'computer'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
              : 'bg-white/20 text-gray-700 dark:text-gray-300 hover:bg-white/30'
            }
          `}
        >
          <Bot size={16} />
          vs Computer
        </button>
      </div>

      {/* Difficulty Selection (only for computer mode) */}
      {mode === 'computer' && (
        <div className="grid grid-cols-3 gap-2">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
            <button
              key={level}
              onClick={() => onDifficultyChange(level)}
              disabled={isThinking}
              className={`
                py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200
                flex items-center justify-center gap-1 capitalize
                ${difficulty === level
                  ? `bg-gradient-to-r ${difficultyColors[level]} text-white shadow-md scale-105`
                  : 'bg-white/20 text-gray-600 dark:text-gray-400 hover:bg-white/30'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {difficultyIcons[level]}
              {level}
            </button>
          ))}
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={onReset}
        disabled={isThinking}
        className="
          w-full py-3 px-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white
          rounded-xl font-semibold transition-all duration-200
          flex items-center justify-center gap-2
          hover:from-gray-600 hover:to-gray-700 hover:scale-105
          disabled:opacity-50 disabled:cursor-not-allowed
          active:scale-95
        "
      >
        <RotateCcw size={16} />
        New Game
      </button>
    </div>
  );
};
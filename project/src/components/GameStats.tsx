import React from 'react';
import { GameStats } from '../types/game';
import { BarChart3, Trophy, Users, Minus, RotateCcw } from 'lucide-react';

interface GameStatsProps {
  stats: GameStats;
  onResetStats: () => void;
}

export const GameStatsComponent: React.FC<GameStatsProps> = ({ stats, onResetStats }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <BarChart3 size={20} />
          Game Statistics
        </h3>
        <button
          onClick={onResetStats}
          className="
            p-2 bg-red-500/20 hover:bg-red-500/30 text-red-600 dark:text-red-400
            rounded-lg transition-all duration-200 hover:scale-105
          "
          title="Reset Statistics"
        >
          <RotateCcw size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
          <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400 mb-1">
            <Trophy size={16} />
            <span className="font-semibold">Player X</span>
          </div>
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.xWins}</div>
        </div>
        
        <div className="text-center p-3 bg-orange-500/20 rounded-lg border border-orange-500/30">
          <div className="flex items-center justify-center gap-1 text-orange-600 dark:text-orange-400 mb-1">
            <Trophy size={16} />
            <span className="font-semibold">Player O</span>
          </div>
          <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">{stats.oWins}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gray-500/20 rounded-lg border border-gray-500/30">
          <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
            <Minus size={16} />
            <span className="font-semibold">Draws</span>
          </div>
          <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">{stats.draws}</div>
        </div>
        
        <div className="text-center p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
          <div className="flex items-center justify-center gap-1 text-purple-600 dark:text-purple-400 mb-1">
            <Users size={16} />
            <span className="font-semibold">Total</span>
          </div>
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{stats.gamesPlayed}</div>
        </div>
      </div>
    </div>
  );
};
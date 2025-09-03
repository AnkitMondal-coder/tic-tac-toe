import React, { useEffect } from 'react';
import { GameBoard } from './components/GameBoard';
import { GameControls } from './components/GameControls';
import { GameStatus } from './components/GameStatus';
import { GameStatsComponent } from './components/GameStats';
import { ThemeToggle } from './components/ThemeToggle';
import { useGameState } from './hooks/useGameState';
import { useSound } from './hooks/useSound';
import { useTheme } from './hooks/useTheme';
import { getWinningLine } from './utils/winningCombinations';
import { Gamepad2 } from 'lucide-react';

function App() {
  const {
    gameState,
    stats,
    isThinking,
    makeMove,
    makeComputerMove,
    resetGame,
    setGameMode,
    setDifficulty,
    resetStats
  } = useGameState();

  const { playMoveSound, playWinSound, playDrawSound } = useSound();
  const { theme, toggleTheme } = useTheme();

  const winningLine = gameState.winner ? getWinningLine(gameState.board) : [];

  const handleCellClick = (index: number) => {
    const success = makeMove(index);
    if (success) {
      playMoveSound();
    }
  };

  // Handle computer moves
  useEffect(() => {
    if (gameState.mode === 'computer' && 
        gameState.currentPlayer === 'O' && 
        gameState.gameStatus === 'playing') {
      makeComputerMove();
    }
  }, [gameState.currentPlayer, gameState.mode, gameState.gameStatus, makeComputerMove]);

  // Play sounds for game end
  useEffect(() => {
    if (gameState.gameStatus === 'won') {
      playWinSound();
    } else if (gameState.gameStatus === 'draw') {
      playDrawSound();
    }
  }, [gameState.gameStatus, playWinSound, playDrawSound]);

  return (
    <div className={`
      min-h-screen transition-all duration-500
      ${theme === 'dark' 
        //? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-500'
        // : 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500'
        : 'bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500'
      }
    `}>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
              <Gamepad2 size={32} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black drop-shadow-lg">
              Tic-Tac-Toe
            </h1>
          </div>
          <p className="text-black/90 text-lg font-medium">
            Modern cross-zero game with advanced AI
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Game Controls */}
            <div className="order-2 lg:order-1">
              <GameControls
                mode={gameState.mode}
                difficulty={gameState.difficulty}
                onModeChange={setGameMode}
                onDifficultyChange={setDifficulty}
                onReset={resetGame}
                isThinking={isThinking}
              />
            </div>

            {/* Game Board */}
            <div className="order-1 lg:order-2 flex flex-col items-center">
              <GameStatus
                status={gameState.gameStatus}
                currentPlayer={gameState.currentPlayer}
                winner={gameState.winner}
                mode={gameState.mode}
                isThinking={isThinking}
              />
              
              <div className="mt-4">
                <GameBoard
                  board={gameState.board}
                  onCellClick={handleCellClick}
                  disabled={isThinking || gameState.gameStatus !== 'playing'}
                  winningLine={winningLine}
                />
              </div>
            </div>

            {/* Game Statistics */}
            <div className="order-3">
              <GameStatsComponent
                stats={stats}
                onResetStats={resetStats}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
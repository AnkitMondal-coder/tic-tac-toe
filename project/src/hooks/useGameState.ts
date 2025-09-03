import { useState, useCallback } from 'react';
import { GameState, GameStats, Player, GameMode, Difficulty, CellValue } from '../types/game';
import { checkWinner, getAvailableMoves, getBestMove } from '../utils/gameLogic';

const initialBoard: CellValue[] = Array(9).fill(null);

const initialGameState: GameState = {
  board: initialBoard,
  currentPlayer: 'X',
  gameStatus: 'playing',
  winner: null,
  mode: 'human',
  difficulty: 'medium'
};

const initialStats: GameStats = {
  xWins: 0,
  oWins: 0,
  draws: 0,
  gamesPlayed: 0
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [stats, setStats] = useState<GameStats>(initialStats);
  const [isThinking, setIsThinking] = useState(false);

  const updateStats = useCallback((winner: Player | null) => {
    setStats(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
      xWins: winner === 'X' ? prev.xWins + 1 : prev.xWins,
      oWins: winner === 'O' ? prev.oWins + 1 : prev.oWins,
      draws: winner === null ? prev.draws + 1 : prev.draws
    }));
  }, []);

  const makeMove = useCallback((index: number) => {
    if (gameState.board[index] || gameState.gameStatus !== 'playing') {
      return false;
    }

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    const winner = checkWinner(newBoard);
    const gameStatus = winner ? 'won' : newBoard.every(cell => cell) ? 'draw' : 'playing';

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
      gameStatus,
      winner
    }));

    if (gameStatus !== 'playing') {
      updateStats(winner);
    }

    return true;
  }, [gameState, updateStats]);

  const makeComputerMove = useCallback(() => {
    if (gameState.gameStatus !== 'playing' || gameState.currentPlayer !== 'O') {
      return;
    }

    setIsThinking(true);

    // Add a small delay to show thinking animation
    setTimeout(() => {
      const availableMoves = getAvailableMoves(gameState.board);
      if (availableMoves.length === 0) return;

      let move: number;

      switch (gameState.difficulty) {
        case 'easy':
          // Random move
          move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
          break;
        case 'medium':
          // 70% chance of best move, 30% random
          if (Math.random() < 0.7) {
            move = getBestMove(gameState.board, 'O');
          } else {
            move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
          }
          break;
        case 'hard':
          // Always best move
          move = getBestMove(gameState.board, 'O');
          break;
        default:
          move = availableMoves[0];
      }

      const newBoard = [...gameState.board];
      newBoard[move] = 'O';

      const winner = checkWinner(newBoard);
      const gameStatus = winner ? 'won' : newBoard.every(cell => cell) ? 'draw' : 'playing';

      setGameState(prev => ({
        ...prev,
        board: newBoard,
        currentPlayer: 'X',
        gameStatus,
        winner
      }));

      if (gameStatus !== 'playing') {
        updateStats(winner);
      }

      setIsThinking(false);
    }, 500);
  }, [gameState, updateStats]);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      board: initialBoard,
      currentPlayer: 'X',
      gameStatus: 'playing',
      winner: null
    }));
    setIsThinking(false);
  }, []);

  const setGameMode = useCallback((mode: GameMode) => {
    setGameState(prev => ({ ...prev, mode }));
  }, []);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setGameState(prev => ({ ...prev, difficulty }));
  }, []);

  const resetStats = useCallback(() => {
    setStats(initialStats);
  }, []);

  return {
    gameState,
    stats,
    isThinking,
    makeMove,
    makeComputerMove,
    resetGame,
    setGameMode,
    setDifficulty,
    resetStats
  };
};
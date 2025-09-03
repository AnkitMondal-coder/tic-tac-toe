import { Board, Player, CellValue } from '../types/game';

export const checkWinner = (board: Board): Player | null => {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player;
    }
  }

  return null;
};

export const getAvailableMoves = (board: Board): number[] => {
  return board.reduce((moves: number[], cell, index) => {
    if (cell === null) moves.push(index);
    return moves;
  }, []);
};

export const minimax = (board: Board, depth: number, isMaximizing: boolean, player: Player): number => {
  const winner = checkWinner(board);
  
  if (winner === player) return 10 - depth;
  if (winner && winner !== player) return depth - 10;
  if (getAvailableMoves(board).length === 0) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const move of getAvailableMoves(board)) {
      board[move] = player;
      const score = minimax(board, depth + 1, false, player);
      board[move] = null;
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    const opponent = player === 'X' ? 'O' : 'X';
    for (const move of getAvailableMoves(board)) {
      board[move] = opponent;
      const score = minimax(board, depth + 1, true, player);
      board[move] = null;
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
};

export const getBestMove = (board: Board, player: Player): number => {
  let bestScore = -Infinity;
  let bestMove = 0;
  const boardCopy = [...board];

  for (const move of getAvailableMoves(boardCopy)) {
    boardCopy[move] = player;
    const score = minimax(boardCopy, 0, false, player);
    boardCopy[move] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};
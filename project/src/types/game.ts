export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[];
export type GameMode = 'human' | 'computer';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  gameStatus: GameStatus;
  winner: Player | null;
  mode: GameMode;
  difficulty: Difficulty;
}

export interface GameStats {
  xWins: number;
  oWins: number;
  draws: number;
  gamesPlayed: number;
}
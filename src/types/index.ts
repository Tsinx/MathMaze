export interface Character {
  id: string;
  name: string;
  type: 'macrophage' | 'neutrophil' | 'tcell' | 'bcell' | 'nkcell' | 'probiotic';
  hp: number;
  maxHp: number;
  defense: number;
  emoji: string;
  color: string;
  probioticType?: 'lactobacillus' | 'bifidobacterium' | 'lactobacillus_acidophilus' | 'lactobacillus_rhamnosus' | 'saccharomyces';
}

export interface Enemy {
  id: string;
  originalId?: string; // ID from constants.ts for assets
  name: string;
  type: 'bacteria' | 'virus' | 'parasite';
  subtype: string;
  hp: number;
  maxHp: number;
  attack: number;
  dangerLevel: 1 | 2 | 3 | 4 | 5; // Expanded to 5 levels
  emoji: string;
  counterAttackTime: number; // Seconds for player to answer during enemy counterattack
  intro: string; // Self-introduction in child-friendly anime style for TTS
  x?: number;
  y?: number;
  isBoss?: boolean; // 是否为守关BOSS
  bossIntro?: string; // BOSS专属TTS配音
}

export interface Position {
  x: number;
  y: number;
}

export type ShortestPaths = Record<string, { dx: number; dy: number }>;

export interface MazeCell {
  x: number;
  y: number;
  hasAlly: boolean;
  hasEnemy: boolean;
  isExit: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  canMoveLeft: boolean;
  canMoveRight: boolean;
  allyType?: 'macrophage' | 'neutrophil' | 'tcell' | 'bcell' | 'nkcell' | 'probiotic';
  probioticType?: 'lactobacillus' | 'bifidobacterium' | 'lactobacillus_acidophilus' | 'lactobacillus_rhamnosus' | 'saccharomyces';
}

export interface MathQuestion {
  operand1: number;
  operand2: number;
  correctAnswer: number;
  options: number[];
}

export interface CombatLogEntry {
  message: string;
  type: 'attack' | 'damage' | 'miss' | 'victory';
  timestamp: number;
}

export interface CombatState {
  isActive: boolean;
  phase: 'attack' | 'defense';
  playerCharacter: Character;
  currentEnemy: Enemy;
  diceRoll1: number;
  diceRoll2: number;
  question: MathQuestion;
  selectedAnswer: number | null;
  combatLog: CombatLogEntry[];
  diceFaces: number; // For difficulty
  animationStatus: 'idle' | 'attacking' | 'hit' | 'blocked' | 'returning'; // Controls visual state
  isInputLocked: boolean; // Prevents input during animations
  isPlayingIntro: boolean; // Whether enemy intro audio is playing
}

export interface GameState {
  currentLevel: number; // 关卡(1-5)，决定敌人数量和最高敌人等级
  currentOrgan: string;
  difficulty: number; // 游戏难度(1-5)，决定骰子面数
  playerTeam: Character[];
  maze: MazeCell[][];
  playerPosition: Position;
  enemies: Enemy[];
  collectedAllies: number;
  activeCharacterId: string;
  gameStatus: 'playing' | 'combat' | 'victory' | 'defeat';
  shortestPaths: ShortestPaths;
}

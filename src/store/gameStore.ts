import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, CombatState, Position, Enemy } from '../types';
import { generateMaze } from '../utils/mazeGenerator';
import { calculateShortestPaths, getCompletePath } from '../utils/pathfinding';
import { generateMathQuestion } from '../utils/mathGenerator';
import { IMMUNE_CELLS, PATHOGENS, PROBIOTICS } from '../utils/constants';
import { soundManager } from '../utils/SoundManager';
import { audioManager } from '../utils/AudioManager';
import { getRandomTemplate } from '../data/strokeTemplates';

interface GameStore {
  gameState: GameState;
  combatState: CombatState | null;
  introAudio: HTMLAudioElement | null;
  isPlayingIntroAudio: boolean;
  diceSides: number;

  // Actions
  startNewGame: (organId: string, difficulty?: number) => void;
  movePlayer: (dx: number, dy: number) => Promise<void>;
  moveEnemies: () => void;
  startCombat: (enemy: Enemy) => Promise<void>;
  skipIntro: () => void;
  rollDiceAndGenerateQuestion: () => Promise<void>;
  answerQuestion: (answer: number) => Promise<void>;
  handleCombatTimeout: () => void;
  closeCombat: () => void;
  resetGame: () => void;
  revivePlayer: () => void;
  setDiceSides: (sides: number) => void;
  setActiveCharacter: (id: string) => void;
  completeAllyCollection: (success: boolean) => void;
}

const INITIAL_GAME_STATE: GameState = {
  currentLevel: 1,
  currentOrgan: 'lung',
  difficulty: 1,
  playerTeam: [],
  maze: [],
  playerPosition: { x: 1, y: 1 },
  enemies: [],
  collectedAllies: 0,
  activeCharacterId: '',
  gameStatus: 'playing',
  shortestPaths: {},
  currentChallengeSymbol: undefined,
  pendingAllyPos: null
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      gameState: { ...INITIAL_GAME_STATE },
      combatState: null,
      introAudio: null,
      isPlayingIntroAudio: false,
      diceSides: 4,

      startNewGame: (organId: string, difficulty: number = 1) => {
        const currentLevel = difficulty; // 难度即为关卡等级

        // 1. Select initial character (Macrophage)
        const initialChar = { ...IMMUNE_CELLS[0] };

        // 2. Generate Maze (10x10 input generates 11x11 maze due to algorithm requiring odd numbers)
        const maze = generateMaze(10, 10);
        const shortestPaths = calculateShortestPaths(maze);

        // 3. Spawn Entities
        const enemies: Enemy[] = [];
        let emptyCells: Position[] = [];

        // Find all empty cells (excluding start and exit)
        // Also exclude cells within 3 Manhattan distance of player start (1, 1)
        const playerStart = { x: 1, y: 1 };
        maze.forEach(row => {
          row.forEach(cell => {
            if (!cell.isExit && (cell.x !== playerStart.x || cell.y !== playerStart.y)) {
              const manhattanDistance = Math.abs(cell.x - playerStart.x) + Math.abs(cell.y - playerStart.y);
              if (manhattanDistance > 3) {
                emptyCells.push({ x: cell.x, y: cell.y });
              }
            }
          });
        });

        // Find exit position
        let exitPos: Position | null = null;
        for (let y = maze.length - 1; y >= 0 && !exitPos; y--) {
          for (let x = maze[y].length - 1; x >= 0 && !exitPos; x--) {
            if (maze[y][x].isExit) {
              exitPos = { x, y };
            }
          }
        }

        // Spawn Allies on the path from player to exit
        const alliesCount = 3;
        
        // Get complete path from player (1,1) to exit
        let allyPositions: Position[] = [];
        if (exitPos) {
          const path = getCompletePath(maze, 1, 1, exitPos.x, exitPos.y);
          
          // Select positions along the path (skip start and nearby positions)
          const minDistanceFromStart = 5; // Don't spawn allies too close to start
          const minDistanceFromEnd = 3; // Don't spawn allies at or near exit
          
          const validPathPositions = path.filter((pos, index) => {
            const distanceFromStart = index;
            const distanceFromEnd = path.length - index;
            return distanceFromStart >= minDistanceFromStart && distanceFromEnd >= minDistanceFromEnd;
          });

          // Distribute allies evenly along the valid path
          if (validPathPositions.length >= alliesCount) {
            const step = Math.floor(validPathPositions.length / (alliesCount + 1));
            for (let i = 0; i < alliesCount; i++) {
              const posIndex = step * (i + 1);
              if (posIndex < validPathPositions.length) {
                allyPositions.push(validPathPositions[posIndex]);
              }
            }
          } else if (validPathPositions.length > 0) {
            // If not enough valid positions, just use all of them
            allyPositions = validPathPositions.slice(0, alliesCount);
          }
        }

        // 确保至少有1个免疫细胞和1个益生菌
        for (let i = 0; i < alliesCount; i++) {
          if (i < allyPositions.length) {
            const pos = allyPositions[i];
            let randomAlly;
            
            if (i === 0) {
              // 第一个位置：随机选择免疫细胞
              randomAlly = IMMUNE_CELLS[Math.floor(Math.random() * IMMUNE_CELLS.length)];
            } else if (i === 1) {
              // 第二个位置：随机选择益生菌
              randomAlly = PROBIOTICS[Math.floor(Math.random() * PROBIOTICS.length)];
            } else {
              // 第三个位置：从所有队友中随机选择
              const allAllies = [...IMMUNE_CELLS, ...PROBIOTICS];
              randomAlly = allAllies[Math.floor(Math.random() * allAllies.length)];
            }
            
            maze[pos.y][pos.x].hasAlly = true;
            maze[pos.y][pos.x].allyType = randomAlly.type;
            maze[pos.y][pos.x].probioticType = randomAlly.probioticType;
          }
        }

        // Remove ally positions from emptyCells so enemies don't spawn on allies
        emptyCells = emptyCells.filter(cellPos => 
          !allyPositions.some(allyPos => allyPos.x === cellPos.x && allyPos.y === cellPos.y)
        );

        // Shuffle empty cells for enemy spawning
        for (let i = emptyCells.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [emptyCells[i], emptyCells[j]] = [emptyCells[j], emptyCells[i]];
        }

        // Spawn Enemies (均匀分布各等级，由难度决定数量)
        // 难度1: 4个敌人(全部level 1)
        // 难度2: 8个敌人(4个level 1, 4个level 2)
        // 难度3: 12个敌人(4个level 1, 4个level 2, 4个level 3)
        // 难度4: 16个敌人(4个level 1, 4个level 2, 4个level 3, 4个level 4)
        const enemiesPerLevel = 4; // 每级固定4个敌人

        for (let level = 1; level <= currentLevel; level++) {
          const enemiesOfThisLevel = PATHOGENS.filter(p => p.dangerLevel === level);

          for (let i = 0; i < enemiesPerLevel; i++) {
            if (emptyCells.length > 0 && enemiesOfThisLevel.length > 0) {
              const pos = emptyCells.pop()!;
              const randomEnemy = {
                ...enemiesOfThisLevel[Math.floor(Math.random() * enemiesOfThisLevel.length)],
              };
              // Store original ID before overwriting it with unique instance ID
              const enemyInstance = {
                ...randomEnemy,
                originalId: randomEnemy.id,
                id: `enemy_${Date.now()}_${level}_${i}`
              };
              maze[pos.y][pos.x].hasEnemy = true;
              enemyInstance.x = pos.x;
              enemyInstance.y = pos.y;
              enemies.push(enemyInstance);
            }
          }
        }

        // Spawn Boss at Exit (difficulty + 1 level, 2x HP)
        const bossLevel = Math.min(currentLevel + 1, 5);
        const bossCandidates = PATHOGENS.filter(p => p.dangerLevel === bossLevel);
        if (bossCandidates.length > 0) {
          const randomBoss = {
            ...bossCandidates[Math.floor(Math.random() * bossCandidates.length)],
          };
          const bossInstance = {
            ...randomBoss,
            originalId: randomBoss.id,
            id: `boss_${Date.now()}`,
            hp: randomBoss.hp * 2,
            maxHp: randomBoss.maxHp * 2,
            isBoss: true,
            bossIntro: `我是${randomBoss.name}，这关的守门大将！想过去，先过我这一关！`
          };

          // Find exit position
          let exitPos: Position | null = null;
          for (let y = maze.length - 1; y >= 0 && !exitPos; y--) {
            for (let x = maze[y].length - 1; x >= 0 && !exitPos; x--) {
              if (maze[y][x].isExit) {
                exitPos = { x, y };
              }
            }
          }

          if (exitPos) {
            maze[exitPos.y][exitPos.x].hasEnemy = true;
            bossInstance.x = exitPos.x;
            bossInstance.y = exitPos.y;
            enemies.push(bossInstance);
          }
        }

        audioManager.playEvent('level_start', currentLevel);

        set({
          gameState: {
            ...INITIAL_GAME_STATE,
            currentLevel,
            currentOrgan: organId,
            difficulty,
            playerTeam: [initialChar],
            activeCharacterId: initialChar.id,
            maze,
            enemies,
            gameStatus: 'playing',
            shortestPaths
          },
          combatState: null
        });
      },

      movePlayer: async (dx: number, dy: number) => {
        const { gameState, startCombat } = get();
        if (gameState.gameStatus !== 'playing') return;

        const newX = gameState.playerPosition.x + dx;
        const newY = gameState.playerPosition.y + dy;

        // Check bounds and walls
        if (
          newY < 0 || newY >= gameState.maze.length ||
          newX < 0 || newX >= gameState.maze[0].length
        ) {
          return;
        }

        // Check walls based on direction
        const canMove = (dy === -1) ? gameState.maze[gameState.playerPosition.y][gameState.playerPosition.x].canMoveUp :
                       (dy === 1) ? gameState.maze[gameState.playerPosition.y][gameState.playerPosition.x].canMoveDown :
                       (dx === -1) ? gameState.maze[gameState.playerPosition.y][gameState.playerPosition.x].canMoveLeft :
                                      gameState.maze[gameState.playerPosition.y][gameState.playerPosition.x].canMoveRight;
        if (!canMove) {
          return;
        }

        // Check Enemy
        const cell = gameState.maze[newY][newX];
        if (cell.hasEnemy) {
          const enemy = gameState.enemies.find(e => e.x === newX && e.y === newY);
          if (enemy) {
            soundManager.playEnemyAttack();
            startCombat(enemy);
            return; // Don't move yet
          }
        }

        // Check Ally
        if (cell.hasAlly) {
          soundManager.playMove();
          const template = getRandomTemplate();
          
          set((state) => ({
            gameState: {
              ...state.gameState,
              playerPosition: { x: newX, y: newY },
              gameStatus: 'challenge',
              currentChallengeSymbol: template.name,
              pendingAllyPos: { x: newX, y: newY }
            }
          }));
          return;
        }

        // Check Exit
        if (cell.isExit) {
          soundManager.playLevelComplete();
          audioManager.playEvent('find_exit');
          set((state) => ({
            gameState: {
              ...state.gameState,
              playerPosition: { x: newX, y: newY },
              gameStatus: 'victory'
            }
          }));
          return;
        }

        const newTeam = [...gameState.playerTeam];
        const collectedAllies = gameState.collectedAllies;
        const newMaze = [...gameState.maze.map(row => [...row])];

        soundManager.playMove();
        set((state) => ({
          gameState: {
            ...state.gameState,
            playerPosition: { x: newX, y: newY },
            playerTeam: newTeam,
            collectedAllies,
            maze: newMaze
          }
        }));
      },

      moveEnemies: () => {
        const { gameState, startCombat } = get();
        if (gameState.gameStatus !== 'playing') return;

        const newEnemies = [...gameState.enemies];
        const newMaze = [...gameState.maze.map(row => [...row])];
        let combatTriggered = false;
        let combatEnemy = null;
        const playerPos = gameState.playerPosition;

        newEnemies.forEach((enemy, index) => {
          if (combatTriggered) return; // Only start one combat at a time
          if (enemy.x === undefined || enemy.y === undefined) return;
          if (enemy.isBoss) return; // BOSS doesn't move

          let nextX = enemy.x;
          let nextY = enemy.y;
          let moveDetermined = false;

          // 1. Try moving towards player (33% chance)
          // 使用混合分布：1/3概率向玩家移动，2/3概率随机移动
          const isChasing = Math.random() < 0.33;
          
          if (isChasing) {
            const key = `${enemy.x},${enemy.y}|${playerPos.x},${playerPos.y}`;
            const nextStep = gameState.shortestPaths[key];
            
            if (nextStep) {
              const targetX = enemy.x + nextStep.dx;
              const targetY = enemy.y + nextStep.dy;
              
              // Verify move is valid (mainly check for other enemies)
              if (targetX >= 0 && targetX < newMaze[0].length && targetY >= 0 && targetY < newMaze.length) {
                 // Check other enemies (avoid stacking)
                 if (!newMaze[targetY][targetX].hasEnemy) {
                    nextX = targetX;
                    nextY = targetY;
                    moveDetermined = true;
                 }
              }
            }
          }

          // 2. If not chasing or chase move failed/blocked, move randomly
          if (!moveDetermined) {
             const directions = [
                { dx: 0, dy: -1 },
                { dx: 0, dy: 1 },
                { dx: -1, dy: 0 },
                { dx: 1, dy: 0 }
              ];
              // Shuffle directions to be truly random
              for (let i = directions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [directions[i], directions[j]] = [directions[j], directions[i]];
              }

              for (const dir of directions) {
                  const tx = enemy.x! + dir.dx;
                  const ty = enemy.y! + dir.dy;
                  
                  // Check bounds
                  if (ty < 0 || ty >= newMaze.length || tx < 0 || tx >= newMaze[0].length) continue;
                  
                  // Check walls
                  const canMove = (dir.dy === -1) ? newMaze[enemy.y!][enemy.x!].canMoveUp :
                                 (dir.dy === 1) ? newMaze[enemy.y!][enemy.x!].canMoveDown :
                                 (dir.dx === -1) ? newMaze[enemy.y!][enemy.x!].canMoveLeft :
                                                 newMaze[enemy.y!][enemy.x!].canMoveRight;
                  if (!canMove) continue;

                  // Check other enemies
                  if (newMaze[ty][tx].hasEnemy) continue;
                  
                  // Valid move found
                  nextX = tx;
                  nextY = ty;
                  moveDetermined = true;
                  break;
              }
          }
          
          if (!moveDetermined) return; // Stuck

          // Check Player Collision
          if (nextX === playerPos.x && nextY === playerPos.y) {
            combatTriggered = true;
            combatEnemy = enemy;
            soundManager.playEnemyAttack();
            return; // Combat starts
          }

          // Execute Move
          newMaze[enemy.y!][enemy.x!].hasEnemy = false;
          newMaze[nextY][nextX].hasEnemy = true;
          newEnemies[index] = { ...enemy, x: nextX, y: nextY };
        });

        if (combatTriggered && combatEnemy) {
          startCombat(combatEnemy);
        } else {
          newMaze.forEach(row => {
            row.forEach(cell => {
              cell.hasEnemy = false;
            });
          });

          newEnemies.forEach(enemy => {
            if (enemy.x !== undefined && enemy.y !== undefined) {
              newMaze[enemy.y][enemy.x].hasEnemy = true;
            }
          });

          set((state) => ({
            gameState: {
              ...state.gameState,
              enemies: newEnemies,
              maze: newMaze
            }
          }));
        }
      },

      startCombat: async (enemy: Enemy) => {
        const { gameState, diceSides } = get();
        const activeChar = gameState.playerTeam.find(c => c.id === gameState.activeCharacterId) || gameState.playerTeam[0];
        const isBoss = enemy.isBoss;

        set({ isPlayingIntroAudio: true });

        if (isBoss) {
          await audioManager.playEvent('enemy_attack_warning');
          await audioManager.playEvent('boss_encounter');
        } else {
          await audioManager.playEvent('enemy_attack_warning');
        }

        set({
          gameState: { ...gameState, gameStatus: 'combat' },
          combatState: {
            isActive: true,
            phase: 'attack',
            playerCharacter: activeChar,
            currentEnemy: enemy,
            diceRoll1: 0,
            diceRoll2: 0,
            diceFaces: diceSides,
            question: { operand1: 0, operand2: 0, correctAnswer: 0, options: [] },
            selectedAnswer: null,
            combatLog: [{ 
              message: isBoss 
                ? `遭遇${enemy.name}！守关BOSS出现了！` 
                : `遭遇 ${enemy.name}！准备战斗！`, 
              type: 'miss', 
              timestamp: Date.now() 
            }],
            animationStatus: 'idle',
            isInputLocked: true,
            isPlayingIntro: true
          },
          isPlayingIntroAudio: false,
          introAudio: null
        });
      },

      skipIntro: () => {
        set((state) => ({
            combatState: state.combatState ? { ...state.combatState, isPlayingIntro: false, isInputLocked: false } : null,
            introAudio: null
        }));
        
        get().rollDiceAndGenerateQuestion();
      },

      rollDiceAndGenerateQuestion: async () => {
        const { combatState } = get();
        if (!combatState) return;

        // Roll 2 dice based on difficulty faces
        const { question, diceRoll1, diceRoll2 } = generateMathQuestion(combatState.diceFaces);

        set((state) => ({
          combatState: {
            ...state.combatState!,
            diceRoll1,
            diceRoll2,
            question,
            selectedAnswer: null,
            animationStatus: 'idle',
            isInputLocked: false
          }
        }));
      },

      handleCombatTimeout: () => {
        const { combatState } = get();
        if (!combatState || combatState.phase !== 'defense') return;

        // 1. Lock Input (Visual feedback for timeout)
        set((state) => ({
             combatState: { ...state.combatState!, isInputLocked: true }
        }));

        soundManager.playEnemyAttack();

        // 2. Start Animation Sequence (Immediate attack since time is up)
        set((state) => ({
             combatState: { ...state.combatState!, animationStatus: 'attacking' }
        }));

        // 3. Impact Phase (0.6s later)
        setTimeout(() => {
             const { combatState: currentCS } = get();
             if (!currentCS) return;
             const newLog = [...currentCS.combatLog];

             // Timeout = Hit
             soundManager.playDamage();
             audioManager.playEvent('take_damage');
             const newPlayerHp = currentCS.playerCharacter.hp - 1;
             newLog.push({ message: '时间到！受到伤害！', type: 'damage', timestamp: Date.now() });

             set((state) => ({
                 gameState: { 
                    ...state.gameState, 
                    playerTeam: state.gameState.playerTeam.map(c => c.id === currentCS.playerCharacter.id ? { ...c, hp: newPlayerHp } : c)
                 },
                 combatState: { 
                     ...state.combatState!, 
                     animationStatus: 'hit',
                     playerCharacter: { ...state.combatState!.playerCharacter, hp: newPlayerHp },
                     combatLog: newLog
                 }
             }));

             if (newPlayerHp <= 0) {
                 const { gameState } = get();
                 const aliveTeammates = gameState.playerTeam.filter(c => c.hp > 0 && c.id !== currentCS.playerCharacter.id);
                 
                 if (aliveTeammates.length > 0) {
                     // Auto-switch to next available teammate
                     const nextChar = aliveTeammates[0];
                     audioManager.playEvent('player_attack_turn'); // Or some switch sound
                     
                     newLog.push({ message: `${currentCS.playerCharacter.name} 倒下了！${nextChar.name} 接替战斗！`, type: 'miss', timestamp: Date.now() });
                     
                     set((state) => ({
                         gameState: { ...state.gameState, activeCharacterId: nextChar.id },
                         combatState: { 
                             ...state.combatState!, 
                             playerCharacter: nextChar,
                             combatLog: newLog 
                         }
                     }));
                     // Continue to next turn logic below...
                 } else {
                     setTimeout(() => {
                         audioManager.playEvent('game_defeat');
                         set((state) => ({
                             gameState: { ...state.gameState, gameStatus: 'defeat' },
                             combatState: null
                         }));
                     }, 1500);
                     return;
                 }
             }

             // 4. Reset and Next Turn (1s later)
             setTimeout(() => {
                 const { combatState: finalCS } = get();
                 if (!finalCS) return;

                 // Back to Player Attack
                 audioManager.playEvent('player_attack_turn');
                 set((state) => ({
                     combatState: { 
                         ...state.combatState!, 
                         phase: 'attack',
                         animationStatus: 'idle',
                         isInputLocked: false,
                         combatLog: [...state.combatState!.combatLog, { 
                             message: '轮到你了！', 
                             type: 'miss', 
                             timestamp: Date.now() 
                         }]
                     }
                }));
                 get().rollDiceAndGenerateQuestion();
             }, 1000);

        }, 600);
      },

      answerQuestion: async (answer: number) => {
        const { combatState } = get();
        if (!combatState || combatState.isInputLocked) return;

        // 1. Lock Input & Show Selection
        set((state) => ({
             combatState: { 
                 ...state.combatState!, 
                 selectedAnswer: answer,
                 isInputLocked: true 
             }
        }));

        const isCorrect = answer === combatState.question.correctAnswer;

        // Play answer audio with sound effect and wait for completion
        const { operand1, operand2, correctAnswer } = combatState.question;
        await audioManager.playAnswerWithSound(operand1, operand2, correctAnswer, isCorrect);

        // 2. Start Animation Sequence (1s delay to see answer)
        setTimeout(() => {
             const { combatState: cs } = get();
             if (!cs) return;

             // Start Attack Animation
             set((state) => ({
                 combatState: { ...state.combatState!, animationStatus: 'attacking' }
             }));
             
             if (cs.phase === 'attack') {
                 soundManager.playAttack();
             } else {
                 soundManager.playEnemyAttack();
             }

             // 3. Impact / Result Phase (0.5s later)
             setTimeout(async () => {
                 const { combatState: currentCS, gameState: currentGS } = get();
                 if (!currentCS) return;
                 const newLog = [...currentCS.combatLog];

                 // Determine outcome
                 if (currentCS.phase === 'attack') {
                     // --- PLAYER ATTACKING ---
                     if (isCorrect) {
                        // HIT!
                        soundManager.playCatch();
                        await audioManager.playEvent('hit_enemy');
                        const newEnemyHp = currentCS.currentEnemy.hp - 1;
                        newLog.push({ message: '攻击命中！', type: 'damage', timestamp: Date.now() });

                         set((state) => ({
                             combatState: {
                                 ...state.combatState!,
                                 animationStatus: 'hit',
                                 currentEnemy: { ...state.combatState!.currentEnemy, hp: newEnemyHp },
                                 combatLog: newLog
                             }
                         }));

                         if (newEnemyHp <= 0) {
                            // Victory logic...
                            const isBoss = currentCS.currentEnemy.isBoss;
                            soundManager.playWin();

                            if (isBoss) {
                                // BOSS defeated: Strong positive feedback
                                await audioManager.playEvent('defeat_enemy');
                                await audioManager.playEvent('boss_defeated');
                                newLog.push({ message: `守关BOSS ${currentCS.currentEnemy.name} 被击败了！太棒了！`, type: 'victory', timestamp: Date.now() });
                            } else {
                                await audioManager.playEvent('defeat_enemy');
                                newLog.push({ message: '敌人被消灭了！', type: 'victory', timestamp: Date.now() });
                            }
                             // ... (Cleanup code)
                             const enemyId = currentCS.currentEnemy.id;

                             const victoryDelay = isBoss ? 3000 : 1500;

                             setTimeout(() => {
                                 set(state => {
                                     // 1. Remove defeated enemy from latest state
                                     const newEnemies = state.gameState.enemies.filter(e => e.id !== enemyId);
                                     
                                     // 2. Refresh Maze Flags (Full sync to prevent ghost enemies)
                                     const newMaze = state.gameState.maze.map(row => row.map(cell => {
                                         const cellCopy = { ...cell };
                                         cellCopy.hasEnemy = false; // Clear all first
                                         return cellCopy;
                                     }));

                                     // 3. Re-apply flags based on remaining enemies
                                     newEnemies.forEach(enemy => {
                                         if (enemy.x !== undefined && enemy.y !== undefined) {
                                             newMaze[enemy.y][enemy.x].hasEnemy = true;
                                         }
                                     });

                                     return {
                                         gameState: { ...state.gameState, enemies: newEnemies, maze: newMaze },
                                         combatState: null,
                                         gameStatus: 'playing'
                                     };
                                 });
                                 get().closeCombat();
                             }, victoryDelay);
                             return;
                        }
                     } else {
                        // MISS / BLOCKED
                        soundManager.playBlock();
                        await audioManager.playEvent('blocked_by_enemy');
                        newLog.push({ message: '攻击被格挡！', type: 'miss', timestamp: Date.now() });
                        set((state) => ({
                            combatState: { ...state.combatState!, animationStatus: 'blocked', combatLog: newLog }
                        }));
                    }
                 } else {
                     // --- ENEMY ATTACKING (Player Defending) ---
                     if (isCorrect) {
                        // BLOCKED (Player success)
                        soundManager.playBlock();
                        audioManager.playEvent('block_success');
                        newLog.push({ message: '防御成功！', type: 'attack', timestamp: Date.now() });
                        set((state) => ({
                            combatState: { ...state.combatState!, animationStatus: 'blocked', combatLog: newLog }
                        }));
                     } else {
                        // HIT (Player fail)
                        soundManager.playDamage();
                        audioManager.playEvent('take_damage');
                        const newPlayerHp = currentCS.playerCharacter.hp - 1;
                        newLog.push({ message: '受到伤害！', type: 'damage', timestamp: Date.now() });
                         
                         set((state) => ({
                             gameState: { 
                                ...state.gameState, 
                                playerTeam: state.gameState.playerTeam.map(c => c.id === currentCS.playerCharacter.id ? { ...c, hp: newPlayerHp } : c)
                             },
                             combatState: { 
                                 ...state.combatState!, 
                                 animationStatus: 'hit',
                                 playerCharacter: { ...state.combatState!.playerCharacter, hp: newPlayerHp },
                                 combatLog: newLog
                             }
                         }));

                         if (newPlayerHp <= 0) {
                             const { gameState } = get();
                             const aliveTeammates = gameState.playerTeam.filter(c => c.hp > 0 && c.id !== currentCS.playerCharacter.id);
                             
                             if (aliveTeammates.length > 0) {
                                 // Auto-switch to next available teammate
                                 const nextChar = aliveTeammates[0];
                                 audioManager.playEvent('player_attack_turn');
                                 
                                 newLog.push({ message: `${currentCS.playerCharacter.name} 倒下了！${nextChar.name} 接替战斗！`, type: 'miss', timestamp: Date.now() });
                                 
                                 set((state) => ({
                                     gameState: { ...state.gameState, activeCharacterId: nextChar.id },
                                     combatState: { 
                                         ...state.combatState!, 
                                         playerCharacter: nextChar,
                                         combatLog: newLog 
                                     }
                                 }));
                                 // Continue...
                             } else {
                                 setTimeout(async () => {
                                     await audioManager.playEvent('game_defeat');
                                     set((state) => ({
                                         gameState: { ...state.gameState, gameStatus: 'defeat' },
                                         combatState: null
                                     }));
                                 }, 1500);
                                 return;
                             }
                         }
                     }
                 }

                 // 4. Return Phase (1.5s later - attacker returns)
                 setTimeout(() => {
                     set((state) => ({
                         combatState: { ...state.combatState!, animationStatus: 'returning' }
                     }));

                     // 5. Next Turn (0.4s later)
                    setTimeout(() => {
                        const { combatState: finalCS } = get();
                        if (!finalCS) return;

                        const nextPhase = finalCS.phase === 'attack' ? 'defense' : 'attack';
                        
                        // Play turn announcement
                        if (nextPhase === 'defense') {
                            audioManager.playEvent('player_defend_turn');
                        }
                        
                        set((state) => ({
                            combatState: { 
                                ...state.combatState!, 
                                phase: nextPhase,
                                animationStatus: 'idle',
                                isInputLocked: false,
                                combatLog: [...state.combatState!.combatLog, { 
                                    message: nextPhase === 'attack' ? '轮到你了！' : `敌人反击！(${finalCS.currentEnemy.counterAttackTime}秒)`, 
                                    type: 'miss', 
                                    timestamp: Date.now() 
                                }]
                            }
                        }));
                        get().rollDiceAndGenerateQuestion();
                    }, 400);

                 }, 1500);

             }, 500); // Wait for attack animation (0.5s)

        }, 1000); // Wait for answer feedback
      },

      closeCombat: () => {
         set((state) => ({
             gameState: { ...state.gameState, gameStatus: 'playing' },
             combatState: null
         }));
      },

      resetGame: () => {
        const { introAudio } = get();
        if (introAudio) {
            introAudio.pause();
            introAudio.currentTime = 0;
        }
        set({ gameState: INITIAL_GAME_STATE, combatState: null, introAudio: null });
      },

      revivePlayer: () => {
        const { gameState } = get();
        
        // Reset player position to start (1, 1)
        // Restore player HP to max
        const newTeam = gameState.playerTeam.map(char => ({
          ...char,
          hp: char.maxHp
        }));

        set((state) => ({
          gameState: {
            ...state.gameState,
            playerPosition: { x: 1, y: 1 },
            playerTeam: newTeam,
            gameStatus: 'playing'
          }
        }));
      },

      setDiceSides: (sides: number) => {
        set({ diceSides: sides });
      },

      setActiveCharacter: (id: string) => {
        const { gameState } = get();
        if (gameState.activeCharacterId === id) return;
        
        // Verify character exists and is alive
        const char = gameState.playerTeam.find(c => c.id === id);
        if (!char || char.hp <= 0) return;

        // Play character intro voice when switching
        audioManager.playAllyIntro(char.type, char.probioticType);
        set((state) => ({
            gameState: { ...state.gameState, activeCharacterId: id }
        }));
      },

      completeAllyCollection: (success: boolean) => {
        const { gameState } = get();
        // If no pending ally, just return to playing
        if (!gameState.pendingAllyPos) {
             set(state => ({ gameState: { ...state.gameState, gameStatus: 'playing' } }));
             return;
        }

        if (success) {
           const { x, y } = gameState.pendingAllyPos;
           const cell = gameState.maze[y][x];
           
           if (cell.hasAlly) {
               soundManager.playCollect();
               
               const newTeam = [...gameState.playerTeam];
               const newMaze = [...gameState.maze.map(row => row.map(c => ({...c})))]; // Deep copy
               
               const allAllies = [...IMMUNE_CELLS, ...PROBIOTICS];
               const allyType = cell.allyType || allAllies[0].type;
               const probioticType = cell.probioticType;

               audioManager.playEvent('collect_ally').then(() => {
                   audioManager.playAllyIntro(allyType, probioticType);
               });

               const allyData = allAllies.find(a => a.type === allyType && a.probioticType === probioticType) || allAllies[0];
               const newAlly = { ...allyData, id: `ally_${Date.now()}` };
               newTeam.push(newAlly);
               
               newMaze[y][x].hasAlly = false;
               
               set(state => ({
                   gameState: {
                       ...state.gameState,
                       playerTeam: newTeam,
                       collectedAllies: state.gameState.collectedAllies + 1,
                       maze: newMaze,
                       gameStatus: 'playing',
                       pendingAllyPos: null,
                       currentChallengeSymbol: undefined
                   }
               }));
           } else {
               set(state => ({ gameState: { ...state.gameState, gameStatus: 'playing', pendingAllyPos: null } }));
           }
        } else {
            // Failed or cancelled
            set(state => ({
                gameState: {
                    ...state.gameState,
                    gameStatus: 'playing',
                    pendingAllyPos: null,
                    currentChallengeSymbol: undefined
                }
            }));
        }
      }
    }),
    { name: 'immune-hero-storage' }
  )
);

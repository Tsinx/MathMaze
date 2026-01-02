import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MazeCell, Position, Character, Enemy } from '../types';
import { clsx } from 'clsx';
import { getCharacterIcon, AllyIcon, ExitIcon } from './GameIcons';

interface MazeProps {
  maze: MazeCell[][];
  playerPosition: Position;
  playerTeam: Character[];
  activeCharacterId?: string;
  enemies: Enemy[];
  theme?: {
    bg: string;
    wall: string;
  };
}

export const Maze: React.FC<MazeProps> = ({ maze, playerPosition, playerTeam, activeCharacterId, enemies, theme }) => {
  if (!maze || maze.length === 0) return null;

  const activeChar = useMemo(() => {
    return playerTeam.find(c => c.id === activeCharacterId) || playerTeam[0];
  }, [playerTeam, activeCharacterId]);

  const rows = maze.length;
  const cols = maze[0].length;

  const [playerRotation, setPlayerRotation] = useState(0);
  const [lastPos, setLastPos] = useState(playerPosition);

  useEffect(() => {
    if (playerPosition.x > lastPos.x) setPlayerRotation(0);
    else if (playerPosition.x < lastPos.x) setPlayerRotation(180);
    else if (playerPosition.y > lastPos.y) setPlayerRotation(90);
    else if (playerPosition.y < lastPos.y) setPlayerRotation(-90);

    setLastPos(playerPosition);
  }, [playerPosition]);

  const wallColor = theme?.wall || '#4B5563';

  return (
    <div 
      className="relative border-4 rounded-lg overflow-hidden shadow-2xl"
      style={{
        maxWidth: '90vw',
        maxHeight: '70vh',
        aspectRatio: `${cols}/${rows}`,
        backgroundColor: 'rgba(255, 255, 255, 0.4)', // 半透明背景，允许透视
        borderColor: wallColor,
        zIndex: 1
      }}
    >
      <div 
        className="grid gap-0 w-full h-full relative"
        style={{
          gridTemplateColumns: `repeat(${cols},1fr)`,
          gridTemplateRows: `repeat(${rows},1fr)`,
        }}
      >
        {maze.map((row, y) => (
          row.map((cell, x) => {
            const isTopEdge = y === 0;
            const isBottomEdge = y === rows - 1;
            const isLeftEdge = x === 0;
            const isRightEdge = x === cols - 1;
            const isEdge = isTopEdge || isBottomEdge || isLeftEdge || isRightEdge;

            return (
              <div
                key={`cell-${x}-${y}`}
                className={clsx(
                  "relative flex items-center justify-center w-full h-full",
                  cell.isExit && "bg-yellow-400"
                )}
                style={{
                  borderTop: isTopEdge && !cell.isExit ? `4px solid ${wallColor}` : undefined,
                  borderBottom: isBottomEdge && !cell.isExit ? `4px solid ${wallColor}` : undefined,
                  borderLeft: isLeftEdge && !cell.isExit ? `4px solid ${wallColor}` : undefined,
                  borderRight: isRightEdge && !cell.isExit ? `4px solid ${wallColor}` : undefined
                }}
              >
              {cell.isExit && (
                <div className="w-[70%] h-[70%] z-0 relative">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <ExitIcon />
                  </motion.div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full animate-ping" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                </div>
              )}

              {cell.hasAlly && (
                <div className="relative w-[80%] h-[80%] z-10">
                  <motion.div 
                    className="w-full h-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    {getCharacterIcon(cell.allyType || 'macrophage', cell.probioticType)}
                  </motion.div>
                  <motion.div
                    className="absolute -top-2 -right-2 text-lg"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  >
                    ❤️
                  </motion.div>
                </div>
              )}

              {x < cols - 1 && !cell.canMoveRight && (
                <div 
                  className="absolute right-0 top-0 bottom-0 w-[6px]"
                  style={{ left: 'auto', right: 0, backgroundColor: wallColor }}
                />
              )}

              {y < rows - 1 && !cell.canMoveDown && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-[6px]"
                  style={{ top: 'auto', bottom: 0, backgroundColor: wallColor }}
                />
              )}
            </div>
            );
          })
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {enemies.map((enemy) => {
            if (enemy.x === undefined || enemy.y === undefined) return null;

            const isBoss = enemy.isBoss;

            return (
              <motion.div
                key={enemy.id}
                className={`absolute flex items-center justify-center ${isBoss ? 'z-20' : 'z-10'}`}
                initial={false}
                animate={{
                  left: `${(enemy.x / cols) * 100}%`,
                  top: `${(enemy.y / rows) * 100}%`,
                }}
                transition={{
                  type: "tween",
                  ease: "easeInOut",
                  duration: 1
                }}
                style={{
                    width: `${100 / cols}%`,
                    height: `${100 / rows}%`,
                }}
              >

                <motion.div
                  className={isBoss ? "w-[100%] h-[100%]" : "w-[90%] h-[90%]"}
                  animate={{ y: isBoss ? [0, -5, 0] : [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: isBoss ? 1.5 : 2 }}
                >
                  {getCharacterIcon(enemy.type, enemy.subtype)}
                </motion.div>
                {isBoss && (
                  <motion.div
                    className="absolute -top-4 text-2xl"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    👑
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        <motion.div
            key="player"
            className="absolute flex items-center justify-center"
            initial={false}
            animate={{
              left: `${(playerPosition.x / cols) * 100}%`,
              top: `${(playerPosition.y / rows) * 100}%`,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 25,
              mass: 0.8
            }}
            style={{
                width: `${100 / cols}%`,
                height: `${100 / rows}%`,
                zIndex: 20
            }}
        >
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-400/50"
              style={{ width: '105%', height: '105%', left: '-2.5%', top: '-2.5%' }}
              animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.8, 0.3, 0.8] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-500/50 border-dashed"
              style={{ width: '110%', height: '110%', left: '-5%', top: '-5%' }}
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-cyan-300/30"
              style={{ width: '115%', height: '115%', left: '-7.5%', top: '-7.5%' }}
              animate={{ scale: [0.7, 1.4, 0.7], opacity: [0.6, 0.1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            />
            <motion.div
              className="w-[90%] h-[90%]"
              animate={{ rotate: playerRotation }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
               {getCharacterIcon(activeChar?.type, activeChar?.probioticType)}
            </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

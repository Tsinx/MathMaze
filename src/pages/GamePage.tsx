import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Maze } from '../components/Maze';
import { CombatSystem } from '../components/CombatSystem';
import { ProteinChallenge } from '../components/ProteinChallenge';
import { useNavigate } from 'react-router-dom';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Heart, Maximize, Minimize } from 'lucide-react';
import { LEVELS } from '../utils/constants';
import { getCharacterIcon } from '../components/GameIcons';
import { getOrganIcon } from '../components/OrganIcons';

export const GamePage: React.FC = () => {
  const { gameState, movePlayer, startNewGame, moveEnemies, isPlayingIntroAudio, setActiveCharacter } = useGameStore();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

  const currentLevelData = LEVELS.find(l => l.organId === gameState.currentOrgan && l.difficulty === gameState.difficulty) || LEVELS[0];

  useEffect(() => {
    // Start game if empty (e.g. refresh)
    if (gameState.maze.length === 0) {
      startNewGame('lung'); // Default to lung for now
    }
  }, [gameState.maze.length, startNewGame]);

  // Enemy Movement Loop
  useEffect(() => {
    if (gameState.gameStatus !== 'playing') return;

    const interval = setInterval(() => {
      moveEnemies();
    }, 3000); // Move every 3 seconds

    return () => clearInterval(interval);
  }, [gameState.gameStatus, moveEnemies]);

  useEffect(() => {
    if (gameState.gameStatus === 'victory') {
      navigate('/victory');
    } else if (gameState.gameStatus === 'defeat') {
      navigate('/defeat');
    }
  }, [gameState.gameStatus, navigate]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error('全屏失败:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((err) => {
        console.error('退出全屏失败:', err);
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.gameStatus !== 'playing' || isPlayingIntroAudio) return;

      switch (e.key) {
        case 'ArrowUp': movePlayer(0, -1); break;
        case 'ArrowDown': movePlayer(0, 1); break;
        case 'ArrowLeft': movePlayer(-1, 0); break;
        case 'ArrowRight': movePlayer(1, 0); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.gameStatus, movePlayer, isPlayingIntroAudio]);

  // Prevent context menu on game page (mobile long-press)
  useEffect(() => {
    const preventContextMenu = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', preventContextMenu);
    return () => document.removeEventListener('contextmenu', preventContextMenu);
  }, []);

  if (gameState.maze.length === 0) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col overflow-hidden relative">
      {/* Alert Flash Effect when playing intro audio */}
      {isPlayingIntroAudio && (
        <div className="absolute inset-0 bg-red-900/60 animate-pulse pointer-events-none z-50"></div>
      )}
      {/* Header / Stats */}
      <header className="p-4 bg-slate-800 shadow-md flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-2 rounded-lg">
            <span className="font-bold text-xl">第 {gameState.currentLevel} 关</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦠</span>
            <span className="text-gray-300 text-sm">剩余敌人: {gameState.enemies.length}</span>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          {gameState.playerTeam.map((char) => (
             <div 
               key={char.id} 
               onClick={() => setActiveCharacter(char.id)}
               className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all cursor-pointer ${
                 char.id === gameState.activeCharacterId 
                   ? 'bg-blue-900/80 border-blue-400 ring-2 ring-blue-500 shadow-lg scale-105' 
                   : 'bg-slate-700 border-slate-600 hover:bg-slate-600'
               }`}
             >
               <div className="w-8 h-8">
                 {getCharacterIcon(char.type, char.probioticType)}
               </div>
               <div className="flex flex-col text-xs">
                 <span className={`font-bold ${char.id === gameState.activeCharacterId ? 'text-blue-200' : 'text-blue-300'}`}>{char.name}</span>
                 <div className="flex items-center gap-1 text-green-400"><Heart size={10} />{char.hp}</div>
               </div>
             </div>
          ))}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 border border-slate-600 transition-all active:scale-95"
            title={isFullscreen ? '退出全屏' : '全屏'}
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex items-start justify-center pt-[50px] px-4 relative" style={{ backgroundColor: currentLevelData.color }}>
        {/* Organ Background - 半透明背景 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="w-full h-full max-w-[90vw] max-h-[70vh] relative p-8">
            {getOrganIcon(currentLevelData.organId)}
          </div>
        </div>

        <Maze 
          maze={gameState.maze} 
          playerPosition={gameState.playerPosition} 
          playerTeam={gameState.playerTeam}
          activeCharacterId={gameState.activeCharacterId}
          enemies={gameState.enemies}
          theme={{
            bg: 'transparent', // 这里设为透明，实际由 Maze 组件内的半透明层控制
            wall: currentLevelData.wallColor || '#94a3b8'
          }}
        />
        
        {/* On-screen Controls (Mobile/Tablet) */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 grid grid-cols-3 gap-2 opacity-80 md:opacity-50 hover:opacity-100 transition-opacity select-none touch-none" style={{ touchAction: 'none' }}>
           <div />
           <button 
             className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg active:bg-blue-600 active:scale-95 transition-transform select-none touch-none"
             style={{ touchAction: 'none', WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
             onContextMenu={(e) => e.preventDefault()}
             onClick={() => movePlayer(0, -1)}
           >
             <ArrowUp size={32} color="white" />
           </button>
           <div />
           
           <button 
             className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg active:bg-blue-600 active:scale-95 transition-transform select-none touch-none"
             style={{ touchAction: 'none', WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
             onContextMenu={(e) => e.preventDefault()}
             onClick={() => movePlayer(-1, 0)}
           >
             <ArrowLeft size={32} color="white" />
           </button>
           <button 
             className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg active:bg-blue-600 active:scale-95 transition-transform select-none touch-none"
             style={{ touchAction: 'none', WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
             onContextMenu={(e) => e.preventDefault()}
             onClick={() => movePlayer(0, 1)}
           >
             <ArrowDown size={32} color="white" />
           </button>
           <button 
             className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg active:bg-blue-600 active:scale-95 transition-transform select-none touch-none"
             style={{ touchAction: 'none', WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
             onContextMenu={(e) => e.preventDefault()}
             onClick={() => movePlayer(1, 0)}
           >
             <ArrowRight size={32} color="white" />
           </button>
        </div>
      </main>

      {/* Combat Overlay */}
      <CombatSystem />

      {/* Protein Challenge Overlay */}
      <ProteinChallenge />
    </div>
  );
};

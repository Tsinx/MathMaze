import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { useAuthStore } from '../store/authStore';
import { LEVELS } from '../utils/constants';
import { motion } from 'framer-motion';
import { audioManager } from '../utils/AudioManager';
import { getOrganIcon } from '../components/OrganIcons';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { startNewGame, diceSides, setDiceSides } = useGameStore();
  const { currentUser, isAuthenticated } = useAuthStore();

  const handleStart = (levelId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const level = LEVELS.find(l => l.id === levelId);
    if (level) {
      // Auto enter fullscreen
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.warn('Auto fullscreen failed:', err);
        });
      }

      startNewGame(level.organId, level.difficulty);
      navigate('/game');
    }
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  // Play game start audio on first mount
  useEffect(() => {
    audioManager.playEvent('game_start');
  }, []);

  // Prevent context menu (mobile long-press) for better child experience
  useEffect(() => {
    const preventContextMenu = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', preventContextMenu);
    return () => document.removeEventListener('contextmenu', preventContextMenu);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 flex flex-col items-center justify-center p-8 text-white">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-4 right-4 z-50"
      >
        <motion.button
          onClick={handleProfileClick}
          className="bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-white/30 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAuthenticated ? (
            <>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold">
                {currentUser?.displayName.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium">{currentUser?.displayName}</span>
            </>
          ) : (
            <>
              <span>👤</span>
              <span className="font-medium">登录</span>
            </>
          )}
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h1 className="text-6xl font-black mb-4 drop-shadow-lg">
          🦠 免疫英雄 🛡️
        </h1>
        <h2 className="text-4xl font-bold text-yellow-300 drop-shadow-md">
          数学迷宫大冒险
        </h2>
        <p className="mt-6 text-xl max-w-2xl mx-auto opacity-90">
          化身勇敢的免疫细胞，深入人体器官，运用数学知识击败病菌，守护身体健康！
        </p>
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 bg-yellow-400/20 border border-yellow-400/50 rounded-xl px-4 py-2 inline-block"
          >
            💡 登录账号以保存游戏进度和成就
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-6 mb-8 w-full max-w-md"
      >
        <h3 className="text-2xl font-bold mb-4 text-center">🎲 骰子面数设置</h3>
        <p className="text-sm mb-4 text-center opacity-80">根据孩子的算术水平选择合适的骰子面数</p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setDiceSides(Math.max(1, diceSides - 1))}
            className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl text-2xl font-bold transition-all active:scale-95"
          >
            -
          </button>
          <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-4xl font-black text-indigo-600">{diceSides}</span>
          </div>
          <button
            onClick={() => setDiceSides(Math.min(19, diceSides + 1))}
            className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl text-2xl font-bold transition-all active:scale-95"
          >
            +
          </button>
        </div>
        <p className="text-xs mt-4 text-center opacity-70">范围：1 - 19</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl">
        {LEVELS.map((level, index) => (
          <motion.button
            key={level.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStart(level.id)}
            className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-4 flex flex-col items-center hover:bg-white/20 transition-all shadow-xl"
            style={{ backgroundColor: `${level.color}30` }}
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-inner overflow-hidden p-2 relative"
              style={{ backgroundColor: level.color }}
            >
              {getOrganIcon(level.organId) || <span className="text-3xl">{level.emoji}</span>}
            </div>
            <h3 className="text-lg font-bold mb-1">{level.name}</h3>
            <span className={`
              text-xs font-bold px-2 py-1 rounded-full
              ${level.difficulty === 1 ? 'bg-green-400 text-green-900' : ''}
              ${level.difficulty === 2 ? 'bg-yellow-400 text-yellow-900' : ''}
              ${level.difficulty === 3 ? 'bg-orange-400 text-orange-900' : ''}
              ${level.difficulty === 4 ? 'bg-red-400 text-red-900' : ''}
              ${level.difficulty === 5 ? 'bg-purple-500 text-white' : ''}
            `}>
              {level.difficulty === 1 && '⭐ 易'}
              {level.difficulty === 2 && '⭐⭐ 较易'}
              {level.difficulty === 3 && '⭐⭐⭐ 中'}
              {level.difficulty === 4 && '⭐⭐⭐⭐ 难'}
              {level.difficulty === 5 && '⭐⭐⭐⭐⭐ 极难'}
            </span>
          </motion.button>
        ))}
      </div>

      <motion.footer 
        className="mt-16 text-sm opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
      >
        家长指导建议：请协助孩子计算加法，并解释免疫细胞的作用。
      </motion.footer>
    </div>
  );
};

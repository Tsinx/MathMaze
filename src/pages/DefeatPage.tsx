import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export const DefeatPage: React.FC = () => {
  const navigate = useNavigate();
  const { revivePlayer } = useGameStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      revivePlayer();
      navigate('/game');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, revivePlayer]);

  // Prevent context menu (mobile long-press)
  useEffect(() => {
    const preventContextMenu = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', preventContextMenu);
    return () => document.removeEventListener('contextmenu', preventContextMenu);
  }, []);

  return (
    <div className="min-h-screen bg-slate-800 flex flex-col items-center justify-center p-8 text-center overflow-hidden relative">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="bg-white p-12 rounded-3xl shadow-2xl z-10 max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-8xl mb-6"
        >
          💔
        </motion.div>
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-5xl font-black text-red-500 mb-4"
        >
          哎呀！
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl text-gray-600 mb-8"
        >
          不要放弃！马上满血复活，再试一次！
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center items-center gap-4 mb-8"
        >
          <motion.div
            className="w-4 h-4 bg-red-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="text-xl text-gray-500">正在复活...</span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          onClick={() => {
            // Auto enter fullscreen if not already
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(console.warn);
            }
            revivePlayer();
            navigate('/game');
          }}
          className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95"
        >
          立即复活 💪
        </motion.button>
      </motion.div>

      <motion.div
        className="absolute bottom-8 text-white/60 text-sm"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        3秒后自动返回迷宫入口...
      </motion.div>
    </div>
  );
};

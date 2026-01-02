import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { audioManager } from '../utils/AudioManager';

export const VictoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { gameState, resetGame } = useGameStore();

  const handleHome = () => {
    resetGame();
    navigate('/');
  };

  // Play victory audio on mount
  useEffect(() => {
    audioManager.playEvent('game_victory');
  }, []);

  // Prevent context menu (mobile long-press)
  useEffect(() => {
    const preventContextMenu = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', preventContextMenu);
    return () => document.removeEventListener('contextmenu', preventContextMenu);
  }, []);

  return (
    <div className="min-h-screen bg-yellow-400 flex flex-col items-center justify-center p-8 text-center overflow-hidden relative">
      {/* Confetti (Simplified with CSS/divs) */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full"
          style={{
            backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'][Math.floor(Math.random() * 4)],
            top: -20,
            left: `${Math.random() * 100}vw`
          }}
          animate={{
            y: '100vh',
            rotate: 360,
            x: Math.random() * 200 - 100
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="bg-white p-12 rounded-3xl shadow-2xl z-10 max-w-2xl"
      >
        <div className="text-8xl mb-6">🏆</div>
        <h1 className="text-6xl font-black text-orange-500 mb-4">
          闯关成功！
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          太棒了！你成功保护了 <span className="text-blue-500 font-bold">{gameState.currentOrgan}</span>！
        </p>

        <div className="flex justify-center gap-8 mb-12">
           <div className="flex flex-col items-center">
             <span className="text-4xl font-bold text-gray-800">{gameState.collectedAllies}</span>
             <span className="text-gray-500">拯救队友</span>
           </div>
           <div className="flex flex-col items-center">
             <span className="text-4xl font-bold text-gray-800">100%</span>
             <span className="text-gray-500">健康指数</span>
           </div>
        </div>

        <button
          onClick={handleHome}
          className="bg-green-500 hover:bg-green-600 text-white text-2xl font-bold py-4 px-12 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95"
        >
          再次挑战
        </button>
      </motion.div>
    </div>
  );
};

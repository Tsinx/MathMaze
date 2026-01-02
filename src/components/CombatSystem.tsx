import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, TargetAndTransition } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { DiceRoller } from './DiceRoller';
import { MathQuestion } from './MathQuestion';
import { getCharacterIcon } from './GameIcons';
import { audioManager } from '../utils/AudioManager';

const HitEffect = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: [1, 1.5], opacity: [1, 0] }}
    transition={{ duration: 0.3, repeat: 2 }} 
    className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
  >
    <svg viewBox="0 0 100 100" width="150" height="150" style={{ filter: 'drop-shadow(0 0 10px red)' }}>
       {/* Comic book style "POW" star shape */}
       <path d="M50 5 L63 35 L95 35 L70 55 L80 85 L50 65 L20 85 L30 55 L5 35 L37 35 Z" fill="#ffeb3b" stroke="#f44336" strokeWidth="5" />
       <path d="M50 20 L58 40 L80 40 L62 55 L70 75 L50 60 L30 75 L38 55 L20 40 L42 40 Z" fill="#f44336" />
    </svg>
  </motion.div>
);

const VersusScreen: React.FC<{ 
  playerChar: any; 
  enemy: any; 
  onSkip: () => void; 
}> = ({ playerChar, enemy, onSkip }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const onSkipRef = useRef(onSkip);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  // Use originalId if available (for assets), otherwise fallback to id (which might be the instance id)
  const assetId = enemy.originalId || enemy.id;
  const audioPath = `/audio/intro/${assetId}.wav`;

  onSkipRef.current = onSkip;

  useEffect(() => {
    let isCancelled = false;
    const audio = new Audio(audioPath);
    audioRef.current = audio;

    const playAudio = async () => {
      try {
        setAudioError(null);
        setIsPlaying(true);
        await audio.play();
      } catch (err: any) {
        // Ignore AbortError which happens when component unmounts quickly (e.g. strict mode)
        if (err.name === 'AbortError') return;
        
        if (!isCancelled) {
          console.error("Audio playback failed:", err);
          setAudioError(err.message || "播放失败");
          setIsPlaying(false);
        }
      }
    };

    playAudio();

    audio.onended = () => {
      if (!isCancelled) onSkipRef.current();
    };
    
    audio.onerror = (e) => {
      // If cancelled/cleaned up, ignore errors
      if (isCancelled || !audio.src) return;
      
      console.error("Audio load error:", e, audio.error);
      const errorCode = audio.error?.code;
      const errorMsg = audio.error?.message || '未知错误';
      const errorDetail = errorCode === 4 ? '格式不支持或文件未找到' : `Code: ${errorCode}`;
      
      setAudioError(`加载失败: ${errorMsg} (${errorDetail}) Path: ${audioPath}`);
      setIsPlaying(false);
    };

    return () => {
      isCancelled = true;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, [enemy.id]);

  const handleManualPlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
            setIsPlaying(true);
            setAudioError(null);
        })
        .catch(err => {
            setAudioError(err.message);
            setIsPlaying(false);
        });
    }
  };

  return (
    <motion.div
      key="versus"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md text-white overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-red-900/50 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-600/10 -skew-y-6 transform origin-top-left z-0"></div>
      <div className="absolute bottom-0 right-0 w-full h-1/2 bg-red-600/10 -skew-y-6 transform origin-bottom-right z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-8 md:gap-16 p-8">
        
        {/* Player Side */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 relative filter drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            {getCharacterIcon(playerChar.type, playerChar.probioticType)}
          </div>
          <h2 className="text-3xl font-bold mt-4 text-blue-400">{playerChar.name}</h2>
          <div className="mt-2 px-4 py-1 bg-blue-900/50 rounded-full border border-blue-500/30">
            HP: {playerChar.hp}/{playerChar.maxHp}
          </div>
        </motion.div>

        {/* VS Badge */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.5, bounce: 0.5 }}
          className="relative z-20"
        >
          <div className="text-8xl md:text-9xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
            VS
          </div>
        </motion.div>

        {/* Enemy Side */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 relative filter drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]">
            {getCharacterIcon(enemy.type, enemy.subtype)}
          </div>
          <h2 className="text-3xl font-bold mt-4 text-red-400">{enemy.name}</h2>
          <div className="mt-2 px-4 py-1 bg-red-900/50 rounded-full border border-red-500/30">
            危险等级: {enemy.dangerLevel}
          </div>
        </motion.div>

      </div>

      {/* Intro Text Box */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 mt-8 max-w-3xl w-full px-8"
      >
        <div className="bg-black/60 border border-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 text-center shadow-2xl">
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium italic">
            "{enemy.intro}"
          </p>
          
          <div className="mt-6 flex flex-col items-center justify-center gap-3 text-white/70 text-sm">
            {audioError ? (
               <div className="flex flex-col items-center gap-2 text-red-400">
                 <span>⚠️ 音频播放受阻: {audioError}</span>
                 <button 
                   onClick={handleManualPlay}
                   className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm font-bold border border-white/30"
                 >
                   ▶️ 点击手动播放
                 </button>
               </div>
            ) : (
               <div className="flex items-center gap-2">
                 {isPlaying ? (
                    <>
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                      <span>正在播放语音介绍...</span>
                    </>
                 ) : (
                    <button 
                       onClick={handleManualPlay}
                       className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-full text-blue-200 text-sm font-bold border border-blue-500/30"
                    >
                       🔊 播放语音
                    </button>
                 )}
               </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={onSkip}
        className="relative z-10 mt-8 px-10 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
      >
        跳过介绍 ⏭️
      </motion.button>

    </motion.div>
  );
};

export const CombatSystem: React.FC = () => {
  const { combatState, answerQuestion, handleCombatTimeout, skipIntro } = useGameStore();
  const [isRolling, setIsRolling] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [prevQuestion, setPrevQuestion] = useState<{ operand1: number; operand2: number } | null>(null);

  // Calculate dynamic time limit based on enemy properties
  const timeLimit = (combatState?.phase === 'defense' && combatState?.currentEnemy?.counterAttackTime) ? combatState.currentEnemy.counterAttackTime : 10;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleDiceRollComplete = async () => {
    if (combatState?.question && combatState.question.operand1 > 0) {
      await audioManager.playQuestion(combatState.question.operand1, combatState.question.operand2);
    }
  };

  useEffect(() => {
    const currentQuestion = combatState?.question;
    const isNewQuestion = currentQuestion && 
      (prevQuestion === null || 
       currentQuestion.operand1 !== prevQuestion.operand1 || 
       currentQuestion.operand2 !== prevQuestion.operand2);

    if (combatState?.isActive && isNewQuestion) {
      // New round or phase change with new question
      setIsRolling(true);
      setShowQuestion(false);
      setTimeLeft(10); // Reset timer

      const rollTimer = setTimeout(() => {
        setIsRolling(false);
        setShowQuestion(true);
      }, 1500); // Roll for 1.5s

      return () => clearTimeout(rollTimer);
    }

    if (currentQuestion) {
      setPrevQuestion({ operand1: currentQuestion.operand1, operand2: currentQuestion.operand2 });
    }
  }, [combatState?.question, combatState?.isActive]);

  // Defense Timer Logic
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (showQuestion && combatState?.phase === 'defense' && !combatState.selectedAnswer) {
      setTimeLeft(timeLimit);
      timerId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerId) clearInterval(timerId);
            // Use setTimeout to defer the state update out of the render cycle
            setTimeout(() => {
                handleCombatTimeout();
            }, 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } 

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [showQuestion, combatState?.phase, combatState?.selectedAnswer, handleCombatTimeout, timeLimit]);

  if (!combatState || !combatState.isActive) return null;

  const { playerCharacter, currentEnemy, diceRoll1, diceRoll2, question, combatLog, phase, animationStatus, isInputLocked, isPlayingIntro } = combatState;
  const isDefense = phase === 'defense';
  const isLowHp = currentEnemy.hp <= currentEnemy.maxHp / 2;

  // Animation Logic
  let playerVariant: TargetAndTransition = { x: 0, scale: 1, filter: 'brightness(1)', rotate: 0 };
  let enemyVariant: TargetAndTransition = { x: 0, scale: 1, filter: 'brightness(1)', rotate: 0 };

  // Determine animations based on Phase + Status
  if (!isDefense) {
      // --- PLAYER PHASE (We Attack) ---
      if (animationStatus === 'attacking') {
          playerVariant = { x: 150, scale: 1.5, filter: 'brightness(1)', rotate: 0 };
      } 
      else if (animationStatus === 'hit') {
          // Player stays forward, Enemy gets hit
          playerVariant = { x: 150, scale: 1.5, filter: 'brightness(1)', rotate: 0 };
          enemyVariant = { 
            x: [0, 10, -10, 10, 0], 
            scale: 0.9, 
            filter: 'brightness(2) sepia(1) hue-rotate(-50deg)', 
            rotate: [0, 5, -5, 0],
            transition: { duration: 0.5 } 
          };
      } 
      else if (animationStatus === 'blocked') {
          // Player stays forward (or bounces back slightly), Enemy blocks
          playerVariant = { x: 100, scale: 1.2, filter: 'brightness(1)', rotate: 0 };
          enemyVariant = { x: 0, scale: 1.1, filter: 'brightness(1.2)', rotate: 0 };
      }
      else if (animationStatus === 'returning') {
          // Both reset
          playerVariant = { x: 0, scale: 1, filter: 'brightness(1)', rotate: 0 };
          enemyVariant = { x: 0, scale: 1, filter: 'brightness(1)', rotate: 0 };
      }
  } else {
      // --- ENEMY PHASE (They Attack) ---
      if (animationStatus === 'attacking') {
          enemyVariant = { x: -150, scale: 1.5, filter: 'brightness(1)', rotate: 0 };
      } 
      else if (animationStatus === 'hit') {
          // Enemy stays forward, Player gets hit
          enemyVariant = { x: -150, scale: 1.5, filter: 'brightness(1)', rotate: 0 };
          playerVariant = { 
            x: [0, 10, -10, 10, 0], 
            scale: 0.9, 
            filter: 'brightness(2) sepia(1) hue-rotate(-50deg)', 
            rotate: [0, 5, -5, 0],
            transition: { duration: 0.5 }
          };
      } 
      else if (animationStatus === 'blocked') {
          // Enemy stays forward (or bounces back slightly), Player blocks
          enemyVariant = { x: -100, scale: 1.2, filter: 'brightness(1)', rotate: 0 };
          playerVariant = { x: 0, scale: 1.1, filter: 'brightness(1.2)', rotate: 0 };
      }
      else if (animationStatus === 'returning') {
          // Both reset
          playerVariant = { x: 0, scale: 1, filter: 'brightness(1)', rotate: 0 };
          enemyVariant = { x: 0, scale: 1, filter: 'brightness(1)', rotate: 0 };
      }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <AnimatePresence>
        {isPlayingIntro ? (
          <VersusScreen 
            playerChar={playerCharacter}
            enemy={currentEnemy}
            onSkip={skipIntro}
          />
        ) : (
          <motion.div
            key="combat"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-4xl h-[90vh] bg-white rounded-3xl overflow-hidden flex flex-col shadow-2xl"
          >
        {/* Header */}
        <div className={`p-4 text-center text-2xl font-bold shadow-md relative overflow-hidden transition-colors duration-500 ${isDefense ? 'bg-orange-500' : 'bg-red-500'} text-white`}>
          <div className={`absolute inset-0 opacity-50 skew-x-12 transform scale-110 ${isDefense ? 'bg-orange-600' : 'bg-red-600'}`}></div>
          <span className="relative z-10">
            {isDefense ? `🛡️ 敌人反击！限时防御！ (${timeLeft}s)` : '⚔️ 遭遇敌人！战斗开始！'}
          </span>
        </div>

        {/* Timer Bar for Defense */}
        {isDefense && showQuestion && (
          <div className="w-full h-2 bg-gray-200">
            <motion.div 
              className="h-full bg-orange-500"
              initial={{ width: '100%' }}
              animate={{ width: `${(timeLeft / 10) * 100}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </div>
        )}

        {/* Battle Arena */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-around p-8 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
          
          {/* Player */}
          <div className="flex flex-col items-center gap-4 z-20">
            <motion.div 
              className="w-32 h-32 relative"
              animate={playerVariant}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {getCharacterIcon(playerCharacter.type, playerCharacter.probioticType)}
              {animationStatus === 'hit' && isDefense && <HitEffect />}
              {animationStatus === 'blocked' && isDefense && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center text-6xl"
                  >
                    🛡️
                  </motion.div>
              )}
              <div className="absolute -bottom-4 w-full h-4 bg-black/10 rounded-full blur-md"></div>
            </motion.div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800">{playerCharacter.name}</h3>
              <div className="flex gap-2 mt-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-bold">HP: {playerCharacter.hp}/{playerCharacter.maxHp}</span>
              </div>
            </div>
          </div>

          {/* VS & Dice */}
          <div className="flex flex-col items-center gap-8 z-10">
            <div className="text-6xl font-black text-gray-200 italic">VS</div>
            <div className="relative">
              <DiceRoller 
                value1={diceRoll1} 
                value2={diceRoll2} 
                isRolling={isRolling} 
                faces={combatState?.diceFaces || 6} 
                onRollComplete={handleDiceRollComplete}
              />
              {!isRolling && combatState.selectedAnswer !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -right-12 top-0 bg-yellow-400 text-yellow-900 font-bold px-2 py-1 rounded-lg shadow transform rotate-12"
                >
                  = {diceRoll1 + diceRoll2}
                </motion.div>
              )}
            </div>
          </div>

          {/* Enemy */}
          <div className="flex flex-col items-center gap-4 z-20">
            <motion.div 
              className="w-32 h-32 relative"
              animate={enemyVariant}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {getCharacterIcon(currentEnemy.type, currentEnemy.subtype, { isLowHp })}
              {animationStatus === 'hit' && !isDefense && <HitEffect />}
              {animationStatus === 'blocked' && !isDefense && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center text-6xl"
                  >
                    🛡️
                  </motion.div>
              )}
              <div className="absolute -bottom-4 w-full h-4 bg-black/10 rounded-full blur-md"></div>
            </motion.div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800">{currentEnemy.name}</h3>
              <div className="flex gap-2 mt-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-bold">HP: {currentEnemy.hp}/{currentEnemy.maxHp}</span>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-bold">LV: {currentEnemy.dangerLevel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interaction Area */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 min-h-[300px]">
          <AnimatePresence mode='wait'>
            {showQuestion ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <MathQuestion 
                  question={question} 
                  title={isDefense ? "算一算防御值 (10秒!)" : "算一算攻击力"}
                  onAnswer={(ans) => {
                    if (!isInputLocked) answerQuestion(ans);
                  }} 
                  disabled={isInputLocked || combatState.selectedAnswer !== null}
                  selectedAnswer={combatState.selectedAnswer}
                  correctAnswer={question.correctAnswer}
                />
              </motion.div>
            ) : (
              <motion.div
                key="rolling"
                className="flex items-center justify-center h-full text-2xl text-gray-500 font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {isDefense ? '敌人正在掷骰子...' : '正在掷骰子...'}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Combat Log (Latest message) */}
          <div className="mt-4 text-center h-8">
             {combatLog.length > 0 && (
               <span className="text-lg font-bold text-indigo-600 animate-pulse">
                 {combatLog[combatLog.length - 1].message}
               </span>
             )}
          </div>
        </div>
      </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

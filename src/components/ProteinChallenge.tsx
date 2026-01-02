import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import { STROKE_TEMPLATES } from '../data/strokeTemplates';
import { getScore, Point, resample, translateToOrigin, scaleToSquare } from '../utils/strokeRecognition';
import { audioManager } from '../utils/AudioManager';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, Check, Star } from 'lucide-react';

export const ProteinChallenge: React.FC = () => {
  const { gameState, completeAllyCollection } = useGameStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [stars, setStars] = useState(0);

  const template = STROKE_TEMPLATES.find(t => t.name === gameState.currentChallengeSymbol);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasPlayedIntro = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 20; // Increased line width for easier drawing
    }

    // Draw template hint
    drawTemplateHint();
  }, [template]);

  useEffect(() => {
    if (!hasPlayedIntro.current && gameState.currentChallengeSymbol) {
      hasPlayedIntro.current = true;

      const playIntroAudio = async () => {
        await audioManager.playEvent('writing_challenge_start');
        await new Promise(resolve => setTimeout(resolve, 300));
        await audioManager.playWritingLetter(gameState.currentChallengeSymbol!);
      };

      playIntroAudio();
    }
  }, [gameState.currentChallengeSymbol]);

  const drawTemplateHint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !template) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear background
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Note: width/height are scaled
    
    // Reset transform for clearing, then re-apply scale is tricky.
    // Simpler: Just rely on rect size for logical coords
    const rect = canvas.getBoundingClientRect();

    // Draw grid/box
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(20, 20, rect.width - 40, rect.height - 40);
    ctx.setLineDash([]);

    // Draw Template Guide (interpolated)
    // We need to map template points (0-100) to canvas size
    if (template.points.length > 1) {
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
        ctx.lineWidth = 25; // Thicker template guide
        ctx.beginPath();
        
        const scaleX = (rect.width - 80) / 100;
        const scaleY = (rect.height - 80) / 100;
        const offsetX = 40;
        const offsetY = 40;

        template.points.forEach((p, i) => {
            const x = p.x * scaleX + offsetX;
            const y = p.y * scaleY + offsetY;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Draw start point indicator
        const startP = template.points[0];
        const startX = startP.x * scaleX + offsetX;
        const startY = startP.y * scaleY + offsetY;
        
        ctx.fillStyle = '#4ade80'; // Green start
        ctx.beginPath();
        ctx.arc(startX, startY, 10, 0, Math.PI * 2);
        ctx.fill();
    }
  }, [template]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 20;
    }

    drawTemplateHint();
  }, [template, drawTemplateHint]);

  // Redraw user stroke
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // We shouldn't clear the whole canvas because we want to keep the hint
    // But standard approach is clear and redraw everything
    // Let's just redraw hint then user path
    
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Clear
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    // Draw Hint
    drawTemplateHint();

    // Draw User Path
    if (points.length > 1) {
        ctx.strokeStyle = '#3b82f6'; // Blue
        ctx.lineWidth = 20; // Match the new width
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
    }
  }, [points, drawTemplateHint]);

  const getCanvasPoint = (e: React.MouseEvent | React.TouchEvent): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = (e as React.MouseEvent).clientX;
        clientY = (e as React.MouseEvent).clientY;
    }
    
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling on touch
    
    // If there's a pending judge timer, cancel it (user is continuing to write)
    if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
    }

    setIsDrawing(true);
    setPoints(prev => [...prev, getCanvasPoint(e)]);
    // Only clear feedback when starting a fresh stroke, keep points for multi-stroke
    if (feedback === '再试一次' || feedback === '太短了') {
         setFeedback('');
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const newPoint = getCanvasPoint(e);
    setPoints(prev => [...prev, newPoint]);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    // Wait 1.5s after lifting finger. 
    // If user writes again within this time, timer is cancelled (multi-stroke support).
    // If time runs out, we judge the result.
    timerRef.current = setTimeout(() => {
        judgeDrawing();
    }, 1500);
  };

  const judgeDrawing = () => {
    // Basic length check
    if (points.length < 10) {
        setFeedback('太短了');
        setTimeout(() => {
             setFeedback('');
             setPoints([]);
        }, 500);
        return;
    }

    if (!template) return;

    const denseTemplate = generateDensePath(template.points, 64);
    const calculatedScore = getScore(points, denseTemplate);
    setScore(calculatedScore);

    if (calculatedScore > 0.3) {
        // Success Logic
        if (calculatedScore > 0.7) {
            setStars(3);
            setFeedback('完美！(3星)');
        } else if (calculatedScore > 0.5) {
            setStars(2);
            setFeedback('不错！(2星)');
        } else {
            setStars(1);
            setFeedback('通过！(1星)');
        }

        // Play feedback audio
        const starCount = calculatedScore > 0.7 ? 3 : calculatedScore > 0.5 ? 2 : 1;
        audioManager.playWritingFeedback(starCount);

        // Play ally collected audio after feedback
        setTimeout(() => {
            audioManager.playEvent('writing_ally_collected');
        }, 1200);

        setTimeout(() => completeAllyCollection(true), 1500);
    } else {
        // Failure Logic
        setStars(0);
        setFeedback('再试一次');

        // Play failure feedback audio
        audioManager.playWritingFeedback(0);

        // Auto clear after 1s so kid can try again
        setTimeout(() => {
            setPoints([]);
            setFeedback('');
            setScore(null);
        }, 1000);
    }
  };

  const generateDensePath = (keypoints: Point[], count: number): Point[] => {
      // Create a path from keypoints then resample it
      return resample(keypoints, count);
  };

  const clearCanvas = () => {
      setPoints([]);
      setScore(null);
      setFeedback('');
      setStars(0);
  };

  if (gameState.gameStatus !== 'challenge') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative overflow-hidden"
      >
        {/* Header */}
        <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-blue-600 mb-1">蛋白质识别挑战</h2>
            <p className="text-gray-600">
                请在方框内画出 <span className="font-bold text-4xl text-orange-500 mx-2">{template?.name}</span> 来激活队友！
            </p>
        </div>

        {/* Canvas Container */}
        <div className="relative aspect-square w-full bg-slate-50 rounded-2xl border-4 border-blue-100 touch-none select-none">
            <canvas
                ref={canvasRef}
                className="w-full h-full touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
            />
            
            {/* Feedback Overlay */}
            <AnimatePresence>
                {score !== null && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center bg-white/10"
                    >
                        <div className="flex gap-2 mb-2">
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: i < stars ? 1.5 : 1 }}
                                    className={`text-4xl ${i < stars ? 'text-yellow-400' : 'text-gray-300'}`}
                                >
                                    <Star fill={i < stars ? "currentColor" : "none"} />
                                </motion.div>
                            ))}
                        </div>
                        <div className={`text-3xl font-bold px-6 py-2 rounded-full bg-white shadow-lg ${stars > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {feedback}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-between mt-6">
            <button 
                onClick={() => completeAllyCollection(false)}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
                aria-label="Cancel"
            >
                <X size={24} />
            </button>
            
            <button 
                onClick={clearCanvas}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 font-bold transition-colors"
            >
                <RefreshCw size={20} />
                重写
            </button>
        </div>
      </motion.div>
    </div>
  );
};

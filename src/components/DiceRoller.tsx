import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface DiceRollerProps {
  value1: number;
  value2: number;
  isRolling: boolean;
  faces: number;
  onRollComplete?: () => void;
}

export const DiceRoller: React.FC<DiceRollerProps> = ({ value1, value2, isRolling, faces, onRollComplete }) => {
  const [randomValue1, setRandomValue1] = useState(1);
  const [randomValue2, setRandomValue2] = useState(1);
  const prevIsRollingRef = useRef(false);
  const hasPlayedQuestionRef = useRef(false);

  // Reset hasPlayedQuestion when rolling starts
  useEffect(() => {
    if (isRolling) {
      hasPlayedQuestionRef.current = false;
    }
  }, [isRolling]);

  // When not rolling, immediately update random values to prop values to ensure sync
  useEffect(() => {
    if (!isRolling && prevIsRollingRef.current) {
      setRandomValue1(value1);
      setRandomValue2(value2);
      if (onRollComplete && !hasPlayedQuestionRef.current) {
        hasPlayedQuestionRef.current = true;
        onRollComplete();
      }
    }
    prevIsRollingRef.current = isRolling;
  }, [isRolling, value1, value2, onRollComplete]);

  useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        setRandomValue1(Math.floor(Math.random() * faces) + 1);
        setRandomValue2(Math.floor(Math.random() * faces) + 1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isRolling, faces]);

  const displayValue1 = isRolling ? randomValue1 : value1;
  const displayValue2 = isRolling ? randomValue2 : value2;

  // Generate dots using simple SVG circles for better scaling and arbitrary numbers
  const renderDiceFace = (val: number) => {
    // Determine grid size based on value
    // For small numbers (<=9), we can use a 3x3 grid look
    // For larger numbers, we might need 4x4 or 5x5
    // But to keep it uniform, let's use SVG coordinates (0-100)
    
    // Predefined coordinates for common dice faces (standard D6 + extras)
    const getCoords = (n: number): {cx: number, cy: number}[] => {
      const c = 50;
      const l = 25;
      const r = 75;
      const t = 25;
      const b = 75;
      
      switch(n) {
        case 1: return [{cx: c, cy: c}];
        case 2: return [{cx: l, cy: t}, {cx: r, cy: b}];
        case 3: return [{cx: l, cy: t}, {cx: c, cy: c}, {cx: r, cy: b}];
        case 4: return [{cx: l, cy: t}, {cx: r, cy: t}, {cx: l, cy: b}, {cx: r, cy: b}];
        case 5: return [{cx: l, cy: t}, {cx: r, cy: t}, {cx: c, cy: c}, {cx: l, cy: b}, {cx: r, cy: b}];
        case 6: return [{cx: l, cy: t}, {cx: r, cy: t}, {cx: l, cy: c}, {cx: r, cy: c}, {cx: l, cy: b}, {cx: r, cy: b}];
        case 7: return [{cx: l, cy: t}, {cx: r, cy: t}, {cx: l, cy: c}, {cx: c, cy: c}, {cx: r, cy: c}, {cx: l, cy: b}, {cx: r, cy: b}];
        case 8: return [{cx: l, cy: t}, {cx: c, cy: t}, {cx: r, cy: t}, {cx: l, cy: c}, {cx: r, cy: c}, {cx: l, cy: b}, {cx: c, cy: b}, {cx: r, cy: b}];
        case 9: return [{cx: l, cy: t}, {cx: c, cy: t}, {cx: r, cy: t}, {cx: l, cy: c}, {cx: c, cy: c}, {cx: r, cy: c}, {cx: l, cy: b}, {cx: c, cy: b}, {cx: r, cy: b}];
        default: 
          // For n > 9, generate a grid or circle pattern
          // Simple grid generator
          const points: {cx: number, cy: number}[] = [];
          const gridSize = Math.ceil(Math.sqrt(n));
          const step = 80 / (gridSize + 1); // Spread within 10-90 margin
          
          for (let i = 0; i < n; i++) {
             // Spiral or grid fill? Grid fill is easier.
             // Let's do a centered grid fill.
             // But actually, for 19, just showing the NUMBER might be better UX?
             // User asked for "faces". Let's try to fit dots.
             // A 5x5 grid fits 25.
             const row = Math.floor(i / 5);
             const col = i % 5;
             points.push({
               cx: 20 + col * 15,
               cy: 20 + row * 15
             });
          }
          return points;
      }
    };

    const coords = getCoords(val);
    
    // For large numbers (>9), dots might be too small/crowded. 
    // Let's add the number as text overlay for clarity if val > 6.
    const showNumber = val > 6;

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {coords.map((p, i) => (
          <circle 
            key={i} 
            cx={p.cx} 
            cy={p.cy} 
            r={val > 9 ? 6 : 10} 
            fill="black" 
            opacity={showNumber ? 0.3 : 1} 
          />
        ))}
        {showNumber && (
          <text 
            x="50" 
            y="55" 
            textAnchor="middle" 
            dominantBaseline="middle" 
            fontSize="50" 
            fontWeight="bold" 
            fill="black"
            className="drop-shadow-md"
          >
            {val}
          </text>
        )}
      </svg>
    );
  };

  return (
    <div className="flex gap-4 items-center">
      {/* Dice 1 */}
      <motion.div
        className="w-20 h-20 bg-white rounded-xl shadow-lg border-2 border-gray-300 flex items-center justify-center overflow-hidden p-1"
        animate={isRolling ? { rotate: 360, scale: [1, 1.1, 1] } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.5, repeat: isRolling ? Infinity : 0 }}
      >
        {renderDiceFace(displayValue1)}
      </motion.div>
      
      {/* Plus sign */}
      <div className="text-4xl font-black text-gray-500">+</div>

      {/* Dice 2 */}
      <motion.div
        className="w-20 h-20 bg-white rounded-xl shadow-lg border-2 border-gray-300 flex items-center justify-center overflow-hidden p-1"
        animate={isRolling ? { rotate: 360, scale: [1, 1.1, 1] } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.5, repeat: isRolling ? Infinity : 0 }}
      >
        {renderDiceFace(displayValue2)}
      </motion.div>
    </div>
  );
};

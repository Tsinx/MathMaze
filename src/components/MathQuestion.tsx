import React from 'react';
import { MathQuestion as IMathQuestion } from '../types';

interface MathQuestionProps {
  question: IMathQuestion;
  onAnswer: (answer: number) => void;
  disabled: boolean;
  title?: string;
  selectedAnswer: number | null;
  correctAnswer: number;
}

export const MathQuestion: React.FC<MathQuestionProps> = ({ 
  question, 
  onAnswer, 
  disabled, 
  title = "算一算",
  selectedAnswer,
  correctAnswer
}) => {
  const { operand1, operand2, options } = question;

  const renderDots = (count: number, color: string) => (
    <div className="flex flex-wrap gap-1 justify-center max-w-[200px]">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`w-9 h-9 rounded-full ${color}`} />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-6 p-4 bg-white/90 rounded-2xl shadow-xl backdrop-blur-sm">
      <h3 className="text-xl font-bold text-gray-700">{title}</h3>
      
      <div className="flex items-center gap-4 text-4xl font-black text-gray-800">
        <div className="flex flex-col items-center">
          <span className="text-blue-500">{operand1}</span>
          {renderDots(operand1, 'bg-blue-400')}
        </div>
        <span className="text-2xl">+</span>
        <div className="flex flex-col items-center">
          <span className="text-orange-500">{operand2}</span>
          {renderDots(operand2, 'bg-orange-400')}
        </div>
        <span className="text-2xl">=</span>
        <div className="w-12 h-12 border-b-4 border-gray-300 flex items-center justify-center text-gray-400">?</div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {options.map((option, idx) => {
          let btnClass = "bg-indigo-500 text-white hover:bg-indigo-600 hover:scale-105 active:scale-95";
          
          if (disabled && selectedAnswer !== null) {
             if (option === correctAnswer) {
               btnClass = "bg-green-500 text-white";
             } else if (option === selectedAnswer) {
               btnClass = "bg-red-500 text-white";
             } else {
               btnClass = "bg-gray-200 text-gray-400";
             }
          } else if (disabled) {
             btnClass = "bg-gray-100 text-gray-400 cursor-not-allowed";
          }

          return (
            <button
              key={idx}
              onClick={() => onAnswer(option)}
              disabled={disabled}
              className={`
                h-16 text-3xl font-bold rounded-xl shadow-md transition-all
                ${btnClass}
              `}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

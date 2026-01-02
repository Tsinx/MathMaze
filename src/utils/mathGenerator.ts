import { MathQuestion } from '../types';

export function generateMathQuestion(diceFaces: number): { question: MathQuestion, diceRoll1: number, diceRoll2: number } {
  const diceRoll1 = Math.floor(Math.random() * diceFaces) + 1;
  const diceRoll2 = Math.floor(Math.random() * diceFaces) + 1;
  const correctAnswer = diceRoll1 + diceRoll2;
  
  // Generate 3 unique wrong options
  const wrongOptions = new Set<number>();
  
  while (wrongOptions.size < 3) {
    // Generate a number close to the correct answer
    const offset = Math.floor(Math.random() * 5) - 2; // -2 to +2
    const candidate = correctAnswer + offset;
    
    if (candidate > 0 && candidate !== correctAnswer) {
      wrongOptions.add(candidate);
    } else {
      // Fallback for edge cases or if 0/negative
      const randomVal = Math.floor(Math.random() * 10) + 1;
      if (randomVal !== correctAnswer) {
        wrongOptions.add(randomVal);
      }
    }
  }

  const options = Array.from(wrongOptions);
  options.push(correctAnswer);
  
  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return {
    question: {
      operand1: diceRoll1,
      operand2: diceRoll2,
      correctAnswer,
      options
    },
    diceRoll1,
    diceRoll2
  };
}

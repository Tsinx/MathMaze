import { Point } from '../utils/strokeRecognition';

export interface StrokeTemplate {
  name: string;
  points: Point[];
  description: string;
}

// Key points for templates. 
// The system will interpolate between these points to create the full path.
// Coordinates are relative (roughly 0-100), but will be normalized anyway.
export const STROKE_TEMPLATES: StrokeTemplate[] = [
  {
    name: "1",
    description: "画一个数字 1",
    points: [
      {x: 50, y: 10}, {x: 50, y: 90}
    ]
  },
  {
    name: "7",
    description: "画一个数字 7",
    points: [
      {x: 10, y: 10}, {x: 90, y: 10}, // Top bar
      {x: 50, y: 90}  // Diagonal down
    ]
  },
   {
    name: "L",
    description: "画一个字母 L",
    points: [
      {x: 20, y: 10}, {x: 20, y: 90}, 
      {x: 80, y: 90}
    ]
  },
  {
      name: "V",
      description: "画一个字母 V",
      points: [
          {x: 10, y: 10}, {x: 50, y: 90}, {x: 90, y: 10}
      ]
  },
  {
    name: "Z",
    description: "画一个字母 Z",
    points: [
      {x: 10, y: 10}, {x: 90, y: 10},
      {x: 10, y: 90}, {x: 90, y: 90}
    ]
  },
  {
    name: "N",
    description: "画一个字母 N",
    points: [
      {x: 20, y: 90}, {x: 20, y: 10}, 
      {x: 80, y: 90}, {x: 80, y: 10}
    ]
  }
];

export function getRandomTemplate(): StrokeTemplate {
    const idx = Math.floor(Math.random() * STROKE_TEMPLATES.length);
    return STROKE_TEMPLATES[idx];
}

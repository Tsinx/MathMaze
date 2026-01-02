import { MazeCell } from '../types';

export type ShortestPaths = Record<string, { dx: number; dy: number }>;

export function calculateShortestPaths(maze: MazeCell[][]): ShortestPaths {
  const rows = maze.length;
  const cols = maze[0].length;
  const numNodes = rows * cols;
  
  // dist[i][j] stores the shortest distance from i to j
  // next[i][j] stores the next node to visit on the shortest path from i to j
  // We use flat indices: index = y * cols + x
  const dist: number[][] = Array(numNodes).fill(0).map(() => Array(numNodes).fill(Infinity));
  const next: (number | null)[][] = Array(numNodes).fill(0).map(() => Array(numNodes).fill(null));

  // Initialize
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const u = y * cols + x;
      dist[u][u] = 0;

      const cell = maze[y][x];
      const neighbors: { x: number; y: number }[] = [];

      if (cell.canMoveUp && y > 0) neighbors.push({ x, y: y - 1 });
      if (cell.canMoveDown && y < rows - 1) neighbors.push({ x, y: y + 1 });
      if (cell.canMoveLeft && x > 0) neighbors.push({ x: x - 1, y });
      if (cell.canMoveRight && x < cols - 1) neighbors.push({ x: x + 1, y });

      for (const neighbor of neighbors) {
        const v = neighbor.y * cols + neighbor.x;
        dist[u][v] = 1;
        next[u][v] = v;
      }
    }
  }

  // Floyd-Warshall Algorithm
  for (let k = 0; k < numNodes; k++) {
    for (let i = 0; i < numNodes; i++) {
      for (let j = 0; j < numNodes; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
          next[i][j] = next[i][k];
        }
      }
    }
  }

  // Convert to lookup table
  const result: ShortestPaths = {};
  for (let startY = 0; startY < rows; startY++) {
    for (let startX = 0; startX < cols; startX++) {
      for (let endY = 0; endY < rows; endY++) {
        for (let endX = 0; endX < cols; endX++) {
          const u = startY * cols + startX;
          const v = endY * cols + endX;
          
          if (u === v) continue;

          const nextNode = next[u][v];
          if (nextNode !== null) {
            const nextY = Math.floor(nextNode / cols);
            const nextX = nextNode % cols;
            const key = `${startX},${startY}|${endX},${endY}`;
            result[key] = {
              dx: nextX - startX,
              dy: nextY - startY
            };
          }
        }
      }
    }
  }

  return result;
}

export function getCompletePath(
  maze: MazeCell[][],
  startX: number,
  startY: number,
  endX: number,
  endY: number
): { x: number; y: number }[] {
  const rows = maze.length;
  const cols = maze[0].length;
  
  // Build the full next matrix for path reconstruction
  const numNodes = rows * cols;
  const next: (number | null)[][] = Array(numNodes).fill(0).map(() => Array(numNodes).fill(null));

  // Initialize adjacency matrix
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const u = y * cols + x;
      const cell = maze[y][x];
      const neighbors: { x: number; y: number }[] = [];

      if (cell.canMoveUp && y > 0) neighbors.push({ x, y: y - 1 });
      if (cell.canMoveDown && y < rows - 1) neighbors.push({ x, y: y + 1 });
      if (cell.canMoveLeft && x > 0) neighbors.push({ x: x - 1, y });
      if (cell.canMoveRight && x < cols - 1) neighbors.push({ x: x + 1, y });

      for (const neighbor of neighbors) {
        const v = neighbor.y * cols + neighbor.x;
        next[u][v] = v;
      }
    }
  }

  // Floyd-Warshall for path reconstruction
  const dist: number[][] = Array(numNodes).fill(0).map(() => Array(numNodes).fill(Infinity));
  for (let i = 0; i < numNodes; i++) dist[i][i] = 0;
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const u = y * cols + x;
      const cell = maze[y][x];
      if (cell.canMoveUp && y > 0) dist[u][(y - 1) * cols + x] = 1;
      if (cell.canMoveDown && y < rows - 1) dist[u][(y + 1) * cols + x] = 1;
      if (cell.canMoveLeft && x > 0) dist[u][y * cols + (x - 1)] = 1;
      if (cell.canMoveRight && x < cols - 1) dist[u][y * cols + (x + 1)] = 1;
    }
  }

  for (let k = 0; k < numNodes; k++) {
    for (let i = 0; i < numNodes; i++) {
      for (let j = 0; j < numNodes; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
          next[i][j] = next[i][k];
        }
      }
    }
  }

  // Reconstruct path
  const path: { x: number; y: number }[] = [];
  const start = startY * cols + startX;
  const end = endY * cols + endX;

  if (next[start][end] === null) {
    return path; // No path exists
  }

  let current = start;
  while (current !== end) {
    const x = current % cols;
    const y = Math.floor(current / cols);
    path.push({ x, y });
    current = next[current][end]!;
  }

  // Add the end position
  path.push({ x: endX, y: endY });

  return path;
}

import { MazeCell, Position } from '../types';

export function generateMaze(width: number, height: number): MazeCell[][] {
  const rows = height % 2 === 0 ? height + 1 : height;
  const cols = width % 2 === 0 ? width + 1 : width;

  const maze: MazeCell[][] = [];

  for (let y = 0; y < rows; y++) {
    const row: MazeCell[] = [];
    for (let x = 0; x < cols; x++) {
      row.push({
        x,
        y,
        hasAlly: false,
        hasEnemy: false,
        isExit: false,
        canMoveUp: false,
        canMoveDown: false,
        canMoveLeft: false,
        canMoveRight: false
      });
    }
    maze.push(row);
  }

  const visited = new Set<string>();
  const stack: Position[] = [];
  const start: Position = { x: 0, y: 0 };

  visited.add(`${start.x},${start.y}`);
  stack.push(start);

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbors = getUnvisitedNeighbors(current, maze, rows, cols, visited);

    if (neighbors.length > 0) {
      const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];

      const dir = getDirection(current, neighbor);

      switch (dir) {
        case 'up':
          maze[current.y][current.x].canMoveUp = true;
          maze[neighbor.y][neighbor.x].canMoveDown = true;
          break;
        case 'down':
          maze[current.y][current.x].canMoveDown = true;
          maze[neighbor.y][neighbor.x].canMoveUp = true;
          break;
        case 'left':
          maze[current.y][current.x].canMoveLeft = true;
          maze[neighbor.y][neighbor.x].canMoveRight = true;
          break;
        case 'right':
          maze[current.y][current.x].canMoveRight = true;
          maze[neighbor.y][neighbor.x].canMoveLeft = true;
          break;
      }

      visited.add(`${neighbor.x},${neighbor.y}`);
      stack.push(neighbor);
    } else {
      stack.pop();
    }
  }

  // Calculate distances from player start (1, 1) to find the best exit
  // The exit should be a dead end (leaf node) to ensure it doesn't block paths
  // And it should be as far as possible from the start
  const playerStart = { x: 1, y: 1 };
  const distances: number[][] = Array(rows).fill(0).map(() => Array(cols).fill(-1));
  const queue: Position[] = [playerStart];
  distances[playerStart.y][playerStart.x] = 0;

  let maxDist = -1;
  let bestExit = { x: cols - 1, y: rows - 1 }; // Default fallback

  // BFS to calculate distances
  let head = 0;
  while (head < queue.length) {
    const current = queue[head++];
    const dist = distances[current.y][current.x];
    const cell = maze[current.y][current.x];

    // Check if this cell is a dead end (only 1 exit)
    let connectionCount = 0;
    if (cell.canMoveUp) connectionCount++;
    if (cell.canMoveDown) connectionCount++;
    if (cell.canMoveLeft) connectionCount++;
    if (cell.canMoveRight) connectionCount++;

    // Update best exit if this is a dead end and further away
    // We ignore the start position itself being a dead end
    if (connectionCount === 1 && dist > maxDist && (current.x !== playerStart.x || current.y !== playerStart.y)) {
      maxDist = dist;
      bestExit = { ...current };
    }

    // Add neighbors
    if (cell.canMoveUp && distances[current.y - 1][current.x] === -1) {
      distances[current.y - 1][current.x] = dist + 1;
      queue.push({ x: current.x, y: current.y - 1 });
    }
    if (cell.canMoveDown && distances[current.y + 1][current.x] === -1) {
      distances[current.y + 1][current.x] = dist + 1;
      queue.push({ x: current.x, y: current.y + 1 });
    }
    if (cell.canMoveLeft && distances[current.y][current.x - 1] === -1) {
      distances[current.y][current.x - 1] = dist + 1;
      queue.push({ x: current.x - 1, y: current.y });
    }
    if (cell.canMoveRight && distances[current.y][current.x + 1] === -1) {
      distances[current.y][current.x + 1] = dist + 1;
      queue.push({ x: current.x + 1, y: current.y });
    }
  }

  // Set the exit
  maze[bestExit.y][bestExit.x].isExit = true;

  return maze;
}

function getUnvisitedNeighbors(
  pos: Position,
  maze: MazeCell[][],
  rows: number,
  cols: number,
  visited: Set<string>
): Position[] {
  const neighbors: Position[] = [];
  const directions = [
    { dx: 0, dy: -1, dir: 'up' as const },
    { dx: 0, dy: 1, dir: 'down' as const },
    { dx: -1, dy: 0, dir: 'left' as const },
    { dx: 1, dy: 0, dir: 'right' as const }
  ];

  for (const { dx, dy, dir } of directions) {
    const nx = pos.x + dx;
    const ny = pos.y + dy;

    if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
      if (!visited.has(`${nx},${ny}`)) {
        neighbors.push({ x: nx, y: ny });
      }
    }
  }

  return neighbors;
}

type Direction = 'up' | 'down' | 'left' | 'right';

function getDirection(from: Position, to: Position): Direction {
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  if (dy < 0) return 'up';
  if (dy > 0) return 'down';
  if (dx < 0) return 'left';
  if (dx > 0) return 'right';
  
  return 'up';
}

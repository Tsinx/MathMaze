export interface Point {
  x: number;
  y: number;
}

/**
 * Resample a trace of points to a fixed number of points (n)
 * This ensures that the matching algorithm is not affected by drawing speed
 */
export function resample(points: Point[], n: number): Point[] {
  if (!points || points.length === 0) return [];
  
  // Handle edge case where all points are the same (distance 0)
  const totalLen = pathLength(points);
  if (totalLen === 0) return Array(n).fill(points[0]);

  if (points.length === 1) return Array(n).fill(points[0]);

  const I = totalLen / (n - 1); // interval length
  let D = 0;
  
  // Clone the points to avoid modifying the original array
  const srcPoints = [...points];
  const newPoints: Point[] = [srcPoints[0]];
  
  let i = 1;
  // Safety break to prevent infinite loops in case of weird point data
  let iterations = 0;
  const MAX_ITERATIONS = n * 10; 

  while (i < srcPoints.length && iterations < MAX_ITERATIONS) {
    iterations++;
    const d = distance(srcPoints[i - 1], srcPoints[i]);
    if ((D + d) >= I) {
      const qx = srcPoints[i - 1].x + ((I - D) / d) * (srcPoints[i].x - srcPoints[i - 1].x);
      const qy = srcPoints[i - 1].y + ((I - D) / d) * (srcPoints[i].y - srcPoints[i - 1].y);
      const q = { x: qx, y: qy };
      newPoints.push(q);
      // Insert q at position i in srcPoints so we continue from q
      srcPoints.splice(i, 0, q); 
      D = 0;
    } else {
      D += d;
      i++;
    }
  }
  
  // Floating point errors might leave us with n-1 points
  while (newPoints.length < n) {
    newPoints.push(srcPoints[srcPoints.length - 1]);
  }
  
  return newPoints;
}

export function pathLength(points: Point[]): number {
  let d = 0;
  for (let i = 1; i < points.length; i++) {
    d += distance(points[i - 1], points[i]);
  }
  return d;
}

export function distance(p1: Point, p2: Point): number {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Translate points so that their centroid is at (0,0)
 */
export function translateToOrigin(points: Point[]): Point[] {
  const c = centroid(points);
  return points.map(p => ({ x: p.x - c.x, y: p.y - c.y }));
}

export function centroid(points: Point[]): Point {
  let x = 0, y = 0;
  for (const p of points) {
    x += p.x;
    y += p.y;
  }
  return { x: x / points.length, y: y / points.length };
}

/**
 * Scale points to fit inside a box of size x size
 */
export function scaleToSquare(points: Point[], size: number): Point[] {
  const b = boundingBox(points);
  const width = b.maxX - b.minX;
  const height = b.maxY - b.minY;
  
  // Avoid division by zero
  if (width === 0 && height === 0) return points;

  // We scale uniformly to fit within the box
  const maxDim = Math.max(width, height);
  const scale = size / maxDim;
  
  return points.map(p => ({ x: p.x * scale, y: p.y * scale }));
}

export function boundingBox(points: Point[]) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of points) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }
  return { minX, maxX, minY, maxY };
}

/**
 * Calculate the average distance between corresponding points in two paths
 */
function pathDistance(pts1: Point[], pts2: Point[]): number {
  let d = 0.0;
  const len = Math.min(pts1.length, pts2.length);
  for (let i = 0; i < len; i++) {
    d += distance(pts1[i], pts2[i]);
  }
  return d / len;
}

/**
 * Compare user drawing with a template and return a score (0 to 1)
 * 1.0 means perfect match
 */
export function getScore(userPoints: Point[], templatePoints: Point[], sampleSize = 64, boxSize = 250): number {
  if (userPoints.length < 5) return 0; // Too short

  // 1. Resample
  let processedUser = resample(userPoints, sampleSize);
  let processedTemplate = resample(templatePoints, sampleSize);

  // 2. Translate to origin
  processedUser = translateToOrigin(processedUser);
  processedTemplate = translateToOrigin(processedTemplate);

  // 3. Scale to square
  processedUser = scaleToSquare(processedUser, boxSize);
  processedTemplate = scaleToSquare(processedTemplate, boxSize);

  // 4. Calculate distance
  const d = pathDistance(processedUser, processedTemplate);
  
  // 5. Convert distance to score
  // A reasonable "bad" distance is half the diagonal of the box
  const diagonal = Math.sqrt(boxSize * boxSize + boxSize * boxSize);
  const score = 1.0 - d / (0.5 * diagonal); // Relaxed from 0.3 to 0.5 to be more forgiving for kids
  
  return Math.max(0, score);
}

// Regex for pair of coordinates. Accounts for negative and floats
const COORDINATES_REGEXP = "[\\d\\-\\.]+,[\\d\\-\\.]+";

/**
 * Reverses an SVG path and replaces M commands with L. Assumes path only contains L commands
 * and coordinates are formulated like "123.456,-654".
 */
export const reversePath = (path: string): string => {
  return path
    .replace("M", "L")
    .split(new RegExp(`(L ${COORDINATES_REGEXP} )`))
    .reverse()
    .join("")
    .trim();
};

export const calculateSegmentLength = (
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
): number => {
  return Math.sqrt(
    Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2),
  );
};

/**
 * Grabs the last coordinates in a path, returns null if none are found.
 */
export const getEndOfSpiralCoords = (spiralPath: string): string | null => {
  const captureGroup = new RegExp(`(?<coords>${COORDINATES_REGEXP}) *$`).exec(
    spiralPath,
  );

  return captureGroup?.groups?.["coords"] ?? "";
};

/**
 * Calculates the radius of a spiral given a center point. Assumes the spiral path starts from the
 * center and ends at the farthest point.
 */
export const calculateSpiralRadius = (
  spiralPath: string,
  centerCoords: [number, number],
): number => {
  const endOfFirstSpiralCoords = (getEndOfSpiralCoords(spiralPath) || "0,0")
    .split(",")
    .map((str) => parseFloat(str)) as [number, number];

  return calculateSegmentLength(endOfFirstSpiralCoords, centerCoords);
};

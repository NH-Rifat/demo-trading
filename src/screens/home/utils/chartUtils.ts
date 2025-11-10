// ============================================
// CHART UTILITIES
// Helper functions for generating chart paths and patterns
// ============================================

/**
 * Generates a static mini chart path for stock visualizations
 * @param isPositive - Whether the trend is positive (upward) or negative (downward)
 * @param seed - Seed value for consistent pattern generation
 * @returns SVG polyline points string
 */
export const generateMiniChartPath = (isPositive: boolean = true, seed: number = 0): string => {
  const points = [];
  const numPoints = 25;
  const chartWidth = 120;
  const chartHeight = 40;

  for (let i = 0; i < numPoints; i++) {
    const x = (i * chartWidth) / (numPoints - 1);
    // Create static, realistic stock movement with varying amplitude
    const baseY = chartHeight / 2;
    const wave1 = Math.sin((i + seed) * 0.4) * 8;
    const wave2 = Math.cos((i + seed) * 0.6) * 5;
    const trend = isPositive ? -(i * 0.3) : i * 0.3; // Upward or downward trend
    const noise = Math.sin((i + seed) * 1.2) * 2; // Static pattern instead of random

    const y = baseY + wave1 + wave2 + trend + noise;
    points.push(`${x},${Math.max(5, Math.min(chartHeight - 5, y))}`);
  }
  return points.join(' ');
};

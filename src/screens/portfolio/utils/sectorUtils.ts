// ============================================
// SECTOR UTILITIES
// Helper functions for sector-related operations
// ============================================

/**
 * Get color for a specific sector
 * @param sector - Sector name
 * @returns Hex color code
 */
export function getSectorColor(sector: string): string {
  const colors: { [key: string]: string } = {
    Technology: '#3b82f6',
    Healthcare: '#10b981',
    Finance: '#8b5cf6',
    'Consumer Goods': '#f59e0b',
    Energy: '#ef4444',
    Telecommunications: '#06b6d4',
    Industrials: '#f97316',
    Materials: '#14b8a6',
    'Real Estate': '#ec4899',
    Utilities: '#6366f1',
  };
  return colors[sector] || '#6b7280';
}

// ============================================
// CUSTOM HOOKS - Portfolio Screen
// Hooks for managing portfolio calculations and data
// ============================================

import type { Position } from '@/src/types';
import { useMemo } from 'react';

interface PortfolioValueData {
  totalInvested: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

interface PositionWithCurrentData extends Position {
  currentPrice: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercent: number;
  change: number;
  changePercent: number;
}

interface SectorAllocation {
  sector: string;
  value: number;
  percentage: number;
}

/**
 * Calculate total portfolio value with current prices
 */
export const usePortfolioValue = (
  positions: Position[],
  stocks: any[]
): PortfolioValueData => {
  return useMemo(() => {
    let totalInvested = 0;
    let currentValue = 0;

    positions.forEach((position: Position) => {
      const stock = stocks.find((s: any) => s.id === position.stockId);
      if (stock) {
        totalInvested += position.investedAmount;
        currentValue += stock.price * position.quantity;
      }
    });

    const profitLoss = currentValue - totalInvested;
    const profitLossPercent = totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0;

    return {
      totalInvested,
      currentValue,
      profitLoss,
      profitLossPercent,
    };
  }, [positions, stocks]);
};

/**
 * Calculate today's change
 */
export const useTodaysChange = (positions: Position[], stocks: any[]): number => {
  return useMemo(() => {
    let change = 0;
    positions.forEach((position: Position) => {
      const stock = stocks.find((s: any) => s.id === position.stockId);
      if (stock) {
        change += stock.change * position.quantity;
      }
    });
    return change;
  }, [positions, stocks]);
};

/**
 * Get positions with current market data
 */
export const usePositionsWithCurrentData = (
  positions: Position[],
  stocks: any[]
): PositionWithCurrentData[] => {
  return useMemo(() => {
    return positions
      .map((position: Position) => {
        const stock = stocks.find((s: any) => s.id === position.stockId);
        if (!stock) return null;

        const currentValue = stock.price * position.quantity;
        const profitLoss = currentValue - position.investedAmount;
        const profitLossPercent = (profitLoss / position.investedAmount) * 100;

        return {
          ...position,
          currentPrice: stock.price,
          currentValue,
          profitLoss,
          profitLossPercent,
          change: stock.change,
          changePercent: stock.changePercent,
        };
      })
      .filter((p: any): p is NonNullable<typeof p> => p !== null)
      .sort((a: any, b: any) => b.currentValue - a.currentValue);
  }, [positions, stocks]);
};

/**
 * Calculate sector allocation
 */
export const useSectorAllocation = (
  positionsWithCurrentData: PositionWithCurrentData[],
  stocks: any[],
  portfolioValue: number
): SectorAllocation[] => {
  return useMemo(() => {
    const allocation: { [key: string]: number } = {};

    positionsWithCurrentData.forEach((position: any) => {
      const stock = stocks.find((s: any) => s.id === position.stockId);
      if (stock) {
        const sector = stock.sector;
        allocation[sector] = (allocation[sector] || 0) + position.currentValue;
      }
    });

    return Object.entries(allocation)
      .map(([sector, value]) => ({
        sector,
        value,
        percentage: (value / portfolioValue) * 100,
      }))
      .sort((a, b) => b.value - a.value);
  }, [positionsWithCurrentData, stocks, portfolioValue]);
};

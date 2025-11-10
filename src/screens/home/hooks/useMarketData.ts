// ============================================
// CUSTOM HOOKS - Home Screen
// Hooks for managing real-time data updates
// ============================================

import { useEffect, useState } from 'react';
import { initialMarketData, initialSectorsData, MarketData, SectorData } from '../data/mockData';

/**
 * Hook for managing real-time market data updates
 * Updates different values at different intervals to simulate live data
 */
export const useMarketDataUpdates = () => {
  const [marketData, setMarketData] = useState<MarketData>(initialMarketData);

  useEffect(() => {
    const randomChange = () => (Math.random() - 0.5) * 1.5;

    // CSCX updates every 300ms
    const cscxInterval = setInterval(() => {
      setMarketData((prev) => ({
        ...prev,
        cscx: {
          value: prev.cscx.value + randomChange(),
          change: prev.cscx.value + randomChange(),
        },
      }));
    }, 300);

    // DSEX updates every 500ms
    const dsexInterval = setInterval(() => {
      setMarketData((prev) => ({
        ...prev,
        dsex: {
          value: prev.dsex.value + randomChange(),
          change: prev.dsex.value + randomChange(),
        },
      }));
    }, 500);

    // DSEX Index updates every 700ms
    const dsexIndexInterval = setInterval(() => {
      setMarketData((prev) => ({
        ...prev,
        indices: {
          ...prev.indices,
          dsex: {
            value: prev.indices.dsex.value + randomChange() * 2,
            change: prev.indices.dsex.change + randomChange() * 0.5,
            changePercent: (prev.indices.dsex.change / prev.indices.dsex.value) * 100,
          },
        },
      }));
    }, 700);

    // DS30 updates every 450ms
    const ds30Interval = setInterval(() => {
      setMarketData((prev) => ({
        ...prev,
        indices: {
          ...prev.indices,
          ds30: {
            value: prev.indices.ds30.value + randomChange() * 1.5,
            change: prev.indices.ds30.change + randomChange() * 0.4,
            changePercent: (prev.indices.ds30.change / prev.indices.ds30.value) * 100,
          },
        },
      }));
    }, 450);

    // DSES updates every 600ms
    const dsesInterval = setInterval(() => {
      setMarketData((prev) => ({
        ...prev,
        indices: {
          ...prev.indices,
          dses: {
            value: prev.indices.dses.value + randomChange() * 1.2,
            change: prev.indices.dses.change + randomChange() * 0.3,
            changePercent: (prev.indices.dses.change / prev.indices.dses.value) * 100,
          },
        },
      }));
    }, 600);

    // Turnover (value) updates every 600ms
    const turnoverValueInterval = setInterval(() => {
      setMarketData((prev) => ({
        ...prev,
        turnover: {
          ...prev.turnover,
          value: Math.max(0, prev.turnover.value + randomChange() * 5),
        },
      }));
    }, 600);

    // BUY PRESSURE (turnover percent) updates every 800ms
    const buyPressureInterval = setInterval(() => {
      setMarketData((prev) => ({
        ...prev,
        turnover: {
          ...prev.turnover,
          percent: Math.max(0, Math.min(100, prev.turnover.percent + randomChange() * 2)),
        },
      }));
    }, 800);

    // Volume updates every 600ms
    const volumeInterval = setInterval(() => {
      setMarketData((prev) => ({
        ...prev,
        volume: {
          value: Math.max(0, prev.volume.value + randomChange() * 0.2),
        },
      }));
    }, 600);

    // Trade (value) updates every 900ms
    const tradeValueInterval = setInterval(() => {
      setMarketData((prev) => ({
        ...prev,
        trade: {
          ...prev.trade,
          value: Math.max(0, Math.round(prev.trade.value + randomChange() * 100)),
        },
      }));
    }, 900);

    // SELL PRESSURE (trade percent) updates every 900ms
    const sellPressureInterval = setInterval(() => {
      setMarketData((prev) => ({
        ...prev,
        trade: {
          ...prev.trade,
          percent: Math.max(0, Math.min(100, prev.trade.percent + randomChange() * 2)),
        },
      }));
    }, 900);

    return () => {
      clearInterval(cscxInterval);
      clearInterval(dsexInterval);
      clearInterval(dsexIndexInterval);
      clearInterval(ds30Interval);
      clearInterval(dsesInterval);
      clearInterval(turnoverValueInterval);
      clearInterval(buyPressureInterval);
      clearInterval(volumeInterval);
      clearInterval(tradeValueInterval);
      clearInterval(sellPressureInterval);
    };
  }, []);

  return marketData;
};

/**
 * Hook for managing real-time sector data updates
 * Updates sector values and automatically sorts them
 */
export const useSectorDataUpdates = () => {
  const [topSectorsData, setTopSectorsData] = useState<SectorData[]>(initialSectorsData);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setTopSectorsData((prevData) => {
        // Create a copy of the data
        const updatedData = prevData.map((sector) => {
          // Random value change (±10% of current value)
          const changePercent = (Math.random() - 0.5) * 0.2; // -10% to +10%
          const newValue = Math.max(0.1, sector.value * (1 + changePercent));

          return {
            ...sector,
            value: parseFloat(newValue.toFixed(2)),
          };
        });

        // Sort by value to create natural position shuffling
        return updatedData.sort((a, b) => b.value - a.value);
      });
    }, 1000); // Update every 1 second for smooth real-time effect

    return () => clearInterval(updateInterval);
  }, []);

  return topSectorsData;
};

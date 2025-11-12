import EmptyState from '@/components/common/EmptyState';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useTheme } from '@/src/contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
    addStockToWatchlist,
    removeStockFromWatchlist,
} from '@/src/store/slices/watchlistSlice';
import type { Stock } from '@/src/types';
import { generateVolumeData, getChartDataForRange } from '@/src/utils/chartDataGenerator';
import { getProfitColor } from '@/src/utils/helpers';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AboutSection } from './components/AboutSection';
import { ActionButtons } from './components/ActionButtons';
import { Charts } from './components/Charts';
import { CompanyInformation } from './components/CompanyInformation';
import { Header } from './components/Header';
import { KeyStatistics } from './components/KeyStatistics';
import { PriceSection } from './components/PriceSection';
import { TimeRangeSelector } from './components/TimeRangeSelector';
import { useIsInWatchlist } from './hooks/useIsInWatchlist';
import { useStockBySymbol } from './hooks/useStockBySymbol';
import { useStockMetrics } from './hooks/useStockMetrics';
import { createStockDetailStyles } from './styles/stockDetailStyles';

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';

export default function StockDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { symbol } = useLocalSearchParams<{ symbol: string }>();
  const dispatch = useAppDispatch();
  const { colors, fonts } = useTheme();

  const stocks = useAppSelector((state: any) => state.market.stocks);
  const watchlistItems = useAppSelector((state: any) => state.watchlist.watchlists);

  const [selectedRange, setSelectedRange] = useState<TimeRange>('1D');
  const [isLoading, setIsLoading] = useState(true);
  
  const styles = createStockDetailStyles(colors, fonts);

  // Custom hooks
  const stock = useStockBySymbol(symbol);
  const isInWatchlist = useIsInWatchlist(symbol);
  const { dayRange, peRatio, marketCap, avgVolume } = useStockMetrics(stock);

  // Generate chart data
  const candleData = stock ? getChartDataForRange(stock.price, selectedRange) : [];
  const volumeData = generateVolumeData(candleData);

  const priceColor = stock ? getProfitColor(stock.change) : '#6b7280';

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Handlers
  const handleWatchlistToggle = () => {
    if (!stock) return;

    if (isInWatchlist) {
      // Remove from all watchlists
      watchlistItems.forEach((watchlist: any) => {
        if (
          watchlist.stocks.some((id: string) => {
            const s = stocks.find((st: Stock) => st.id === id);
            return s?.symbol === symbol;
          })
        ) {
          dispatch(
            removeStockFromWatchlist({
              watchlistId: watchlist.id,
              stockId: stock.id,
            })
          );
        }
      });
    } else {
      // Add to default watchlist (first one)
      const defaultWatchlist = watchlistItems[0];
      if (defaultWatchlist) {
        dispatch(
          addStockToWatchlist({
            watchlistId: defaultWatchlist.id,
            stockId: stock.id,
          })
        );
      }
    }
  };

  const handleSell = () => {
    router.push({
      pathname: '/(tabs)/trade',
      params: {
        stockSymbol: stock?.symbol,
        tradeType: 'SELL',
      },
    });
  };

  const handleBuy = () => {
    router.push({
      pathname: '/(tabs)/trade',
      params: {
        stockSymbol: stock?.symbol,
        tradeType: 'BUY',
      },
    });
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading stock details..." />;
  }

  if (!stock) {
    return (
      <SafeAreaView style={styles.container}>
        <EmptyState
          icon="analytics-outline"
          title="Stock not found"
          message={`Unable to find stock with symbol "${symbol}"`}
        />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        symbol={stock.symbol}
        name={stock.name}
        isInWatchlist={isInWatchlist}
        insets={insets}
        onBack={() => router.back()}
        onToggleWatchlist={handleWatchlistToggle}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <PriceSection
          price={stock.price}
          change={stock.change}
          changePercent={stock.changePercent}
          priceColor={priceColor}
          lastUpdate={stock.lastUpdate}
        />

        <TimeRangeSelector selectedRange={selectedRange} onSelectRange={setSelectedRange} />

        <Charts candleData={candleData} volumeData={volumeData} />

        <KeyStatistics
          open={stock.open}
          high={stock.high}
          low={stock.low}
          close={stock.close}
          volume={stock.volume}
          avgVolume={avgVolume}
        />

        <CompanyInformation
          sector={stock.sector}
          marketCap={marketCap}
          peRatio={peRatio}
          dayRange={dayRange}
        />

        <AboutSection
          name={stock.name}
          symbol={stock.symbol}
          sector={stock.sector}
          price={stock.price}
          marketCap={marketCap}
        />

        {/* Spacer for bottom buttons */}
        <View style={{ height: 100 }} />
      </ScrollView>

      <ActionButtons onSell={handleSell} onBuy={handleBuy} />
    </View>
  );
}

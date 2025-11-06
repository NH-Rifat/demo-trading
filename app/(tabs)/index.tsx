// ============================================
// MARKET ANALYSIS SCREEN - Main Trading Dashboard
// Features: Real-time stock list, category filters, search, pull-to-refresh
// ============================================

import MarketOverview from '@/components/charts/MarketOverview';
import CategoryFilter from '@/components/common/CategoryFilter';
import EmptyState from '@/components/common/EmptyState';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import SearchBar from '@/components/common/SearchBar';
import StockCard from '@/components/common/StockCard';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { updatePrices } from '@/src/store/slices/marketSlice';
import type { MarketCategory, Stock } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function MarketScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const stocks = useAppSelector((state: any) => state.market.stocks);
  const watchlistItems = useAppSelector((state: any) => state.watchlist.watchlists);
  
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('GAINER');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate market stats
  const marketStats = useMemo(() => {
    const gainers = stocks.filter((s: Stock) => s.changePercent > 0).length;
    const losers = stocks.filter((s: Stock) => s.changePercent < 0).length;
    const unchanged = stocks.filter((s: Stock) => s.changePercent === 0).length;
    const totalChange = stocks.reduce((sum: number, s: Stock) => sum + s.changePercent, 0);
    const avgChange = totalChange / stocks.length;
    const marketTrend = avgChange > 0.5 ? 'up' : avgChange < -0.5 ? 'down' : 'neutral';

    return { gainers, losers, unchanged, marketTrend };
  }, [stocks]);

  // Initial loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time price updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updatePrices());
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // Filter stocks by category
  const getFilteredStocks = useCallback((): Stock[] => {
    let filtered = [...stocks];

    // Apply category filter
    switch (selectedCategory) {
      case 'GAINER':
        filtered = filtered.filter((s) => s.changePercent > 0);
        filtered.sort((a, b) => b.changePercent - a.changePercent);
        break;
      case 'LOSER':
        filtered = filtered.filter((s) => s.changePercent < 0);
        filtered.sort((a, b) => a.changePercent - b.changePercent);
        break;
      case 'UNCHANGED':
        filtered = filtered.filter((s) => s.changePercent === 0);
        break;
      case 'MOST_TRADED':
        filtered.sort((a, b) => b.volume - a.volume);
        break;
      case 'MOST_VALUE':
        filtered.sort((a, b) => b.value - a.value);
        break;
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.symbol.toLowerCase().includes(query) ||
          s.name.toLowerCase().includes(query) ||
          s.sector.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [stocks, selectedCategory, searchQuery]);

  const filteredStocks = getFilteredStocks();

  // Pull to refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Trigger price updates
    dispatch(updatePrices());
    
    setRefreshing(false);
  }, [dispatch]);

  // Check if stock is in watchlist
  const isInWatchlist = useCallback(
    (symbol: string): boolean => {
      return watchlistItems.some((item: any) => 
        item.stocks.some((stockId: string) => {
          const stock = stocks.find((s: Stock) => s.id === stockId);
          return stock?.symbol === symbol;
        })
      );
    },
    [watchlistItems, stocks]
  );

  // Handle stock card press (navigate to detail screen - to be implemented)
  const handleStockPress = (stock: Stock) => {
    router.push(`/stock/${stock.symbol}`);
  };

  // Handle watchlist toggle
  const handleWatchlistToggle = (stock: Stock) => {
    console.log('Watchlist toggle:', stock.symbol);
    // TODO: Dispatch add/remove from watchlist action
  };

  // Render header with stats
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>Market Analysis</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#111827" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {/* Market Overview Chart */}
      <MarketOverview
        topGainers={marketStats.gainers}
        topLosers={marketStats.losers}
        unchanged={marketStats.unchanged}
        marketTrend={marketStats.marketTrend as 'up' | 'down' | 'neutral'}
      />

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search stocks..."
      />

      {/* Category Filter */}
      <CategoryFilter
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
    </View>
  );

  // Loading state
  if (isLoading) {
    return <LoadingSpinner message="Loading market data..." />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredStocks}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <StockCard
            stock={item}
            onPress={() => handleStockPress(item)}
            showStar={true}
            isInWatchlist={isInWatchlist(item.symbol)}
            onToggleWatchlist={() => handleWatchlistToggle(item)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="search-outline"
            title="No stocks found"
            message={
              searchQuery
                ? `No results for "${searchQuery}"`
                : 'Try selecting a different category'
            }
          />
        }
        contentContainerStyle={[
          styles.listContent,
          filteredStocks.length === 0 && styles.emptyList,
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#10b981"
            colors={['#10b981']}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 4,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyList: {
    flexGrow: 1,
  },
});

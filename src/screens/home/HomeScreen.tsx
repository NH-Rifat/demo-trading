// ============================================
// HOME SCREEN - Market Dashboard (UFFAST Style)
// Main screen component with organized architecture
// ============================================

import React, { useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AdvanceDecline } from './components/AdvanceDecline';
import { FeaturedLists } from './components/FeaturedLists';
import { Header } from './components/Header';
import { IndexCards } from './components/IndexCards';
import { MarketStats } from './components/MarketStats';
import { TopSectors } from './components/TopSectors';
import { featuredListsData } from './data/mockData';
import { useMarketDataUpdates, useSectorDataUpdates } from './hooks/useMarketData';
import { homeStyles } from './styles/homeStyles';

type TabType = 'gainer' | 'loser' | 'trade' | 'value' | 'volume';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState<'DSE' | 'CSE'>('DSE');
  const [selectedTab, setSelectedTab] = useState<TabType>('gainer');
  const [showAllSectors, setShowAllSectors] = useState(false);

  // Real-time data hooks
  const marketData = useMarketDataUpdates();
  const topSectorsData = useSectorDataUpdates();

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  return (
    <View style={[homeStyles.container, { paddingTop: insets.top }]}>
      {/* Fixed Header */}
      <Header
        cashLimit={marketData.cashLimit}
        cscxValue={marketData.cscx.value}
        dsexValue={marketData.dsex.value}
        selectedExchange={selectedExchange}
        onExchangeChange={setSelectedExchange}
      />

      {/* Scrollable Content */}
      <ScrollView
        style={homeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#10b981" colors={['#10b981']} />
        }
      >
        {/* Index Cards */}
        <IndexCards indices={marketData.indices} />

        {/* Market Stats */}
        <MarketStats turnover={marketData.turnover} volume={marketData.volume} trade={marketData.trade} />

        {/* Advance Decline Chart */}
        <AdvanceDecline advanceDecline={marketData.advanceDecline} />

        {/* Top Featured Lists */}
        <FeaturedLists selectedTab={selectedTab} onTabChange={setSelectedTab} data={featuredListsData} />

        {/* Top Invested Sectors */}
        <TopSectors
          sectors={topSectorsData}
          showAll={showAllSectors}
          onToggleShowAll={() => setShowAllSectors(!showAllSectors)}
        />

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

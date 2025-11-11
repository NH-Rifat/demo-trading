// ============================================
// FEATURED LISTS COMPONENT
// Top gainer, loser, trade, value, and volume lists with tabs
// Theme-aware with dynamic colors
// ============================================

import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Polyline, Stop } from 'react-native-svg';
import { FeaturedStock } from '../data/mockData';
import { createFeaturedListsStyles } from '../styles/homeStyles';
import { generateMiniChartPath } from '../utils/chartUtils';

type TabType = 'gainer' | 'loser' | 'trade' | 'value' | 'volume';

interface FeaturedListsProps {
  selectedTab: TabType;
  onTabChange: (tab: TabType) => void;
  data: Record<TabType, FeaturedStock[]>;
}

export const FeaturedLists: React.FC<FeaturedListsProps> = ({ selectedTab, onTabChange, data }) => {
  const { colors } = useTheme();
  const featuredListsStyles = createFeaturedListsStyles(colors);

  const tabs: { key: TabType; label: string }[] = [
    { key: 'gainer', label: 'Top Gainer' },
    { key: 'loser', label: 'Top Loser' },
    { key: 'trade', label: 'Top Trade' },
    { key: 'value', label: 'Top Value' },
    { key: 'volume', label: 'Top Volume' },
  ];

  return (
    <View style={featuredListsStyles.container}>
      <View style={featuredListsStyles.header}>
        <Text style={featuredListsStyles.title}>Top Featured Lists</Text>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={featuredListsStyles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[featuredListsStyles.tab, selectedTab === tab.key && featuredListsStyles.tabActive]}
            onPress={() => onTabChange(tab.key)}
          >
            <Text
              style={[
                featuredListsStyles.tabText,
                selectedTab === tab.key && featuredListsStyles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Stock List */}
      <View style={featuredListsStyles.stockList}>
        {data[selectedTab].map((stock, index) => {
          const hasChangeData = 'change' in stock;
          const isPositive = hasChangeData ? stock.change! >= 0 : true;

          const changeColor = isPositive ? colors.success : colors.danger;

          return (
            <Animated.View 
              key={index}
              entering={FadeInDown.duration(300).delay(index * 50).springify()}
            >
              <TouchableOpacity style={featuredListsStyles.stockRow}>
              <View style={featuredListsStyles.stockLeft}>
                <Text style={featuredListsStyles.stockSymbol}>{stock.symbol}</Text>
                <Text style={featuredListsStyles.stockPrice}>{stock.price}</Text>
              </View>

              {stock.hasChart && (
                <View style={featuredListsStyles.stockChart}>
                  <Svg height="40" width="120" style={featuredListsStyles.chartSvg}>
                    {/* Background gradient area */}
                    <Defs>
                      <LinearGradient id={`gradient-${selectedTab}-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <Stop offset="0%" stopColor={changeColor} stopOpacity="0.2" />
                        <Stop offset="100%" stopColor={changeColor} stopOpacity="0" />
                      </LinearGradient>
                    </Defs>

                    {/* Filled area under the line */}
                    <Polyline
                      points={`0,40 ${generateMiniChartPath(isPositive, index)} 120,40`}
                      fill={`url(#gradient-${selectedTab}-${index})`}
                      stroke="none"
                    />

                    {/* Main line */}
                    <Polyline
                      points={generateMiniChartPath(isPositive, index)}
                      fill="none"
                      stroke={changeColor}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
              )}

              <View style={featuredListsStyles.stockRight}>
                {hasChangeData ? (
                  <>
                    <Text style={[featuredListsStyles.stockChange, { color: changeColor }]}>
                      {stock.change! >= 0 ? '+' : ''}
                      {stock.change}
                    </Text>
                    <Text
                      style={[featuredListsStyles.stockChangePercent, { color: changeColor }]}
                    >
                      ({stock.changePercent}%)
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={[featuredListsStyles.stockChange, { color: colors.text }]}>{stock.value}</Text>
                    <Text style={[featuredListsStyles.stockChangePercent, { color: colors.textSecondary }]}>
                      {selectedTab === 'trade' ? 'trades' : selectedTab === 'value' ? 'cr' : 'cr'}
                    </Text>
                  </>
                )}
              </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

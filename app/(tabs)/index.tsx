// ============================================
// MARKET DASHBOARD - Home Screen (UFFAST Style)
// Features: Fixed header, index tickers, market stats, advance decline chart
// ============================================

import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, Line, LinearGradient, Polyline, Rect, Stop, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function MarketScreen() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState<'DSE' | 'CSE'>('DSE');
  const [selectedTab, setSelectedTab] = useState<'gainer' | 'loser' | 'trade' | 'value' | 'volume'>('gainer');
  const [showAllSectors, setShowAllSectors] = useState(false);

  // Top Invested Sectors Data - Initial data
  const initialSectorsData = [
    { name: 'Engineering', value: 24.75, color: '#ef4444', maxValue: 25 },
    { name: 'PharmaChem', value: 23.23, color: '#10b981', maxValue: 25 },
    { name: 'FuelPower', value: 14.74, color: '#f59e0b', maxValue: 25 },
    { name: 'Bank', value: 13.4, color: '#84cc16', maxValue: 25 },
    { name: 'Textile', value: 11.58, color: '#3b82f6', maxValue: 25 },
    { name: 'Insurance', value: 11.27, color: '#b96991ff', maxValue: 25 },
    { name: 'PaperPrint', value: 9.24, color: '#14b8a6', maxValue: 25 },
    { name: 'Misc', value: 7.12, color: '#f97316', maxValue: 25 },
    { name: 'ServRealEst', value: 6.72, color: '#8b5cf6', maxValue: 25 },
    { name: 'FoodAllied', value: 6.02, color: '#ef4444', maxValue: 25 },
    { name: 'Financial In', value: 3.33, color: '#3b82f6', maxValue: 25 },
    { name: 'IT', value: 3.31, color: '#ec4899', maxValue: 25 },
    { name: 'Telecom', value: 2.74, color: '#c084fc', maxValue: 25 },
    { name: 'Jute', value: 2.3, color: '#14b8a6', maxValue: 25 },
    { name: 'TravelLeisur', value: 2.21, color: '#ef4444', maxValue: 25 },
    { name: 'MutFund', value: 2.2, color: '#f59e0b', maxValue: 25 },
    { name: 'Ceramic', value: 72.74, color: '#10b981', maxValue: 150 },
    { name: 'Tannery', value: 54.08, color: '#ef4444', maxValue: 150 },
    { name: 'Cement', value: 46.54, color: '#14b8a6', maxValue: 150 },
    { name: 'CorpBond', value: 8.81, color: '#6b7280', maxValue: 150 },
  ];

  // State for sectors with real-time updates
  const [topSectorsData, setTopSectorsData] = useState(initialSectorsData);

  // Featured Lists Data
  const featuredListsData = {
    gainer: [
      { symbol: 'POWERGRID', price: 31.9, change: 3.7, changePercent: 13.1, hasChart: true },
      { symbol: 'UTTARAFIN', price: 11.1, change: 0.7, changePercent: 6.7, hasChart: true },
      { symbol: 'ORIONINFU', price: 393.4, change: 18.5, changePercent: 4.9, hasChart: true },
      { symbol: 'PRIMETEX', price: 12.7, change: 0.5, changePercent: 4.1, hasChart: true },
      { symbol: '1JANATAMF', price: 2.7, change: 0.1, changePercent: 3.9, hasChart: true },
    ],
    loser: [
      { symbol: 'BEACHHATCH', price: 28.5, change: -4.2, changePercent: -12.8, hasChart: true },
      { symbol: 'CENTRALINS', price: 45.3, change: -3.8, changePercent: -7.7, hasChart: true },
      { symbol: 'PARAMOUNT', price: 8.6, change: -0.6, changePercent: -6.5, hasChart: true },
      { symbol: 'LEGACYFOOT', price: 15.2, change: -0.8, changePercent: -5.0, hasChart: true },
      { symbol: 'PHOENIX', price: 102.7, change: -4.5, changePercent: -4.2, hasChart: true },
    ],
    trade: [
      { symbol: 'BATBC', price: 567.8, value: 45670, hasChart: true },
      { symbol: 'SQURPHARMA', price: 234.5, value: 38920, hasChart: true },
      { symbol: 'BEXIMCO', price: 89.4, value: 32150, hasChart: true },
      { symbol: 'CITYBANK', price: 23.6, value: 28730, hasChart: true },
      { symbol: 'GPH', price: 45.8, value: 25480, hasChart: true },
    ],
    value: [
      { symbol: 'GRAMEENPHONE', price: 289.5, value: 156.8, hasChart: true },
      { symbol: 'ROBI', price: 45.7, value: 98.3, hasChart: true },
      { symbol: 'BRACBANK', price: 42.3, value: 76.5, hasChart: true },
      { symbol: 'BRAC', price: 56.9, value: 65.2, hasChart: true },
      { symbol: 'ISLAMIBANK', price: 38.4, value: 54.9, hasChart: true },
    ],
    volume: [
      { symbol: 'BEXIMCO', price: 89.4, value: 8.52, hasChart: true },
      { symbol: 'PENINSULA', price: 12.3, value: 6.78, hasChart: true },
      { symbol: 'ACTIVEFINE', price: 7.8, value: 5.34, hasChart: true },
      { symbol: 'FORTUNE', price: 5.4, value: 4.91, hasChart: true },
      { symbol: 'GENERATION', price: 34.6, value: 4.23, hasChart: true },
    ],
  };

  // Mock data with real-time updates
  const [marketData, setMarketData] = useState({
    cashLimit: 2.05,
    cscx: { value: -12.62, change: -0.69 },
    dsex: { value: -33.92, change: -0.69 },
    indices: {
      dsex: { value: 4866.00, change: -33.92, changePercent: -0.69 },
      ds30: { value: 1919.48, change: -9.31, changePercent: -0.48 },
      dses: { value: 1013.62, change: -8.99, changePercent: -0.88 },
    },
    turnover: { value: 146.16, percent: 40.17 },
    volume: { value: 5.49 },
    trade: { value: 55670, percent: 59.83 },
    advanceDecline: {
      neg: 280,
      nc: 56,
      pos: 45,
      distribution: [
        { range: '<-10%', neg: 20, nc: 0, pos: 6 },
        { range: '-10--7', neg: 35, nc: 0, pos: 0 },
        { range: '-7--5', neg: 87, nc: 0, pos: 0 },
        { range: '-5--2', neg: 138, nc: 0, pos: 0 },
        { range: '-2-0', neg: 56, nc: 0, pos: 0 },
        { range: '0-2%', neg: 32, nc: 56, pos: 12 },
        { range: '2-5%', neg: 11, nc: 0, pos: 32 },
        { range: '5-7%', neg: 4, nc: 0, pos: 25 },
        { range: '7-10%', neg: 35, nc: 0, pos: 10 },
        // { range: '>10%', neg: 0, nc: 0, pos: 0 },
      ]
    }
  });

  // Asynchronous real-time data updates - different intervals for each value
  useEffect(() => {
    const randomChange = () => (Math.random() - 0.5) * 1.5;

    // CSCX updates every 300ms
    const cscxInterval = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        cscx: {
          value: prev.cscx.value + randomChange(),
          change: prev.cscx.value + randomChange(),
        },
      }));
    }, 300);

    // DSEX updates every 500ms
    const dsexInterval = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        dsex: {
          value: prev.dsex.value + randomChange(),
          change: prev.dsex.value + randomChange(),
        },
      }));
    }, 500);

    // DSEX Index updates every 700ms
    const dsexIndexInterval = setInterval(() => {
      setMarketData(prev => ({
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
      setMarketData(prev => ({
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
      setMarketData(prev => ({
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
      setMarketData(prev => ({
        ...prev,
        turnover: {
          ...prev.turnover,
          value: Math.max(0, prev.turnover.value + randomChange() * 5),
        },
      }));
    }, 600);

    // BUY PRESSURE (turnover percent) updates every 800ms
    const buyPressureInterval = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        turnover: {
          ...prev.turnover,
          percent: Math.max(0, Math.min(100, prev.turnover.percent + randomChange() * 2)),
        },
      }));
    }, 800);

    // Volume updates every 600ms
    const volumeInterval = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        volume: {
          value: Math.max(0, prev.volume.value + randomChange() * 0.2),
        },
      }));
    }, 600);

    // Trade (value) updates every 900ms
    const tradeValueInterval = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        trade: {
          ...prev.trade,
          value: Math.max(0, Math.round(prev.trade.value + randomChange() * 100)),
        },
      }));
    }, 900);

    // SELL PRESSURE (trade percent) updates every 900ms
    const sellPressureInterval = setInterval(() => {
      setMarketData(prev => ({
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

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  // Real-time continuous sector updates (like live survey)
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setTopSectorsData(prevData => {
        // Create a copy of the data
        const updatedData = prevData.map(sector => {
          // Random value change (±10% of current value)
          const changePercent = (Math.random() - 0.5) * 0.2; // -10% to +10%
          const newValue = Math.max(0.1, sector.value * (1 + changePercent));
          
          return {
            ...sector,
            value: parseFloat(newValue.toFixed(2))
          };
        });
        
        // Sort by value to create natural position shuffling
        return updatedData.sort((a, b) => b.value - a.value);
      });
    }, 1000); // Update every 2 seconds for smooth real-time effect

    return () => clearInterval(updateInterval);
  }, []);

  const generateMiniChartPath = (isPositive: boolean = true, seed: number = 0) => {
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
      const trend = isPositive ? -(i * 0.3) : (i * 0.3); // Upward or downward trend
      const noise = Math.sin((i + seed) * 1.2) * 2; // Static pattern instead of random
      
      const y = baseY + wave1 + wave2 + trend + noise;
      points.push(`${x},${Math.max(5, Math.min(chartHeight - 5, y))}`);
    }
    return points.join(' ');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* FIXED HEADER - Two Separate Sections */}
      
      {/* Top Section with Gray Background */}
      <View style={styles.headerTopSection}>
        <View style={styles.headerTop}>
          {/* Cash Limit */}
          <View style={styles.cashLimitContainer}>
            <View style={styles.cashLimitIcon}>
              <Ionicons name="arrow-up-circle" size={18} color="#10b981" />
            </View>
            <Text style={styles.cashLimitLabel}>Cash Limit</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* CSCX Ticker */}
          <View style={styles.tickerItem}>
            <Text style={styles.tickerSymbol}>CSCX</Text>
            <Text style={[styles.tickerValue, { color: '#ef4444' }]}>
              {marketData.cscx.value.toFixed(2)}
            </Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* DSEX Ticker */}
          <View style={styles.tickerItem}>
            <Text style={styles.tickerSymbol}>DSEX</Text>
            <Text style={[styles.tickerValue, { color: '#ef4444' }]}>
              {marketData.dsex.value.toFixed(2)}
            </Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Notification Icon */}
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color="#111827" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>9+</Text>
            </View>
          </TouchableOpacity>

          {/* Search Icon */}
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search-outline" size={22} color="#111827" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Section with Gray Background - Logo & Exchange Toggle */}
      <View style={styles.headerBottomSection}>
        <View style={styles.headerMiddle}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Xpert</Text>
          </View>

          <View style={styles.exchangeToggle}>
            <TouchableOpacity
              style={[styles.exchangeButton, selectedExchange === 'DSE' && styles.exchangeButtonActive]}
              onPress={() => setSelectedExchange('DSE')}
            >
              <Text style={[styles.exchangeButtonText, selectedExchange === 'DSE' && styles.exchangeButtonTextActive]}>
                DSE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.exchangeButton, selectedExchange === 'CSE' && styles.exchangeButtonActive]}
              onPress={() => setSelectedExchange('CSE')}
            >
              <Text style={[styles.exchangeButtonText, selectedExchange === 'CSE' && styles.exchangeButtonTextActive]}>
                CSE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#10b981" colors={['#10b981']} />}
      >
        {/* Index Cards */}
        <View style={styles.indicesRow}>
          {Object.entries(marketData.indices).map(([key, data]) => (
            <View key={key} style={styles.indexCard}>
              <Text style={styles.indexSymbol}>{key.toUpperCase()}</Text>
              <Text style={styles.indexValue}>{data.value.toFixed(2)}</Text>
              <Svg height="50" width="100%" style={styles.miniChart}>
                <Polyline points={generateMiniChartPath()} fill="none" stroke="#ef4444" strokeWidth="2" />
              </Svg>
              <Text style={[styles.indexChange, { color: '#ef4444' }]}>{data.change.toFixed(2)}</Text>
              <Text style={[styles.indexChangePercent, { color: '#ef4444' }]}>({data.changePercent.toFixed(2)}%)</Text>
            </View>
          ))}
        </View>

        {/* Market Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: '#d1fae5' }]}>
            <Text style={styles.statValue}>{marketData.turnover.value.toFixed(2)} cr</Text>
            <Text style={styles.statLabel}>Turnover</Text>
            <Text style={styles.statPercent}>{marketData.turnover.percent.toFixed(2)}%</Text>
            <Text style={styles.statType}>BUY PRESSURE</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#fecaca' }]}>
            <Text style={styles.statValue}>{marketData.volume.value.toFixed(2)} cr</Text>
            <Text style={styles.statLabel}>Volume</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#fecaca' }]}>
            <Text style={styles.statValue}>{marketData.trade.value}</Text>
            <Text style={styles.statLabel}>Trade</Text>
            <Text style={styles.statPercent}>{marketData.trade.percent.toFixed(2)}%</Text>
            <Text style={styles.statType}>SELL PRESSURE</Text>
          </View>
        </View>

        {/* Advance Decline Chart */}
        <View style={styles.advanceDeclineContainer}>
          <Text style={styles.sectionTitle}>Advance Decline</Text>
          <Svg height="250" width={width - 32}>
            {marketData.advanceDecline.distribution.map((item, index) => {
              const barWidth = 25
              
              ;
              const spacing = (width - 32) / 10;
              const x = index * spacing + (spacing - barWidth) / 2;
              const total = item.neg + item.nc + item.pos;
              const scale = total > 0 ? Math.min((total / 150) * 180, 180) : 0;
              const negHeight = (item.neg / (total || 1)) * scale;
              const ncHeight = (item.nc / (total || 1)) * scale;
              const posHeight = (item.pos / (total || 1)) * scale;

              return (
                <React.Fragment key={index}>
                  <Rect x={x} y={150 - negHeight} width={barWidth} height={negHeight} fill="#ea6565ff" />
                  <Rect x={x} y={150 - negHeight - ncHeight} width={barWidth} height={ncHeight} fill="#7b7f87ff" />
                  <Rect x={x} y={150 - negHeight - ncHeight - posHeight} width={barWidth} height={posHeight} fill="#7dc4acff" />
                  {item.neg > 0 && <SvgText x={x + barWidth / 2} y={150 - negHeight / 2} fontSize="10" fill="#fff" textAnchor="middle">{item.neg}</SvgText>}
                  {item.nc > 0 && <SvgText x={x + barWidth / 2} y={150 - negHeight - ncHeight / 2} fontSize="10" fill="#fff" textAnchor="middle">{item.nc}</SvgText>}
                  {item.pos > 0 && <SvgText x={x + barWidth / 2} y={150 - negHeight - ncHeight - posHeight / 2} fontSize="10" fill="#fff" textAnchor="middle">{item.pos}</SvgText>}
                  <SvgText x={x + barWidth / 2} y={170} fontSize="9" fill="#34363bff" textAnchor="middle">{item.range}</SvgText>
                </React.Fragment>
              );
            })}
            <Line x1="0" y1="150" x2={width - 32} y2="150" stroke="#e5e7eb" strokeWidth="1" />
          </Svg>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#ef4444' }]} />
              <Text style={styles.legendText}>NEG: {marketData.advanceDecline.neg}</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#6b7280' }]} />
              <Text style={styles.legendText}>NC: {marketData.advanceDecline.nc}</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#10b981' }]} />
              <Text style={styles.legendText}>POS: {marketData.advanceDecline.pos}</Text>
            </View>
          </View>
        </View>

        

        {/* Top Featured Lists */}
        <View style={styles.featuredListsContainer}>
          <View style={styles.featuredHeader}>
            <Text style={styles.featuredTitle}>Top Featured Lists</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tab, selectedTab === 'gainer' && styles.tabActive]}
              onPress={() => setSelectedTab('gainer')}
            >
              <Text style={[styles.tabText, selectedTab === 'gainer' && styles.tabTextActive]}>Top Gainer</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, selectedTab === 'loser' && styles.tabActive]}
              onPress={() => setSelectedTab('loser')}
            >
              <Text style={[styles.tabText, selectedTab === 'loser' && styles.tabTextActive]}>Top Loser</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, selectedTab === 'trade' && styles.tabActive]}
              onPress={() => setSelectedTab('trade')}
            >
              <Text style={[styles.tabText, selectedTab === 'trade' && styles.tabTextActive]}>Top Trade</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, selectedTab === 'value' && styles.tabActive]}
              onPress={() => setSelectedTab('value')}
            >
              <Text style={[styles.tabText, selectedTab === 'value' && styles.tabTextActive]}>Top Value</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, selectedTab === 'volume' && styles.tabActive]}
              onPress={() => setSelectedTab('volume')}
            >
              <Text style={[styles.tabText, selectedTab === 'volume' && styles.tabTextActive]}>Top Volume</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Stock List */}
          <View style={styles.stockList}>
            {featuredListsData[selectedTab].map((stock, index) => {
              const hasChangeData = 'change' in stock;
              const isPositive = hasChangeData ? stock.change >= 0 : true;
              
              return (
                <TouchableOpacity key={index} style={styles.stockRow}>
                  <View style={styles.stockLeft}>
                    <Text style={styles.stockSymbol}>{stock.symbol}</Text>
                    <Text style={styles.stockPrice}>{stock.price}</Text>
                  </View>

                  {stock.hasChart && (
                    <View style={styles.stockChart}>
                      <Svg height="40" width="120" style={styles.chartSvg}>
                        {/* Background gradient area */}
                        <Defs>
                          <LinearGradient id={`gradient-${selectedTab}-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <Stop offset="0%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0.2" />
                            <Stop offset="100%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0" />
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
                          stroke={isPositive ? '#10b981' : '#ef4444'} 
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                    </View>
                  )}

                  <View style={styles.stockRight}>
                    {hasChangeData ? (
                      <>
                        <Text style={[styles.stockChange, { color: isPositive ? '#10b981' : '#ef4444' }]}>
                          {stock.change >= 0 ? '+' : ''}{stock.change}
                        </Text>
                        <Text style={[styles.stockChangePercent, { color: isPositive ? '#10b981' : '#ef4444' }]}>
                          ({stock.changePercent}%)
                        </Text>
                      </>
                    ) : (
                      <>
                        <Text style={[styles.stockChange, { color: '#111827' }]}>
                          {stock.value}
                        </Text>
                        <Text style={[styles.stockChangePercent, { color: '#6b7280' }]}>
                          {selectedTab === 'trade' ? 'trades' : selectedTab === 'value' ? 'cr' : 'cr'}
                        </Text>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Top Invested Sectors */}
        <View style={styles.topSectorsContainer}>
          <View style={styles.sectorHeader}>
            <Text style={styles.sectorTitle}>Top Invested Sectors</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={24} color="#111827" />
            </TouchableOpacity>
          </View>

          <View style={styles.sectorsList}>
            {(() => {
              // Get the sectors to display
              const displayedSectors = topSectorsData.slice(0, showAllSectors ? topSectorsData.length : 8);
              // Find the maximum value among displayed sectors for proper bar scaling
              const maxDisplayedValue = Math.max(...displayedSectors.map(s => s.value));
              
              return displayedSectors.map((sector, index) => {
                // Calculate bar width based on the highest value in the displayed list
                const barWidth = (sector.value / maxDisplayedValue) * 100;
                const displayValue = sector.value >= 10 
                  ? `${sector.value.toFixed(2)}cr` 
                  : sector.value >= 1 
                  ? `${sector.value.toFixed(1)}cr`
                  : sector.value.toLocaleString();

                return (
                  <View 
                    key={sector.name} 
                    style={styles.sectorRow}
                  >
                    <Text style={styles.sectorName}>{sector.name}</Text>
                    <View style={styles.sectorBarContainer}>
                      <View style={[styles.sectorBar, { width: `${barWidth}%`, backgroundColor: sector.color }]} />
                    </View>
                    <Text style={styles.sectorValue}>{displayValue}</Text>
                  </View>
                );
              });
            })()}
          </View>

          {/* Show More / Show Less Button */}
          <TouchableOpacity 
            style={styles.showMoreButton}
            onPress={() => setShowAllSectors(!showAllSectors)}
          >
            <Text style={styles.showMoreText}>
              {showAllSectors ? 'Show Less' : 'Show More'}
            </Text>
            <Ionicons 
              name={showAllSectors ? 'chevron-up' : 'chevron-down'} 
              size={18} 
              color="#10b981" 
            />
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  headerTopSection: { backgroundColor: '#ffffff', paddingHorizontal: 16, paddingVertical: 12, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 }, android: { elevation: 1 } }) },
  headerBottomSection: { backgroundColor: '#f3f4f6', paddingHorizontal: 16, paddingVertical: 12, marginTop: 2, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }, android: { elevation: 2 } }) },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cashLimitContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, gap: 6 },
  cashLimitIcon: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center' },
  cashLimitLabel: { fontSize: 13, fontWeight: '600', color: '#111827' },
  divider: { width: 1, height: 20, backgroundColor: '#d1d5db' },
  tickerItem: { alignItems: 'center' },
  tickerSymbol: { fontSize: 11, color: '#6b7280', fontWeight: '600' },
  tickerValue: { fontSize: 14, fontWeight: '700' },
  iconButton: { position: 'relative' },
  notificationBadge: { position: 'absolute', top: -4, right: -4, backgroundColor: '#ef4444', borderRadius: 10, minWidth: 18, height: 18, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4 },
  badgeText: { color: '#ffffff', fontSize: 9, fontWeight: '700' },
  headerMiddle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  logoContainer: { paddingVertical: 8 },
  logoText: { fontSize: 24, fontWeight: '900', color: '#10b981', letterSpacing: 1 },
  exchangeToggle: { flexDirection: 'row', backgroundColor: '#ffffff', borderRadius: 20, padding: 4 },
  exchangeButton: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 16 },
  exchangeButtonActive: { backgroundColor: '#ef4444' },
  exchangeButtonText: { fontSize: 13, fontWeight: '700', color: '#6b7280' },
  exchangeButtonTextActive: { color: '#ffffff' },
  scrollContent: { flex: 1 },
  indicesRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingTop: 16 },
  indexCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: 12, padding: 12, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 }, android: { elevation: 2 } }) },
  indexSymbol: { fontSize: 14, fontWeight: '700', color: '#111827', marginBottom: 4 },
  indexValue: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 8 },
  miniChart: { marginBottom: 8 },
  indexChange: { fontSize: 13, fontWeight: '600' },
  indexChangePercent: { fontSize: 11, fontWeight: '600' },
  statsRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginTop: 16 },
  statBox: { flex: 1, borderRadius: 12, padding: 16 },
  statValue: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 4 },
  statLabel: { fontSize: 11, color: '#6b7280', marginBottom: 8 },
  statPercent: { fontSize: 14, fontWeight: '700', color: '#111827', marginBottom: 2 },
  statType: { fontSize: 9, fontWeight: '600', color: '#6b7280', letterSpacing: 0.5 },
  advanceDeclineContainer: { backgroundColor: '#ffffff', borderRadius: 12, padding: 16, marginHorizontal: 16, marginTop: 16, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 }, android: { elevation: 2 } }) },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 16 },
  legend: { flexDirection: 'row', justifyContent: 'center', gap: 4, marginTop: 6 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 16, height: 16, borderRadius: 4 },
  legendText: { fontSize: 13, fontWeight: '600', color: '#111827' },
  earningSection: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff', borderRadius: 12, padding: 20, marginHorizontal: 16, marginTop: 16, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 }, android: { elevation: 2 } }) },
  earningTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  // Top Invested Sectors
  topSectorsContainer: { backgroundColor: '#ffffff', borderRadius: 12, padding: 16, marginHorizontal: 16, marginTop: 16, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 }, android: { elevation: 2 } }) },
  sectorHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  sectorTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  sectorsList: { gap: 12 },
  sectorRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectorName: { width: 90, fontSize: 13, fontWeight: '600', color: '#111827', textAlign: 'right' },
  sectorBarContainer: { flex: 1, height: 20, backgroundColor: '#f3f4f6', borderRadius: 10, overflow: 'hidden' },
  sectorBar: { height: '100%', borderRadius: 10 },
  sectorValue: { width: 70, fontSize: 13, fontWeight: '600', color: '#111827', textAlign: 'left' },
  showMoreButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 16, paddingVertical: 8 },
  showMoreText: { fontSize: 14, fontWeight: '600', color: '#10b981' },
  // Top Featured Lists
  featuredListsContainer: { backgroundColor: '#ffffff', borderRadius: 12, padding: 16, marginHorizontal: 16, marginTop: 16, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 }, android: { elevation: 2 } }) },
  featuredHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  featuredTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  tabsContainer: { marginBottom: 16 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, marginRight: 8, backgroundColor: '#f3f4f6', borderRadius: 20 },
  tabActive: { backgroundColor: '#bfdbfe' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#6b7280', fontStyle: 'italic' },
  tabTextActive: { color: '#1d4ed8' },
  stockList: { gap: 0 },
  stockRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  stockLeft: { width: 100 },
  stockSymbol: { fontSize: 14, fontWeight: '700', color: '#111827', marginBottom: 2 },
  stockPrice: { fontSize: 12, color: '#6b7280' },
  stockChart: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  chartSvg: { overflow: 'visible' },
  stockRight: { width: 80, alignItems: 'flex-end' },
  stockChange: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  stockChangePercent: { fontSize: 11, fontWeight: '600' },
});

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
import Svg, { Line, Polyline, Rect, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function MarketScreen() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState<'DSE' | 'CSE'>('DSE');
  const [selectedTab, setSelectedTab] = useState<'gainer' | 'loser' | 'trade' | 'value' | 'volume'>('gainer');

  // Featured Lists Data
  const featuredListsData = {
    gainer: [
      { symbol: 'POWERGRID', price: 31.9, change: 3.7, changePercent: 13.1, hasChart: true },
      { symbol: 'UTTARAFIN', price: 11.1, change: 0.7, changePercent: 6.7, hasChart: false },
      { symbol: 'ORIONINFU', price: 393.4, change: 18.5, changePercent: 4.9, hasChart: true },
      { symbol: 'PRIMETEX', price: 12.7, change: 0.5, changePercent: 4.1, hasChart: true },
      { symbol: '1JANATAMF', price: 2.7, change: 0.1, changePercent: 3.9, hasChart: true },
    ],
    loser: [
      { symbol: 'BEACHHATCH', price: 28.5, change: -4.2, changePercent: -12.8, hasChart: true },
      { symbol: 'CENTRALINS', price: 45.3, change: -3.8, changePercent: -7.7, hasChart: true },
      { symbol: 'PARAMOUNT', price: 8.6, change: -0.6, changePercent: -6.5, hasChart: false },
      { symbol: 'LEGACYFOOT', price: 15.2, change: -0.8, changePercent: -5.0, hasChart: true },
      { symbol: 'PHOENIX', price: 102.7, change: -4.5, changePercent: -4.2, hasChart: true },
    ],
    trade: [
      { symbol: 'BATBC', price: 567.8, change: 12.3, changePercent: 2.2, hasChart: true },
      { symbol: 'SQURPHARMA', price: 234.5, change: -2.1, changePercent: -0.9, hasChart: true },
      { symbol: 'BEXIMCO', price: 89.4, change: 1.8, changePercent: 2.1, hasChart: false },
      { symbol: 'CITYBANK', price: 23.6, change: -0.4, changePercent: -1.7, hasChart: true },
      { symbol: 'GPH', price: 45.8, change: 0.9, changePercent: 2.0, hasChart: true },
    ],
    value: [
      { symbol: 'GRAMEENPHONE', price: 289.5, change: 5.2, changePercent: 1.8, hasChart: true },
      { symbol: 'ROBI', price: 45.7, change: -1.2, changePercent: -2.6, hasChart: true },
      { symbol: 'BRACBANK', price: 42.3, change: 0.8, changePercent: 1.9, hasChart: false },
      { symbol: 'BRAC', price: 56.9, change: 2.1, changePercent: 3.8, hasChart: true },
      { symbol: 'ISLAMIBANK', price: 38.4, change: -0.6, changePercent: -1.5, hasChart: true },
    ],
    volume: [
      { symbol: 'BEXIMCO', price: 89.4, change: 1.8, changePercent: 2.1, hasChart: true },
      { symbol: 'PENINSULA', price: 12.3, change: 0.3, changePercent: 2.5, hasChart: false },
      { symbol: 'ACTIVEFINE', price: 7.8, change: -0.2, changePercent: -2.5, hasChart: true },
      { symbol: 'FORTUNE', price: 5.4, change: 0.1, changePercent: 1.9, hasChart: true },
      { symbol: 'GENERATION', price: 34.6, change: -0.8, changePercent: -2.3, hasChart: true },
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

  const generateMiniChartPath = () => {
    const points = [];
    for (let i = 0; i < 20; i++) {
      const x = (i * 80) / 20;
      const y = 40 + Math.sin(i * 0.5) * 15 + 5;
      points.push(`${x},${y}`);
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
                  <Rect x={x} y={150 - negHeight} width={barWidth} height={negHeight} fill="#ef4444" />
                  <Rect x={x} y={150 - negHeight - ncHeight} width={barWidth} height={ncHeight} fill="#6b7280" />
                  <Rect x={x} y={150 - negHeight - ncHeight - posHeight} width={barWidth} height={posHeight} fill="#10b981" />
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
            {featuredListsData[selectedTab].map((stock, index) => (
              <TouchableOpacity key={index} style={styles.stockRow}>
                <View style={styles.stockLeft}>
                  <Text style={styles.stockSymbol}>{stock.symbol}</Text>
                  <Text style={styles.stockPrice}>{stock.price}</Text>
                </View>

                {stock.hasChart && (
                  <View style={styles.stockChart}>
                    <Svg height="40" width="120">
                      <Polyline 
                        points={generateMiniChartPath()} 
                        fill="none" 
                        stroke={stock.change >= 0 ? '#10b981' : '#ef4444'} 
                        strokeWidth="2" 
                      />
                    </Svg>
                  </View>
                )}

                <View style={styles.stockRight}>
                  <Text style={[styles.stockChange, { color: stock.change >= 0 ? '#10b981' : '#ef4444' }]}>
                    {stock.change >= 0 ? '+' : ''}{stock.change}
                  </Text>
                  <Text style={[styles.stockChangePercent, { color: stock.change >= 0 ? '#10b981' : '#ef4444' }]}>
                    ({stock.changePercent}%)
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
  stockRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  stockLeft: { flex: 1 },
  stockSymbol: { fontSize: 14, fontWeight: '700', color: '#111827', marginBottom: 2 },
  stockPrice: { fontSize: 12, color: '#6b7280' },
  stockChart: { flex: 1, alignItems: 'center' },
  stockRight: { alignItems: 'flex-end' },
  stockChange: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  stockChangePercent: { fontSize: 11, fontWeight: '600' },
});

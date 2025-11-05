// ============================================
// STOCK CARD - Reusable Stock Display Card
// ============================================

import { Stock } from '@/src/types';
import { formatCurrency, formatPercent, getProfitColor } from '@/src/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface StockCardProps {
  stock: Stock;
  onPress?: () => void;
  showStar?: boolean;
  isInWatchlist?: boolean;
  onToggleWatchlist?: () => void;
}

export default function StockCard({
  stock,
  onPress,
  showStar = false,
  isInWatchlist = false,
  onToggleWatchlist,
}: StockCardProps) {
  const priceColor = getProfitColor(stock.change);
  const isPositive = stock.change >= 0;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        {/* Left Section - Symbol & Name */}
        <View style={styles.leftSection}>
          <View style={styles.symbolContainer}>
            <Text style={styles.symbol}>{stock.symbol}</Text>
            {showStar && (
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  onToggleWatchlist?.();
                }}
                style={styles.starButton}
              >
                <Ionicons
                  name={isInWatchlist ? 'star' : 'star-outline'}
                  size={18}
                  color={isInWatchlist ? '#fbbf24' : '#9ca3af'}
                />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.name} numberOfLines={1}>
            {stock.name}
          </Text>
        </View>

        {/* Right Section - Price & Change */}
        <View style={styles.rightSection}>
          <Text style={styles.price}>{formatCurrency(stock.price)}</Text>
          <View style={[styles.changeContainer, { backgroundColor: `${priceColor}15` }]}>
            <Ionicons
              name={isPositive ? 'trending-up' : 'trending-down'}
              size={14}
              color={priceColor}
            />
            <Text style={[styles.change, { color: priceColor }]}>
              {formatPercent(stock.changePercent)}
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom Section - Additional Info */}
      <View style={styles.bottomSection}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Volume</Text>
          <Text style={styles.infoValue}>
            {(stock.volume / 1000000).toFixed(2)}M
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>High</Text>
          <Text style={styles.infoValue}>{formatCurrency(stock.high)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Low</Text>
          <Text style={styles.infoValue}>{formatCurrency(stock.low)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  leftSection: {
    flex: 1,
    marginRight: 12,
  },
  symbolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  symbol: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginRight: 6,
  },
  starButton: {
    padding: 2,
  },
  name: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  change: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: '#9ca3af',
    fontWeight: '500',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#e5e7eb',
  },
});

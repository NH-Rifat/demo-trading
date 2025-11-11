import { useTheme } from '@/src/contexts/ThemeContext';
import type { Stock } from '@/src/types';
import { formatCurrency, getProfitColor } from '@/src/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStockSelectorStyles } from '../styles/tradeStyles';

interface StockSelectorProps {
  selectedStock: Stock | null;
  tradeType: 'BUY' | 'SELL';
  holdingQuantity: number;
  onPress: () => void;
}

export const StockSelector: React.FC<StockSelectorProps> = ({
  selectedStock,
  tradeType,
  holdingQuantity,
  onPress,
}) => {
  const { colors } = useTheme();
  const styles = createStockSelectorStyles(colors);
  
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>Select Stock</Text>
      <TouchableOpacity style={styles.stockSelector} onPress={onPress}>
        {selectedStock ? (
          <View style={styles.selectedStockContent}>
            <View>
              <Text style={styles.selectedStockSymbol}>{selectedStock.symbol}</Text>
              <Text style={styles.selectedStockName}>{selectedStock.name}</Text>
            </View>
            <View style={styles.selectedStockRight}>
              <Text style={styles.selectedStockPrice}>
                {formatCurrency(selectedStock.price)}
              </Text>
              <Text
                style={[
                  styles.selectedStockChange,
                  { color: getProfitColor(selectedStock.change) },
                ]}
              >
                {selectedStock.change >= 0 ? '+' : ''}
                {selectedStock.changePercent.toFixed(2)}%
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.stockSelectorPlaceholder}>
            <Ionicons name="search" size={20} color={colors.textTertiary} />
            <Text style={styles.stockSelectorPlaceholderText}>
              Tap to select a stock
            </Text>
          </View>
        )}
        <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      {/* Holding info for SELL */}
      {tradeType === 'SELL' && selectedStock && (
        <View style={styles.holdingInfo}>
          <Ionicons name="information-circle" size={16} color={colors.info} />
          <Text style={styles.holdingInfoText}>
            You hold {holdingQuantity} shares
          </Text>
        </View>
      )}
    </View>
  );
};

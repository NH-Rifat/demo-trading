import SearchBar from '@/components/common/SearchBar';
import { useTheme } from '@/src/contexts/ThemeContext';
import type { Stock } from '@/src/types';
import { formatCurrency, getProfitColor } from '@/src/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { createStockPickerStyles } from '../styles/tradeStyles';

interface StockPickerModalProps {
  visible: boolean;
  stocks: Stock[];
  searchQuery: string;
  onChangeSearch: (value: string) => void;
  onSelectStock: (stock: Stock) => void;
  onClose: () => void;
}

export const StockPickerModal: React.FC<StockPickerModalProps> = ({
  visible,
  stocks,
  searchQuery,
  onChangeSearch,
  onSelectStock,
  onClose,
}) => {
  const { colors } = useTheme();
  const styles = createStockPickerStyles(colors);
  
  const filteredStocks = stocks.filter(
    (s: Stock) =>
      s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStockItem = ({ item }: { item: Stock }) => {
    const priceColor = getProfitColor(item.change);

    return (
      <TouchableOpacity style={styles.stockItem} onPress={() => onSelectStock(item)}>
        <View style={styles.stockItemLeft}>
          <Text style={styles.stockItemSymbol}>{item.symbol}</Text>
          <Text style={styles.stockItemName}>{item.name}</Text>
        </View>
        <View style={styles.stockItemRight}>
          <Text style={styles.stockItemPrice}>{formatCurrency(item.price)}</Text>
          <Text style={[styles.stockItemChange, { color: priceColor }]}>
            {item.change >= 0 ? '+' : ''}
            {item.changePercent.toFixed(2)}%
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Select Stock</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.modalSearchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={onChangeSearch}
            placeholder="Search stocks..."
          />
        </View>

        <FlatList
          data={filteredStocks}
          keyExtractor={(item) => item.id}
          renderItem={renderStockItem}
          contentContainerStyle={styles.stockList}
        />
      </View>
    </Modal>
  );
};

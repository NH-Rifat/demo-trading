import SearchBar from '@/components/common/SearchBar';
import { useTheme } from '@/src/contexts/ThemeContext';
import type { Stock } from '@/src/types';
import { formatCurrency, getProfitColor } from '@/src/utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    FadeIn,
    FadeInDown,
    SlideInDown
} from 'react-native-reanimated';
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
  const { colors, fonts } = useTheme();
  const styles = createStockPickerStyles(colors, fonts);
  
  const filteredStocks = stocks.filter(
    (s: Stock) =>
      s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStockItem = ({ item, index }: { item: Stock; index: number }) => {
    const priceColor = getProfitColor(item.change);

    return (
      <Animated.View entering={FadeInDown.duration(300).delay(index * 30).springify()}>
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
      </Animated.View>
    );
  };

  return (
    <Modal 
      visible={visible} 
      animationType="fade" 
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <Animated.View 
          style={styles.modalContainer}
          entering={FadeIn.duration(200)}
        >
          <Animated.View 
            style={styles.modalContent}
            entering={SlideInDown.duration(400).springify()}
          >
            <Animated.View 
              style={styles.modalHeader}
              entering={FadeInDown.duration(300).delay(100)}
            >
              <Text style={styles.modalTitle}>Select Stock</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={28} color={colors.textSecondary} />
              </TouchableOpacity>
            </Animated.View>

            <Animated.View 
              style={styles.modalSearchContainer}
              entering={FadeInDown.duration(300).delay(200)}
            >
              <SearchBar
                value={searchQuery}
                onChangeText={onChangeSearch}
                placeholder="Search stocks..."
              />
            </Animated.View>

            <FlatList
              data={filteredStocks}
              keyExtractor={(item) => item.id}
              renderItem={renderStockItem}
              contentContainerStyle={styles.stockList}
            />
          </Animated.View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

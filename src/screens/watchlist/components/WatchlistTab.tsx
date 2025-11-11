import { useTheme } from '@/src/contexts/ThemeContext';
import type { Watchlist } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createWatchlistTabStyles } from '../styles/watchlistStyles';

interface WatchlistTabProps {
  watchlist: Watchlist;
  isActive: boolean;
  onPress: () => void;
  onEdit: () => void;
}

export const WatchlistTab: React.FC<WatchlistTabProps> = ({
  watchlist,
  isActive,
  onPress,
  onEdit,
}) => {
  const { colors } = useTheme();
  const styles = createWatchlistTabStyles(colors);
  const stockCount = watchlist.stocks.length;

  return (
    <TouchableOpacity
      style={[
        styles.watchlistTab,
        isActive && styles.watchlistTabActive,
      ]}
      onPress={onPress}
      onLongPress={onEdit}
    >
      <View style={styles.watchlistTabContent}>
        <Text
          style={[
            styles.watchlistTabName,
            isActive && styles.watchlistTabNameActive,
          ]}
        >
          {watchlist.name}
        </Text>
        <Text
          style={[
            styles.watchlistTabCount,
            isActive && styles.watchlistTabCountActive,
          ]}
        >
          {stockCount} {stockCount === 1 ? 'stock' : 'stocks'}
        </Text>
      </View>
      {isActive && (
        <TouchableOpacity style={styles.watchlistEditButton} onPress={onEdit}>
          <Ionicons name="ellipsis-horizontal" size={18} color={colors.success} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

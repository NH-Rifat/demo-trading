import type { Watchlist } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { watchlistTabStyles } from '../styles/watchlistStyles';

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
  const stockCount = watchlist.stocks.length;

  return (
    <TouchableOpacity
      style={[
        watchlistTabStyles.watchlistTab,
        isActive && watchlistTabStyles.watchlistTabActive,
      ]}
      onPress={onPress}
      onLongPress={onEdit}
    >
      <View style={watchlistTabStyles.watchlistTabContent}>
        <Text
          style={[
            watchlistTabStyles.watchlistTabName,
            isActive && watchlistTabStyles.watchlistTabNameActive,
          ]}
        >
          {watchlist.name}
        </Text>
        <Text
          style={[
            watchlistTabStyles.watchlistTabCount,
            isActive && watchlistTabStyles.watchlistTabCountActive,
          ]}
        >
          {stockCount} {stockCount === 1 ? 'stock' : 'stocks'}
        </Text>
      </View>
      {isActive && (
        <TouchableOpacity style={watchlistTabStyles.watchlistEditButton} onPress={onEdit}>
          <Ionicons name="ellipsis-horizontal" size={18} color="#10b981" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

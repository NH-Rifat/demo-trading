import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { headerStyles } from '../styles/watchlistStyles';

interface HeaderProps {
  insets: { top: number; bottom: number; left: number; right: number };
  onCreatePress: () => void;
}

export const Header: React.FC<HeaderProps> = ({ insets, onCreatePress }) => {
  return (
    <View style={[headerStyles.headerTop, { paddingTop: insets.top + 16 }]}>
      <Text style={headerStyles.headerTitle}>Watchlists</Text>
      <TouchableOpacity style={headerStyles.createButton} onPress={onCreatePress}>
        <Ionicons name="add" size={24} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

// ============================================
// HOLDINGS LIST COMPONENT
// Displays list of all positions
// ============================================

import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { createPortfolioStyles } from '../styles/portfolioStyles';
import { PositionCard } from './PositionCard';

interface HoldingsListProps {
  positions: any[];
  positionsCount: number;
}

export const HoldingsList: React.FC<HoldingsListProps> = ({ positions, positionsCount }) => {
  const { colors } = useTheme();
  const styles = createPortfolioStyles(colors);
  
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Holdings</Text>
        <Text style={styles.sectionCount}>{positionsCount}</Text>
      </View>
      <FlatList
        data={positions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PositionCard position={item} />}
        scrollEnabled={false}
        contentContainerStyle={{ gap: 12 }}
      />
    </View>
  );
};

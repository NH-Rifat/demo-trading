// ============================================
// SECTOR CARD COMPONENT
// Displays sector allocation with progress bar
// ============================================

import { useTheme } from '@/src/contexts/ThemeContext';
import { formatCurrency, formatPercent } from '@/src/utils/helpers';
import React from 'react';
import { Text, View } from 'react-native';
import { createSectorStyles } from '../styles/portfolioStyles';
import { getSectorColor } from '../utils/sectorUtils';

interface SectorCardProps {
  sector: {
    sector: string;
    value: number;
    percentage: number;
  };
}

export const SectorCard: React.FC<SectorCardProps> = ({ sector }) => {
  const { colors } = useTheme();
  const styles = createSectorStyles(colors);
  
  return (
    <View style={styles.sectorCard}>
      <View style={styles.sectorHeader}>
        <View style={styles.sectorLeft}>
          <View
            style={[
              styles.sectorColorDot,
              { backgroundColor: getSectorColor(sector.sector) },
            ]}
          />
          <Text style={styles.sectorName}>{sector.sector}</Text>
        </View>
        <Text style={styles.sectorPercentage}>{formatPercent(sector.percentage)}</Text>
      </View>
      <View style={styles.sectorBarContainer}>
        <View
          style={[
            styles.sectorBar,
            {
              width: `${sector.percentage}%`,
              backgroundColor: getSectorColor(sector.sector),
            },
          ]}
        />
      </View>
      <Text style={styles.sectorValue}>{formatCurrency(sector.value)}</Text>
    </View>
  );
};

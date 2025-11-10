// ============================================
// SECTOR CARD COMPONENT
// Displays sector allocation with progress bar
// ============================================

import { formatCurrency, formatPercent } from '@/src/utils/helpers';
import React from 'react';
import { Text, View } from 'react-native';
import { sectorStyles } from '../styles/portfolioStyles';
import { getSectorColor } from '../utils/sectorUtils';

interface SectorCardProps {
  sector: {
    sector: string;
    value: number;
    percentage: number;
  };
}

export const SectorCard: React.FC<SectorCardProps> = ({ sector }) => {
  return (
    <View style={sectorStyles.sectorCard}>
      <View style={sectorStyles.sectorHeader}>
        <View style={sectorStyles.sectorLeft}>
          <View
            style={[
              sectorStyles.sectorColorDot,
              { backgroundColor: getSectorColor(sector.sector) },
            ]}
          />
          <Text style={sectorStyles.sectorName}>{sector.sector}</Text>
        </View>
        <Text style={sectorStyles.sectorPercentage}>{formatPercent(sector.percentage)}</Text>
      </View>
      <View style={sectorStyles.sectorBarContainer}>
        <View
          style={[
            sectorStyles.sectorBar,
            {
              width: `${sector.percentage}%`,
              backgroundColor: getSectorColor(sector.sector),
            },
          ]}
        />
      </View>
      <Text style={sectorStyles.sectorValue}>{formatCurrency(sector.value)}</Text>
    </View>
  );
};

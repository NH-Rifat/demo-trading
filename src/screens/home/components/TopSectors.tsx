// ============================================
// TOP SECTORS COMPONENT
// Displays top invested sectors with horizontal progress bars
// Shows 8 sectors by default, expandable to 20
// Theme-aware with dynamic colors
// ============================================

import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { SectorData } from '../data/mockData';
import { createTopSectorsStyles } from '../styles/homeStyles';

interface TopSectorsProps {
  sectors: SectorData[];
  showAll: boolean;
  onToggleShowAll: () => void;
}

export const TopSectors: React.FC<TopSectorsProps> = ({ sectors, showAll, onToggleShowAll }) => {
  const { colors, fonts } = useTheme();
  const topSectorsStyles = createTopSectorsStyles(colors, fonts);

  const displayedSectors = sectors.slice(0, showAll ? sectors.length : 8);
  const maxDisplayedValue = Math.max(...displayedSectors.map((s) => s.value));

  return (
    <View style={topSectorsStyles.container}>
      <View style={topSectorsStyles.header}>
        <Text style={topSectorsStyles.title}>Top Invested Sectors</Text>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={topSectorsStyles.sectorsList}>
        {displayedSectors.map((sector, index) => {
          // Calculate bar width based on the highest value in the displayed list
          const barWidth = (sector.value / maxDisplayedValue) * 100;
          const displayValue =
            sector.value >= 10
              ? `${sector.value.toFixed(2)}cr`
              : sector.value >= 1
              ? `${sector.value.toFixed(1)}cr`
              : sector.value.toLocaleString();

          return (
            <Animated.View 
              key={sector.name} 
              style={topSectorsStyles.sectorRow}
              entering={FadeInLeft.duration(400).delay(index * 50).springify()}
            >
              <Text style={topSectorsStyles.sectorName}>{sector.name}</Text>
              <View style={topSectorsStyles.sectorBarContainer}>
                <View style={[topSectorsStyles.sectorBar, { width: `${barWidth}%`, backgroundColor: sector.color }]} />
              </View>
              <Text style={topSectorsStyles.sectorValue}>{displayValue}</Text>
            </Animated.View>
          );
        })}
      </View>

      {/* Show More / Show Less Button */}
      <TouchableOpacity style={topSectorsStyles.showMoreButton} onPress={onToggleShowAll}>
        <Text style={topSectorsStyles.showMoreText}>{showAll ? 'Show Less' : 'Show More'}</Text>
        <Ionicons name={showAll ? 'chevron-up' : 'chevron-down'} size={18} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

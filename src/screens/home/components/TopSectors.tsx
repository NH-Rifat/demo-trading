// ============================================
// TOP SECTORS COMPONENT
// Displays top invested sectors with horizontal progress bars
// Shows 8 sectors by default, expandable to 20
// ============================================

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SectorData } from '../data/mockData';
import { topSectorsStyles } from '../styles/homeStyles';

interface TopSectorsProps {
  sectors: SectorData[];
  showAll: boolean;
  onToggleShowAll: () => void;
}

export const TopSectors: React.FC<TopSectorsProps> = ({ sectors, showAll, onToggleShowAll }) => {
  const displayedSectors = sectors.slice(0, showAll ? sectors.length : 8);
  const maxDisplayedValue = Math.max(...displayedSectors.map((s) => s.value));

  return (
    <View style={topSectorsStyles.container}>
      <View style={topSectorsStyles.header}>
        <Text style={topSectorsStyles.title}>Top Invested Sectors</Text>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <View style={topSectorsStyles.sectorsList}>
        {displayedSectors.map((sector) => {
          // Calculate bar width based on the highest value in the displayed list
          const barWidth = (sector.value / maxDisplayedValue) * 100;
          const displayValue =
            sector.value >= 10
              ? `${sector.value.toFixed(2)}cr`
              : sector.value >= 1
              ? `${sector.value.toFixed(1)}cr`
              : sector.value.toLocaleString();

          return (
            <View key={sector.name} style={topSectorsStyles.sectorRow}>
              <Text style={topSectorsStyles.sectorName}>{sector.name}</Text>
              <View style={topSectorsStyles.sectorBarContainer}>
                <View style={[topSectorsStyles.sectorBar, { width: `${barWidth}%`, backgroundColor: sector.color }]} />
              </View>
              <Text style={topSectorsStyles.sectorValue}>{displayValue}</Text>
            </View>
          );
        })}
      </View>

      {/* Show More / Show Less Button */}
      <TouchableOpacity style={topSectorsStyles.showMoreButton} onPress={onToggleShowAll}>
        <Text style={topSectorsStyles.showMoreText}>{showAll ? 'Show Less' : 'Show More'}</Text>
        <Ionicons name={showAll ? 'chevron-up' : 'chevron-down'} size={18} color="#10b981" />
      </TouchableOpacity>
    </View>
  );
};

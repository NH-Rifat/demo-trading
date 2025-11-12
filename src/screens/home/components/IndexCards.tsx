// ============================================
// INDEX CARDS COMPONENT
// Displays DSEX, DS30, DSES index cards with mini charts
// Theme-aware with dynamic colors
// ============================================

import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import Svg, { Polyline } from 'react-native-svg';
import { createIndexCardStyles } from '../styles/homeStyles';
import { generateMiniChartPath } from '../utils/chartUtils';

interface IndexData {
  value: number;
  change: number;
  changePercent: number;
}

interface IndexCardsProps {
  indices: {
    dsex: IndexData;
    ds30: IndexData;
    dses: IndexData;
  };
}

export const IndexCards: React.FC<IndexCardsProps> = ({ indices }) => {
  const { colors, fonts } = useTheme();
  const indexCardStyles = createIndexCardStyles(colors, fonts);

  return (
    <View style={indexCardStyles.indicesRow}>
      {Object.entries(indices).map(([key, data], index) => {
        const isPositive = data.change >= 0;
        const changeColor = isPositive ? colors.success : colors.danger;
        
        return (
          <Animated.View 
            key={key} 
            style={indexCardStyles.indexCard}
            entering={FadeInRight.duration(400).delay(index * 100).springify()}
          >
            <Text style={indexCardStyles.indexSymbol}>{key.toUpperCase()}</Text>
            <Text style={indexCardStyles.indexValue}>{data.value.toFixed(2)}</Text>
            <Svg height="50" width="100%" style={indexCardStyles.miniChart}>
              <Polyline points={generateMiniChartPath()} fill="none" stroke={changeColor} strokeWidth="2" />
            </Svg>
            <Text style={[indexCardStyles.indexChange, { color: changeColor }]}>
              {isPositive ? '+' : ''}{data.change.toFixed(2)}
            </Text>
            <Text style={[indexCardStyles.indexChangePercent, { color: changeColor }]}>
              ({isPositive ? '+' : ''}{data.changePercent.toFixed(2)}%)
            </Text>
          </Animated.View>
        );
      })}
    </View>
  );
};

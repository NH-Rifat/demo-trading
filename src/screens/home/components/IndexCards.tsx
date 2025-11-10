// ============================================
// INDEX CARDS COMPONENT
// Displays DSEX, DS30, DSES index cards with mini charts
// ============================================

import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { indexCardStyles } from '../styles/homeStyles';
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
  return (
    <View style={indexCardStyles.indicesRow}>
      {Object.entries(indices).map(([key, data]) => (
        <View key={key} style={indexCardStyles.indexCard}>
          <Text style={indexCardStyles.indexSymbol}>{key.toUpperCase()}</Text>
          <Text style={indexCardStyles.indexValue}>{data.value.toFixed(2)}</Text>
          <Svg height="50" width="100%" style={indexCardStyles.miniChart}>
            <Polyline points={generateMiniChartPath()} fill="none" stroke="#ef4444" strokeWidth="2" />
          </Svg>
          <Text style={[indexCardStyles.indexChange, { color: '#ef4444' }]}>
            {data.change.toFixed(2)}
          </Text>
          <Text style={[indexCardStyles.indexChangePercent, { color: '#ef4444' }]}>
            ({data.changePercent.toFixed(2)}%)
          </Text>
        </View>
      ))}
    </View>
  );
};

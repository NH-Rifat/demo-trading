// ============================================
// ADVANCE DECLINE COMPONENT
// Chart showing market advance/decline distribution
// Theme-aware with dynamic colors
// ============================================

import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg';
import { AdvanceDeclineDistribution } from '../data/mockData';
import { createAdvanceDeclineStyles } from '../styles/homeStyles';

const { width } = Dimensions.get('window');

interface AdvanceDeclineProps {
  advanceDecline: {
    neg: number;
    nc: number;
    pos: number;
    distribution: AdvanceDeclineDistribution[];
  };
}

export const AdvanceDecline: React.FC<AdvanceDeclineProps> = ({ advanceDecline }) => {
  const { colors, fonts } = useTheme();
  const advanceDeclineStyles = createAdvanceDeclineStyles(colors, fonts);

  return (
    <View style={advanceDeclineStyles.container}>
      <Text style={advanceDeclineStyles.title}>Advance Decline</Text>
      <Svg height="250" width={width - 32}>
        {advanceDecline.distribution.map((item, index) => {
          const barWidth = 25;
          const spacing = (width - 32) / 10;
          const x = index * spacing + (spacing - barWidth) / 2;
          const total = item.neg + item.nc + item.pos;
          const scale = total > 0 ? Math.min((total / 150) * 180, 180) : 0;
          const negHeight = (item.neg / (total || 1)) * scale;
          const ncHeight = (item.nc / (total || 1)) * scale;
          const posHeight = (item.pos / (total || 1)) * scale;

          return (
            <React.Fragment key={index}>
              <Rect x={x} y={150 - negHeight} width={barWidth} height={negHeight} fill="#ea6565ff" />
              <Rect
                x={x}
                y={150 - negHeight - ncHeight}
                width={barWidth}
                height={ncHeight}
                fill="#7b7f87ff"
              />
              <Rect
                x={x}
                y={150 - negHeight - ncHeight - posHeight}
                width={barWidth}
                height={posHeight}
                fill="#7dc4acff"
              />
              {item.neg > 0 && (
                <SvgText x={x + barWidth / 2} y={150 - negHeight / 2} fontSize="10" fill="#fff" textAnchor="middle">
                  {item.neg}
                </SvgText>
              )}
              {item.nc > 0 && (
                <SvgText
                  x={x + barWidth / 2}
                  y={150 - negHeight - ncHeight / 2}
                  fontSize="10"
                  fill="#fff"
                  textAnchor="middle"
                >
                  {item.nc}
                </SvgText>
              )}
              {item.pos > 0 && (
                <SvgText
                  x={x + barWidth / 2}
                  y={150 - negHeight - ncHeight - posHeight / 2}
                  fontSize="10"
                  fill="#fff"
                  textAnchor="middle"
                >
                  {item.pos}
                </SvgText>
              )}
              <SvgText x={x + barWidth / 2} y={170} fontSize="9" fill={colors.textSecondary} textAnchor="middle">
                {item.range}
              </SvgText>
            </React.Fragment>
          );
        })}
        <Line x1="0" y1="150" x2={width - 32} y2="150" stroke={colors.border} strokeWidth="1" />
      </Svg>
      <View style={advanceDeclineStyles.legend}>
        <View style={advanceDeclineStyles.legendItem}>
          <View style={[advanceDeclineStyles.legendDot, { backgroundColor: '#ea6565ff' }]} />
          <Text style={advanceDeclineStyles.legendText}>NEG: {advanceDecline.neg}</Text>
        </View>
        <View style={advanceDeclineStyles.legendItem}>
          <View style={[advanceDeclineStyles.legendDot, { backgroundColor: '#7b7f87ff' }]} />
          <Text style={advanceDeclineStyles.legendText}>NC: {advanceDecline.nc}</Text>
        </View>
        <View style={advanceDeclineStyles.legendItem}>
          <View style={[advanceDeclineStyles.legendDot, { backgroundColor: '#7dc4acff' }]} />
          <Text style={advanceDeclineStyles.legendText}>POS: {advanceDecline.pos}</Text>
        </View>
      </View>
    </View>
  );
};

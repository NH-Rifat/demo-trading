import CandlestickChart from '@/components/charts/CandlestickChart';
import VolumeChart from '@/components/charts/VolumeChart';
import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { View } from 'react-native';
import { createChartStyles } from '../styles/stockDetailStyles';

interface ChartsProps {
  candleData: any[];
  volumeData: any[];
}

export const Charts: React.FC<ChartsProps> = ({ candleData, volumeData }) => {
  const { colors } = useTheme();
  const styles = createChartStyles(colors);
  
  return (
    <>
      <View style={styles.chartSection}>
        <CandlestickChart data={candleData} height={280} />
      </View>

      <View style={styles.chartSection}>
        <VolumeChart data={volumeData} height={180} />
      </View>
    </>
  );
};

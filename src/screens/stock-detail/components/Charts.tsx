import CandlestickChart from '@/components/charts/CandlestickChart';
import VolumeChart from '@/components/charts/VolumeChart';
import React from 'react';
import { View } from 'react-native';
import { chartStyles } from '../styles/stockDetailStyles';

interface ChartsProps {
  candleData: any[];
  volumeData: any[];
}

export const Charts: React.FC<ChartsProps> = ({ candleData, volumeData }) => {
  return (
    <>
      <View style={chartStyles.chartSection}>
        <CandlestickChart data={candleData} height={280} />
      </View>

      <View style={chartStyles.chartSection}>
        <VolumeChart data={volumeData} height={180} />
      </View>
    </>
  );
};

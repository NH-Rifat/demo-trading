import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { createTimeRangeStyles } from '../styles/stockDetailStyles';

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';

interface TimeRangeSelectorProps {
  selectedRange: TimeRange;
  onSelectRange: (range: TimeRange) => void;
}

const TIME_RANGES: TimeRange[] = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selectedRange,
  onSelectRange,
}) => {
  const { colors } = useTheme();
  const styles = createTimeRangeStyles(colors);
  
  return (
    <View style={styles.timeRangeSection}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.timeRangeScroll}
      >
        {TIME_RANGES.map((range) => (
          <TouchableOpacity
            key={range}
            style={[
              styles.timeRangeButton,
              selectedRange === range && styles.timeRangeButtonActive,
            ]}
            onPress={() => onSelectRange(range)}
          >
            <Text
              style={[
                styles.timeRangeText,
                selectedRange === range && styles.timeRangeTextActive,
              ]}
            >
              {range}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

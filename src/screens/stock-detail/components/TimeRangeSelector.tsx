import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { timeRangeStyles } from '../styles/stockDetailStyles';

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
  return (
    <View style={timeRangeStyles.timeRangeSection}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={timeRangeStyles.timeRangeScroll}
      >
        {TIME_RANGES.map((range) => (
          <TouchableOpacity
            key={range}
            style={[
              timeRangeStyles.timeRangeButton,
              selectedRange === range && timeRangeStyles.timeRangeButtonActive,
            ]}
            onPress={() => onSelectRange(range)}
          >
            <Text
              style={[
                timeRangeStyles.timeRangeText,
                selectedRange === range && timeRangeStyles.timeRangeTextActive,
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

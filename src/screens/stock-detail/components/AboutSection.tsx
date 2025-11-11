import { useTheme } from '@/src/contexts/ThemeContext';
import { formatCurrency } from '@/src/utils/helpers';
import React from 'react';
import { Text, View } from 'react-native';
import { createCompanyInfoStyles, createStatsStyles } from '../styles/stockDetailStyles';

interface AboutSectionProps {
  name: string;
  symbol: string;
  sector: string;
  price: number;
  marketCap: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  name,
  symbol,
  sector,
  price,
  marketCap,
}) => {
  const { colors } = useTheme();
  const statsStyles = createStatsStyles(colors);
  const infoStyles = createCompanyInfoStyles(colors);
  
  return (
    <View style={statsStyles.section}>
      <Text style={statsStyles.sectionTitle}>About {name}</Text>
      <Text style={infoStyles.aboutText}>
        {name} ({symbol}) is a leading company in the {sector} sector. The stock is currently
        trading at {formatCurrency(price)} with a market capitalization of {marketCap}.
      </Text>
    </View>
  );
};

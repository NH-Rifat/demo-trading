import { formatCurrency } from '@/src/utils/helpers';
import React from 'react';
import { Text, View } from 'react-native';
import { companyInfoStyles, statsStyles } from '../styles/stockDetailStyles';

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
  return (
    <View style={statsStyles.section}>
      <Text style={statsStyles.sectionTitle}>About {name}</Text>
      <Text style={companyInfoStyles.aboutText}>
        {name} ({symbol}) is a leading company in the {sector} sector. The stock is currently
        trading at {formatCurrency(price)} with a market capitalization of {marketCap}.
      </Text>
    </View>
  );
};

import { useTheme } from '@/src/contexts/ThemeContext';
import React from 'react';
import { Text, View } from 'react-native';
import { createCompanyInfoStyles, createStatsStyles } from '../styles/stockDetailStyles';

interface CompanyInformationProps {
  sector: string;
  marketCap: string;
  peRatio: string;
  dayRange: string;
}

export const CompanyInformation: React.FC<CompanyInformationProps> = ({
  sector,
  marketCap,
  peRatio,
  dayRange,
}) => {
  const { colors, fonts } = useTheme();
  const statsStyles = createStatsStyles(colors, fonts);
  const infoStyles = createCompanyInfoStyles(colors, fonts);
  
  return (
    <View style={statsStyles.section}>
      <Text style={statsStyles.sectionTitle}>Company Information</Text>
      <View style={infoStyles.infoCard}>
        <View style={infoStyles.infoRow}>
          <Text style={infoStyles.infoLabel}>Sector</Text>
          <Text style={infoStyles.infoValue}>{sector}</Text>
        </View>
        <View style={infoStyles.divider} />
        <View style={infoStyles.infoRow}>
          <Text style={infoStyles.infoLabel}>Market Cap</Text>
          <Text style={infoStyles.infoValue}>{marketCap}</Text>
        </View>
        <View style={infoStyles.divider} />
        <View style={infoStyles.infoRow}>
          <Text style={infoStyles.infoLabel}>P/E Ratio</Text>
          <Text style={infoStyles.infoValue}>{peRatio}</Text>
        </View>
        <View style={infoStyles.divider} />
        <View style={infoStyles.infoRow}>
          <Text style={infoStyles.infoLabel}>Day Range</Text>
          <Text style={infoStyles.infoValue}>{dayRange}</Text>
        </View>
      </View>
    </View>
  );
};

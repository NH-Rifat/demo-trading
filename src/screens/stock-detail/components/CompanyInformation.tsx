import React from 'react';
import { Text, View } from 'react-native';
import { companyInfoStyles, statsStyles } from '../styles/stockDetailStyles';

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
  return (
    <View style={statsStyles.section}>
      <Text style={statsStyles.sectionTitle}>Company Information</Text>
      <View style={companyInfoStyles.infoCard}>
        <View style={companyInfoStyles.infoRow}>
          <Text style={companyInfoStyles.infoLabel}>Sector</Text>
          <Text style={companyInfoStyles.infoValue}>{sector}</Text>
        </View>
        <View style={companyInfoStyles.divider} />
        <View style={companyInfoStyles.infoRow}>
          <Text style={companyInfoStyles.infoLabel}>Market Cap</Text>
          <Text style={companyInfoStyles.infoValue}>{marketCap}</Text>
        </View>
        <View style={companyInfoStyles.divider} />
        <View style={companyInfoStyles.infoRow}>
          <Text style={companyInfoStyles.infoLabel}>P/E Ratio</Text>
          <Text style={companyInfoStyles.infoValue}>{peRatio}</Text>
        </View>
        <View style={companyInfoStyles.divider} />
        <View style={companyInfoStyles.infoRow}>
          <Text style={companyInfoStyles.infoLabel}>Day Range</Text>
          <Text style={companyInfoStyles.infoValue}>{dayRange}</Text>
        </View>
      </View>
    </View>
  );
};

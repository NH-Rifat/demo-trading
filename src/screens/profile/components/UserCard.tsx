import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { createUserCardStyles } from '../styles/profileStyles';

interface UserCardProps {
  user: {
    name?: string;
    email?: string;
    accountNumber?: string;
  } | null;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { colors, fonts } = useTheme();
  const userCardStyles = createUserCardStyles(colors, fonts);

  return (
    <View style={userCardStyles.userCard}>
      <View style={userCardStyles.avatarContainer}>
        <View style={userCardStyles.avatar}>
          <Ionicons name="person" size={40} color="#ffffff" />
        </View>
      </View>
      <Text style={userCardStyles.userName}>{user?.name || 'Guest User'}</Text>
      <Text style={userCardStyles.userEmail}>{user?.email || 'guest@example.com'}</Text>
      <View style={userCardStyles.accountNumberContainer}>
        <Ionicons name="card-outline" size={14} color={colors.textSecondary} />
        <Text style={userCardStyles.accountNumber}>
          Account: {user?.accountNumber || 'XXXX-XXXX-XXXX'}
        </Text>
      </View>
    </View>
  );
};

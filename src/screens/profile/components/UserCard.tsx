import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { userCardStyles } from '../styles/profileStyles';

interface UserCardProps {
  user: {
    name?: string;
    email?: string;
    accountNumber?: string;
  } | null;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
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
        <Ionicons name="card-outline" size={14} color="#6b7280" />
        <Text style={userCardStyles.accountNumber}>
          Account: {user?.accountNumber || 'XXXX-XXXX-XXXX'}
        </Text>
      </View>
    </View>
  );
};

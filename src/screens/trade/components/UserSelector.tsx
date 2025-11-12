import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { createUserSelectorStyles } from '../styles/tradeStyles';

interface User {
  id: string;
  code: string;
  name: string;
}

interface UserSelectorProps {
  selectedUser: User;
  onSelectUser: (user: User) => void;
}

// Mock users data
const USERS: User[] = [
  { id: '1', code: '81140', name: 'YEASIN HOSSAIN' },
  { id: '2', code: '1234', name: 'HASAN' },
  { id: '3', code: '5678', name: 'RIFAT' },
  { id: '4', code: '9012', name: 'AHMED' },
];

export const UserSelector: React.FC<UserSelectorProps> = ({
  selectedUser,
  onSelectUser,
}) => {
  const { colors, fonts } = useTheme();
  const styles = createUserSelectorStyles(colors, fonts);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelectUser = (user: User) => {
    onSelectUser(user);
    setIsModalVisible(false);
  };

  return (
    <>
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.userSelector}
          onPress={() => setIsModalVisible(true)}
          activeOpacity={0.7}
        >
          <View style={styles.userInfo}>
            <Text style={styles.userCode}>{selectedUser.code}/{selectedUser.name}</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Animated.View style={styles.modalOverlay} entering={FadeIn.duration(200)}>
          <Animated.View
            style={[styles.modalContent, { backgroundColor: colors.surface }]}
            entering={SlideInDown.duration(400).springify()}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Select User
              </Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={USERS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.userItem,
                    {
                      backgroundColor: colors.surfaceSecondary,
                      borderColor: selectedUser.id === item.id ? colors.primary : 'transparent',
                    },
                  ]}
                  onPress={() => handleSelectUser(item)}
                  activeOpacity={0.7}
                >
                  <View>
                    <Text style={[styles.userItemCode, { color: colors.text }]}>
                      {item.code}
                    </Text>
                    <Text style={[styles.userItemName, { color: colors.textSecondary }]}>
                      {item.name}
                    </Text>
                  </View>
                  {selectedUser.id === item.id && (
                    <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        </Animated.View>
      </Modal>
    </>
  );
};

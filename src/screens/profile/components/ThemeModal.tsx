import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { createThemeModalStyles } from '../styles/profileStyles';

interface ThemeModalProps {
  visible: boolean;
  themeMode: 'light' | 'dark' | 'system';
  onClose: () => void;
  onSelectTheme: (mode: 'light' | 'dark' | 'system') => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  visible,
  themeMode,
  onClose,
  onSelectTheme,
}) => {
  const { colors } = useTheme();
  const themeModalStyles = createThemeModalStyles(colors);

  const themeOptions = [
    {
      mode: 'light' as const,
      icon: 'sunny',
      iconColor: colors.warning,
      title: 'Light',
      description: 'Always use light theme',
    },
    {
      mode: 'dark' as const,
      icon: 'moon',
      iconColor: colors.info,
      title: 'Dark',
      description: 'Always use dark theme',
    },
    {
      mode: 'system' as const,
      icon: 'phone-portrait',
      iconColor: colors.textSecondary,
      title: 'System',
      description: 'Use device theme settings',
    },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={themeModalStyles.modalOverlay}>
        <View style={[themeModalStyles.themeModalContent, { backgroundColor: colors.surface }]}>
          <View style={themeModalStyles.themeModalHeader}>
            <Text style={[themeModalStyles.themeModalTitle, { color: colors.text }]}>
              Select Theme
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {themeOptions.map((option) => (
            <TouchableOpacity
              key={option.mode}
              style={[
                themeModalStyles.themeOption,
                {
                  backgroundColor: colors.surfaceSecondary,
                  borderColor: themeMode === option.mode ? colors.success : 'transparent',
                },
              ]}
              onPress={() => {
                onSelectTheme(option.mode);
                onClose();
              }}
            >
              <Ionicons name={option.icon as any} size={24} color={option.iconColor} />
              <View style={themeModalStyles.themeOptionText}>
                <Text style={[themeModalStyles.themeOptionTitle, { color: colors.text }]}>
                  {option.title}
                </Text>
                <Text style={[themeModalStyles.themeOptionDescription, { color: colors.textSecondary }]}>
                  {option.description}
                </Text>
              </View>
              {themeMode === option.mode && (
                <Ionicons name="checkmark-circle" size={24} color={colors.success} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

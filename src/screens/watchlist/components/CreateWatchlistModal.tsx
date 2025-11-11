import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { createModalStyles } from '../styles/watchlistStyles';

interface CreateWatchlistModalProps {
  visible: boolean;
  watchlistName: string;
  onChangeName: (name: string) => void;
  onCreate: () => void;
  onClose: () => void;
}

export const CreateWatchlistModal: React.FC<CreateWatchlistModalProps> = ({
  visible,
  watchlistName,
  onChangeName,
  onCreate,
  onClose,
}) => {
  const { colors } = useTheme();
  const styles = createModalStyles(colors);
  
  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <Animated.View style={styles.modalOverlay} entering={FadeIn.duration(200)}>
        <Animated.View style={styles.modalContent} entering={SlideInDown.duration(400).springify()}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create Watchlist</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Watchlist name"
            placeholderTextColor={colors.textTertiary}
            value={watchlistName}
            onChangeText={onChangeName}
            autoFocus
            maxLength={50}
          />

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonCancel]}
              onPress={onClose}
            >
              <Text style={styles.modalButtonTextCancel}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.modalButtonCreate,
                !watchlistName.trim() && styles.modalButtonDisabled,
              ]}
              onPress={onCreate}
              disabled={!watchlistName.trim()}
            >
              <Text style={styles.modalButtonTextCreate}>Create</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

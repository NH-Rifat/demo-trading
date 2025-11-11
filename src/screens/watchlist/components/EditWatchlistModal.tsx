import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createModalStyles } from '../styles/watchlistStyles';

interface EditWatchlistModalProps {
  visible: boolean;
  watchlistName: string;
  onChangeName: (name: string) => void;
  onSave: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export const EditWatchlistModal: React.FC<EditWatchlistModalProps> = ({
  visible,
  watchlistName,
  onChangeName,
  onSave,
  onDelete,
  onClose,
}) => {
  const { colors } = useTheme();
  const styles = createModalStyles(colors);
  
  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Watchlist</Text>
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
              style={[styles.modalButton, styles.modalButtonDelete]}
              onPress={onDelete}
            >
              <Text style={styles.modalButtonTextDelete}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.modalButtonCreate,
                !watchlistName.trim() && styles.modalButtonDisabled,
              ]}
              onPress={onSave}
              disabled={!watchlistName.trim()}
            >
              <Text style={styles.modalButtonTextCreate}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

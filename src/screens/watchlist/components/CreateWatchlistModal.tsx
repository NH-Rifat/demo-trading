import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { modalStyles } from '../styles/watchlistStyles';

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
  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContent}>
          <View style={modalStyles.modalHeader}>
            <Text style={modalStyles.modalTitle}>Create Watchlist</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={modalStyles.input}
            placeholder="Watchlist name"
            value={watchlistName}
            onChangeText={onChangeName}
            autoFocus
            maxLength={50}
          />

          <View style={modalStyles.modalActions}>
            <TouchableOpacity
              style={[modalStyles.modalButton, modalStyles.modalButtonCancel]}
              onPress={onClose}
            >
              <Text style={modalStyles.modalButtonTextCancel}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                modalStyles.modalButton,
                modalStyles.modalButtonCreate,
                !watchlistName.trim() && modalStyles.modalButtonDisabled,
              ]}
              onPress={onCreate}
              disabled={!watchlistName.trim()}
            >
              <Text style={modalStyles.modalButtonTextCreate}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

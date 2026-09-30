import { useContext, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SkillSelector from '../../components/SkillSelector';
import { PlayerContext } from '../../context/PlayerContext';
import styles from './styles';

export default function EditPlayerScreen({ route, navigation }) {
  const { player } = route.params;
  const { updatePlayer, removePlayer } = useContext(PlayerContext);
  const insets = useSafeAreaInsets();
  
  const [name, setName] = useState(player.name);
  const [level, setLevel] = useState(player.level);

  const handleUpdate = () => {
    if (name.trim() === '') {
      Alert.alert('Erro', 'O nome do jogador não pode estar vazio.');
      return;
    }
    updatePlayer(player.id, name.trim(), level);
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      'Excluir Jogador',
      `Tem certeza que deseja remover ${player.name} da lista?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => {
            removePlayer(player.id);
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.container, { paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome do Jogador</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ex: Thalles"
          />
        </View>

        <SkillSelector selectedValue={level} onSelect={setLevel} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.saveButton, name.trim() === '' && styles.saveButtonDisabled]}
            onPress={handleUpdate}
            disabled={name.trim() === ''}
          >
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Excluir Jogador</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
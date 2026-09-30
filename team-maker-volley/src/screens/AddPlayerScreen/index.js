import { useContext, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SkillSelector from '../../components/SkillSelector';
import { PlayerContext } from '../../context/PlayerContext';
import styles from './styles';

export default function AddPlayerScreen({ navigation }) {
  const { addPlayer } = useContext(PlayerContext);
  const insets = useSafeAreaInsets(); 
  
  const [name, setName] = useState('');
  const [level, setLevel] = useState(3);

  const handleSave = () => {
    if (name.trim() === '') {
      Alert.alert('Erro', 'O nome do jogador não pode estar vazio.');
      return;
    }

    addPlayer(name.trim(), level);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.container, { paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome do Jogador</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nome"
            autoFocus
          />
        </View>

        <SkillSelector selectedValue={level} onSelect={setLevel} />

        <TouchableOpacity 
          style={[styles.saveButton, name.trim() === '' && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={name.trim() === ''}
        >
          <Text style={styles.saveButtonText}>Guardar Jogador</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
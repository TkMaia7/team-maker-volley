import { useContext, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PlayerContext } from '../../context/PlayerContext';
import { SKILL_LEVELS } from '../../utils/constants';
import styles from './styles';

export default function HomeScreen({ navigation }) {
  const { players } = useContext(PlayerContext);
  const insets = useSafeAreaInsets();
  
  // Valores padrão: 2 equipes, 6 jogadores
  const [numTeams, setNumTeams] = useState('2');
  const [playersPerTeam, setPlayersPerTeam] = useState('6');

  // Função auxiliar para converter o valor numérico (1 a 6) no nome do nível (ex: "Craque")
  const getLevelLabel = (levelValue) => {
    const skill = SKILL_LEVELS.find(s => s.value === levelValue);
    return skill ? skill.label : '';
  };

  const handleSort = () => {
    // Validação básica antes de avançar
    const teamsCount = parseInt(numTeams, 10);
    const playersCount = parseInt(playersPerTeam, 10);

    if (isNaN(teamsCount) || isNaN(playersCount) || teamsCount <= 0 || playersCount <= 0) {
      alert("Por favor, insere valores válidos para o sorteio.");
      return;
    }

    navigation.navigate('TeamsResult', {
      numTeams: teamsCount,
      playersPerTeam: playersCount
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 24 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Jogadores ({players.length})</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddPlayer')}
        >
          <Text style={styles.addButtonText}>+ Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={players}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Sem jogadores registados para a pelada.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.playerRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('EditPlayer', { player: item })}
          >
            <Text style={styles.playerName}>{item.name}</Text>
            <Text style={styles.playerLevel}>{getLevelLabel(item.level)}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.configSection}>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Nº de Equipes:</Text>
          <TextInput 
            style={styles.configInput}
            keyboardType="numeric"
            value={numTeams}
            onChangeText={setNumTeams}
            maxLength={2}
          />
        </View>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Jogadores por Equipe:</Text>
          <TextInput 
            style={styles.configInput}
            keyboardType="numeric"
            value={playersPerTeam}
            onChangeText={setPlayersPerTeam}
            maxLength={2}
          />
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.sortButton, players.length === 0 && styles.sortButtonDisabled]} 
        onPress={handleSort}
        disabled={players.length === 0}
      >
        <Text style={styles.sortButtonText}>Sortear Equipes</Text>
      </TouchableOpacity>
    </View>
  );
}
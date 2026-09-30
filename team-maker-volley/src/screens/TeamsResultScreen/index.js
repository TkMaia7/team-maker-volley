import * as Clipboard from 'expo-clipboard';
import { useContext, useMemo } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PlayerContext } from '../../context/PlayerContext';
import { SKILL_LEVELS } from '../../utils/constants';
import { generateBalancedTeams } from '../../utils/sortingAlgorithm';
import styles from './styles';

export default function TeamsResultScreen({ route }) {
  const { players } = useContext(PlayerContext);
  const { numTeams, playersPerTeam } = route.params;
  const insets = useSafeAreaInsets();

  const { teams, waitlist } = useMemo(() => {
    return generateBalancedTeams(players, numTeams, playersPerTeam);
  }, [players, numTeams, playersPerTeam]);

  const getLevelLabel = (levelValue) => {
    const skill = SKILL_LEVELS.find(s => s.value === levelValue);
    return skill ? skill.label : '';
  };

  const handleCopy = async () => {
    let textToCopy = '';

    teams.forEach((team, index) => {
      textToCopy += `Time ${index + 1}:\n\n`;
      team.players.forEach(player => {
        textToCopy += `${player.name}\n`;
      });
      textToCopy += '\n';
    });

    if (waitlist.length > 0) {
      textToCopy += 'Fila de Espera:\n\n';
      waitlist.forEach(player => {
        textToCopy += `${player.name}\n`;
      });
    }

    await Clipboard.setStringAsync(textToCopy.trim());
    Alert.alert('Copiado!', 'Lista copiada para a área de transferência.');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}>
        
        {teams.length === 0 && (
          <Text style={styles.emptyText}>Não há jogadores suficientes para sortear.</Text>
        )}

        {teams.map((team) => (
          <View key={team.id} style={styles.teamCard}>
            <View style={styles.teamHeader}>
              <Text style={styles.teamName}>{team.name}</Text>
              <Text style={styles.teamSkill}>Nível Total: {team.totalSkill}</Text>
            </View>
            
            {team.players.map((player) => (
              <View key={player.id} style={styles.playerRow}>
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.playerLevel}>{getLevelLabel(player.level)}</Text>
              </View>
            ))}

            {team.players.length === 0 && (
              <Text style={styles.emptyText}>Sem jogadores</Text>
            )}
          </View>
        ))}

        {waitlist.length > 0 && (
          <View style={styles.waitlistCard}>
            <Text style={styles.waitlistTitle}>Fila de Espera</Text>
            {waitlist.map((player) => (
              <View key={player.id} style={styles.playerRow}>
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.playerLevel}>{getLevelLabel(player.level)}</Text>
              </View>
            ))}
          </View>
        )}

        {teams.length > 0 && (
          <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
            <Text style={styles.copyButtonText}>Copiar Lista</Text>
          </TouchableOpacity>
        )}

      </ScrollView>
    </View>
  );
}
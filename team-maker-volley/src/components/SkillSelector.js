import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SKILL_LEVELS } from '../utils/constants';

export default function SkillSelector({ selectedValue, onSelect }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nível</Text>
      <View style={styles.pillContainer}>
        {SKILL_LEVELS.map((skill) => {
          const isSelected = selectedValue === skill.value;
          return (
            <TouchableOpacity
              key={skill.id}
              activeOpacity={0.7}
              onPress={() => onSelect(skill.value)}
              style={[
                styles.pill,
                { 
                  borderColor: isSelected ? skill.color : '#E2E8F0',
                  backgroundColor: isSelected ? skill.color : '#FFFFFF' 
                }
              ]}
            >
              <Text 
                style={[
                  styles.pillText, 
                  { color: isSelected ? '#FFFFFF' : '#1A202C' }
                ]}
              >
                {skill.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 12,
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillText: {
    fontSize: 14,
    fontWeight: '500',
  }
});
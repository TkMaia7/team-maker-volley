import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PlayerProvider } from './src/context/PlayerContext';
import colors from './src/styles/colors';

import AddPlayerScreen from './src/screens/AddPlayerScreen';
import EditPlayerScreen from './src/screens/EditPlayerScreen';
import HomeScreen from './src/screens/HomeScreen';
import TeamsResultScreen from './src/screens/TeamsResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider> 
      <PlayerProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: colors.primary },
              headerTintColor: colors.surface,
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: 'Team Maker Volley' }} 
            />
            <Stack.Screen 
              name="AddPlayer" 
              component={AddPlayerScreen} 
              options={{ title: 'Novo Jogador' }} 
            />
            <Stack.Screen 
              name="TeamsResult" 
              component={TeamsResultScreen} 
              options={{ title: 'Times Sorteados' }} 
            />
            <Stack.Screen 
              name="EditPlayer" 
              component={EditPlayerScreen} 
              options={{ title: 'Editar Jogador' }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PlayerProvider>
    </SafeAreaProvider>
  );
}
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';
import uuid from 'react-native-uuid';

export const PlayerContext = createContext();

const STORAGE_KEY = '@volley_players';

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      const storedPlayers = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedPlayers) {
        setPlayers(JSON.parse(storedPlayers));
      }
    } catch (error) {
      console.error('Erro ao carregar jogadores:', error);
    } finally {
      setLoading(false);
    }
  };

  const addPlayer = async (name, level) => {
    try {
      const newPlayer = { id: uuid.v4(), name, level };
      const updatedPlayers = [...players, newPlayer];
      setPlayers(updatedPlayers);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlayers));
    } catch (error) {
      console.error('Erro ao adicionar jogador:', error);
    }
  };

  const removePlayer = async (id) => {
    try {
      const updatedPlayers = players.filter(player => player.id !== id);
      setPlayers(updatedPlayers);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlayers));
    } catch (error) {
      console.error('Erro ao remover jogador:', error);
    }
  };

  const updatePlayer = async (id, name, level) => {
    try {
      const updatedPlayers = players.map(player => 
        player.id === id ? { ...player, name, level } : player
      );
      setPlayers(updatedPlayers);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlayers));
    } catch (error) {
      console.error('Erro ao atualizar jogador:', error);
    }
  };

  return (
    <PlayerContext.Provider value={{ players, loading, addPlayer, removePlayer, updatePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};
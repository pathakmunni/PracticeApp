import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { switchProfile, removeProfile } from '../store/slices/profileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }: any) {
  const dispatch = useDispatch();

  const profiles = useSelector((state: RootState) => state.profile.profiles);
  const activeProfile = useSelector(
    (state: RootState) => state.profile.activeProfile
  );

  const selectProfile = async (profile: any) => {
    dispatch(switchProfile(profile.id));
    navigation.goBack();
  };

  const deleteProfile = async (id: string) => {
    Alert.alert('Delete Profile', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          const updated = profiles.filter(p => p.id !== id);

          dispatch(removeProfile(id));

          await AsyncStorage.setItem('profiles', JSON.stringify(updated));
        },
      },
    ]);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.profileCard}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => selectProfile(item)}
      >
        <Text style={styles.name}>
          {item.name} {activeProfile?.id === item.id ? '✓' : ''}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => deleteProfile(item.id)}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profiles</Text>

      <FlatList
        data={profiles}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

      {profiles.length < 5 && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('ChooseLanguage')}
        >
          <Text style={styles.addText}>+ Add Profile</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },

  profileCard: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#eee',
    marginBottom: 10,
    alignItems: 'center',
  },

  name: {
    fontSize: 18,
  },

  delete: {
    color: 'red',
    fontWeight: '600',
  },

  addButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#1C0770',
    borderRadius: 10,
  },

  addText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
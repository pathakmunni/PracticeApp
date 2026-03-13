import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { switchProfile } from '../../store/slices/profileSlice';
import { useNavigation } from '@react-navigation/native';

export default function ProfileSelectScreen() {
  const profiles = useSelector((state: RootState) => state.profile.profiles);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const handleSelectProfile = (id: string) => {
    dispatch(switchProfile(id));
    navigation.replace('Dashboard');
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.profileCard}
      onPress={() => handleSelectProfile(item.id)}
    >
      <Text style={styles.profileName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Profile</Text>

      <FlatList
        data={profiles}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ChooseLanguage')}
      >
        <Text style={styles.addText}>+ Add Profile</Text>
      </TouchableOpacity>
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
    fontWeight: 'bold',
    marginBottom: 20,
  },

  profileCard: {
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 15,
  },

  profileName: {
    fontSize: 18,
  },

  addButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#2E0F7D',
    borderRadius: 10,
  },

  addText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

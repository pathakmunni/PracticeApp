import React, { useEffect } from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadContent } from '../store/slices/contentSlice';
import { RootState } from '../store/store';
import UnitCard from '../components/UnitCard';

export default function HomeScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.content.data);

  const activeProfile = useSelector(
    (state: RootState) => state.profile.activeProfile,
  );
  useEffect(() => {
    dispatch(loadContent() as any);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.profileText}>
          Hello, {activeProfile?.name || 'User'} 👋
        </Text>

        <Image
          source={require('../assets/images/home.png')}
          style={{
            width: '80%',
            height: 300,
          }}
        />
      </View>

      <FlatList
        data={content?.units ?? []}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <UnitCard
            unit={item}
            onPress={() => navigation.navigate('Section', { unit: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#1C0770',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    alignItems: 'center',
  },
  profileText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    alignSelf: 'stretch',
    paddingHorizontal: 20,
  },
});

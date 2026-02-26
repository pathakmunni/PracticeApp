import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const SectionsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { unitId } = route.params;

  console.log('SectionsScreen - unitId:', unitId);

  const unit = useSelector((state: RootState) =>
    state.home.units.find(u => (u.id || u.unit_id) === unitId),
  );

  console.log('SectionsScreen - unit:', unit);

  if (!unit) {
    return (
      <View style={styles.center}>
        <Text>Unit not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{unit.title}</Text>

      <FlatList
        data={unit.sections}
        keyExtractor={item => String(item.id || item.section_id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            // onPress={() =>
            //   navigation.navigate('Question', {
            //     unitId,
            //     sectionId: item.id || item.section_id,
            //     topicId: item.id || item.topic_id,
            //   })
            // }

            onPress={() =>
              navigation.navigate('Topics', {
                unit,
                unitId,
                sectionId:
                  item.id || item.section_id,
                topics: item.topics || [],
              })
            }
          >
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <Text>{item.topics?.length || 0} Topics</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SectionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


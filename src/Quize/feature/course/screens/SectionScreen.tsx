import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import SectionCard from '../components/SectionCard';
import Header from '../../../components/Header';

export default function SectionScreen({ route, navigation }: any) {
  const { unit } = route.params;
  console.log('unit---------', unit);

  return (
    <View style={{ flex: 1 }}>
      <Header
        unit={unit}
        title={unit.title}
        onBack={() => navigation.goBack()}
      />
      {unit.sections && unit.sections.length > 0 ? (
        <FlatList
          data={unit.sections ?? []}
          keyExtractor={item => item.sectionId}
          renderItem={({ item,index }) => (
            <SectionCard
              section={{ ...item, index: index + 1 }}
              onPress={() =>
                navigation.navigate('Learning', {
                  section: item,
                })
              }
            />
          )}
        />
      ) : (
        <Text style={{ padding: 20, alignSelf: 'center', fontSize: 16 }}>
          No sections available for this unit.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function SectionScreen({ route, navigation }: any) {
  const { unit } = route.params;

  console.log('Received unit:', unit); // Debug log to check the received unit

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={unit.sections}
        keyExtractor={(item) => item.sectionId}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Question', {
                unitQuize: unit.quiz,
                slides: item.slides,
                title: item.title,
              })
            }>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
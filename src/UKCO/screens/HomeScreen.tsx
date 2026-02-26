import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadContent } from '../store/slices/contentSlice';

export default function HomeScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const units = useSelector((state: any) => state.content.units);

  useEffect(() => {
    dispatch(loadContent() as any);
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={units}
        keyExtractor={(item: any) => item.unitId}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Section', { unit: item })
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
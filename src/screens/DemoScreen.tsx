// src/screens/DemoScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import useDemo from '../hooks/useDemo';
import { useTypedSelector } from '../store/store';

const DemoScreen: React.FC = () => {
  const { items, loadItems, selectItem } = useDemo();
  const selected = useTypedSelector(state => state.demo.selectedItem);

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Demo Items</Text>

      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => selectItem(item)}>
            <Text numberOfLines={1}>{item.title}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No items to show</Text>}
      />

      {selected && (
        <View style={styles.selected}>
          <Text style={{ fontWeight: '600' }}>Selected:</Text>
          <Text>{selected.title}</Text>
        </View>
      )}
    </View>
  );
};

export default DemoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  item: { padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 8 },
  selected: { marginTop: 16, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 8 },
});
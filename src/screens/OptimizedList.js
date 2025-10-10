import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

// 🧩 Child component (memoized)
const Item = React.memo(({ item, onSelect }) => {
  console.log('Rendering item:', item.name);
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{item.name}</Text>
      <Button title="Select" onPress={() => onSelect(item)} />
    </View>
  );
});

const OptimizedList = () => {
  const [selected, setSelected] = useState(null);
  const [count, setCount] = useState(0);

  // 🧠 useMemo to generate heavy data only once
  const data = useMemo(() => {
    console.log('Generating data...');
    return Array.from({ length: 10 }, (_, i) => ({
      id: i.toString(),
      name: `Item ${i + 1}`,
    }));
  }, []);

  // 🧠 useCallback to memoize the function
  const handleSelect = useCallback((item) => {
    setSelected(item);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Optimized FlatList</Text>
      <Text>Selected: {selected ? selected.name : 'None'}</Text>
      <Text>Count: {count}</Text>

      <Button title="Increase Count" onPress={() => setCount(count + 1)} />
      <Button title="Decrease Count" onPress={() => setCount(count - 1)}  style={{ marginVertical: 10 }} />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item item={item} onSelect={handleSelect} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  item: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f3f3f3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: { fontSize: 16 },
});

export default OptimizedList;

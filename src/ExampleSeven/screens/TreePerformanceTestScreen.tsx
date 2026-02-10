
// ==================================================
// 📁 src/screens/TreePerformanceTestScreen.tsx
// ==================================================
import React, { useMemo } from 'react';
import { View, FlatList } from 'react-native';
import TreeNodeFlatList from '../components/TreeNodeFlatList';
import { generateLargeTree } from '../utils/generateLargeTree';

const TreePerformanceTestScreen = () => {
  const largeTree = useMemo(() => generateLargeTree(5, 6), []); // ~7k nodes

  return (
    <FlatList
      data={[largeTree]}
      renderItem={({ item }) => <TreeNodeFlatList node={item} />}
      keyExtractor={item => item.id}
    />
  );
};

export default TreePerformanceTestScreen;

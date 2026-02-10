import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTree } from '../redux/treeSlice';
import { RootState, AppDispatch } from '../redux/store';
import TreeNodeFlatList from '../components/TreeNodeFlatList';

const TreeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.tree
  );

  useEffect(() => {
    dispatch(fetchTree());
  }, []);

  if (loading) {
    return <Text style={styles.center}>Loading tree...</Text>;
  }

  if (error || !data) {
    return <Text style={styles.center}>Unable to load tree data</Text>;
  }

  return (
    <FlatList
      data={[data]}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <TreeNodeFlatList node={item} />}
      contentContainerStyle={styles.container}
    />
  );
};

export default TreeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F4F6FA',
  },
  center: {
    marginTop: 100,
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
});

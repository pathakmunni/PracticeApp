import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
// @ts-ignore: no declaration file for react-native-vector-icons/MaterialCommunityIcons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DATA = Array.from({ length: 50 }, (_, i) => ({
  id: i.toString(),
  title: `Delicious Item ${i + 1}`,
  desc: 'Fresh and tasty meal delivered to your door',
  image: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
}));

const ITEM_HEIGHT = 120;

const OptimizedFlatList = () => {
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
        <View style={styles.ratingRow}>
          <Icon name="star" size={18} color="#FFD700" />
          <Text style={styles.rating}>4.{Math.floor(Math.random() * 5)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Popular Dishes 🍲</Text>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        initialNumToRender={8}
        windowSize={10}
        maxToRenderPerBatch={20}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default OptimizedFlatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
    paddingHorizontal: 18,
    paddingTop: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 15,
    padding: 15,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginRight: 15,
    backgroundColor: '#EEF1FF',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
  },
  desc: {
    color: '#777',
    fontSize: 14,
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    marginLeft: 5,
    fontWeight: '600',
    color: '#333',
  },
});

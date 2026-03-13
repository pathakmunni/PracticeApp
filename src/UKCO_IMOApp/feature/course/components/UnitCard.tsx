import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Unit } from '../../../types/contentTypes';
import { getImageSource } from '../../../assets/ImageManager';

interface Props {
  unit: Unit;
  onPress: () => void;
}

export default function UnitCard({ unit, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={getImageSource[unit.thumbnail.url]}
        style={styles.thumbnail}
      />
      <View style={{ marginRight: 12 }}>
        <Text style={styles.title}>{unit.title}</Text>
        {/* <Text style={styles.duration}>
          Estimated: {unit.estimatedDuration ?? 0} mins
        </Text> */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 40,
    elevation: 3,
    flexDirection: 'row',
    borderWidth:4,
    borderColor:'#1C0770',
    alignItems: 'center',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
    backgroundColor: '#1C0770',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  duration: {
    marginTop: 6,
    color: '#666',
  },
});

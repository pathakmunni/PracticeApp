import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  progress: number; // value between 0 and 1
}

export default function ProgressBar({ progress }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${progress * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 6,
    width: '100%',
    backgroundColor: '#e0e0e0',
  },
  progress: {
    height: 6,
    backgroundColor: '#4CAF50',
  },
});
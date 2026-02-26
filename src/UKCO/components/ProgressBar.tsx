import React from 'react';
import { View } from 'react-native';

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <View style={{ height: 8, backgroundColor: '#eee' }}>
      <View
        style={{
          width: `${progress * 100}%`,
          height: '100%',
          backgroundColor: '#4CAF50',
        }}
      />
    </View>
  );
}
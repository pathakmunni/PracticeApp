import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import ProgressBar from './ProgressBar';
import { getImageSource } from '../assets/ImageManager';

interface Props {
  unit:{}
  title: string;
  // unitImage?: string; // optional image for the unit
  onBack?: () => void;
  rightComponent?: React.ReactNode;
  showProgress?: boolean;
  progress?: number; // value between 0 and 1
}

export default function AppHeader({
  unit,
  title,
  // unitImage,
  onBack,
  rightComponent,
  showProgress = false,
  progress = 0,
}: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Image
              source={require('../assets/images/back-arrow.png')}
              style={{ width: 24, height: 24, tintColor: '#fff' }}
            />
            {/* <Text style={styles.backText}>←</Text> */}
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, top: 30 }}>

          {unit.thumbnail.url && (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#fff',
                marginRight: 12,
                overflow: 'hidden',
              }}
            >
              <Image
                source={getImageSource[unit.thumbnail?.url]}
                style={{ width: '100%', height: '100%' }}
              />
            </View>
          )}

        <Text style={styles.title}>
          {unit.title}
        </Text>
        </View>
        <Text style={[styles.title, {left: 50, top: 0}] }>
          {unit.displayOrder ? `Unit ${unit.displayOrder}` : ''}
        </Text>

        <View style={styles.right}>
          {rightComponent ? (
            rightComponent
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>
      </View>

      {showProgress && <ProgressBar progress={progress} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: '#fff',
  },
  container: {
    height: 200,
    // flexDirection: 'row',
    // alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: '#1C0770',
    elevation: 4,
  },
  backBtn: {
    width: 60,
    top: 30
    // justifyContent: 'center',
    // top: -20,
  },
  backText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
  title: {
    flex: 1,
    // textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  right: {
    width: 40,
    alignItems: 'flex-end',
  },
  placeholder: {
    width: 40,
  },
});

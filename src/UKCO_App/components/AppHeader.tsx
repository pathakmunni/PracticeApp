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

interface Props {
  title: string;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
  showProgress?: boolean;
  progress?: number; // value between 0 and 1
}

export default function AppHeader({
  title,
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
            {/* <Text style={styles.backText}>←</Text> */}
            <Image
              source={require('../assets/images/back-arrow.png')}
              style={{ width: 24, height: 24, tintColor: '#000000' }}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        <Text style={styles.title} numberOfLines={1}>
          {title}
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
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 4,
  },
  backBtn: {
    width: 40,
    justifyContent: 'center',
  },
  backText: {
    fontSize: 22,
    fontWeight: '600',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  right: {
    width: 40,
    alignItems: 'flex-end',
  },
  placeholder: {
    width: 40,
  },
});

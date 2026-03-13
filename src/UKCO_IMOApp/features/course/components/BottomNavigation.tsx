import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface Props {
  onNext: () => void;
  onPrevious: () => void;
  disableNext?: boolean;
  disablePrevious?: boolean;
  nextLabel?: string;
  previousLabel?: string;
}

export default function BottomNavigation({
  onNext,
  onPrevious,
  disableNext = false,
  disablePrevious = false,
  nextLabel = 'Next',
  previousLabel = 'Previous',
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.prevBtn,
          disablePrevious && styles.disabledBtn,
        ]}
        disabled={disablePrevious}
        onPress={onPrevious}
      >
        <Text
          style={[
            styles.text,
            disablePrevious && styles.disabledText,
          ]}
        >
          {previousLabel}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.nextBtn,
          disableNext && styles.disabledBtn,
        ]}
        disabled={disableNext}
        onPress={onNext}
      >
        <Text
          style={[
            styles.text,
            disableNext && styles.disabledText,
          ]}
        >
          {nextLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  prevBtn: {
    backgroundColor: '#9E9E9E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  nextBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  disabledBtn: {
    backgroundColor: '#E0E0E0',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
  },
  disabledText: {
    color: '#9E9E9E',
  },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Section } from '../types/contentTypes';

interface Props {
  section: Section;
  onPress: () => void;
}

export default function SectionCard({ section, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.indexContainer}>
        <Text style={styles.index}>{section.index}. </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{section.title} </Text>
        <Text style={styles.type}>
          {section.sectionType === 'quiz' ? 'Quiz Section' : 'Learning Section'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1C0770',
  },
  indexContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#1C0770',
    backgroundColor: 'rgba(246, 183, 9, 0.53)',
  },
  index: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1C0770',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  type: {
    marginTop: 6,
    fontSize: 12,
    color: '#888',
  },
});

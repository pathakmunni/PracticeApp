import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const SingleChoiceQuestion = ({ slide }: any) => {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <View>
      <Text style={styles.question}>{slide.question??"SingleChoiceQuestion"}</Text>

      {slide.options?.map((option: any) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.option,
            selected === option.id && styles.selected,
          ]}
          onPress={() => setSelected(option.id)}
        >
          <Text>{option.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default SingleChoiceQuestion

const styles = StyleSheet.create({
  question: {
    fontSize: 16,
    marginBottom: 20,
  },
  option: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  selected: {
    backgroundColor: '#D6E4FF',
  },
})

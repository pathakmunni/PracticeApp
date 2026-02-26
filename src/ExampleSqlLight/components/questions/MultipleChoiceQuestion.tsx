import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const MultipleChoiceQuestion = ({ slide }: any) => {
  const [selected, setSelected] = useState<string[]>([])

  const toggleOption = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id))
    } else {
      setSelected([...selected, id])
    }
  }

  return (
    <View>
      <Text style={styles.question}>{slide.question??"MultipleChoiceQuestion"}</Text>

      {slide.options?.map((option: any) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.option,
            selected.includes(option.id) && styles.selected,
          ]}
          onPress={() => toggleOption(option.id)}
        >
          <Text>{option.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default MultipleChoiceQuestion

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

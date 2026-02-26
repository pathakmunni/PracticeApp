import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const TrueFalseQuestion = ({ slide }: any) => {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <View>
      <Text style={styles.question}>{slide.question??"TrueFalseQuestion"}</Text>

      <TouchableOpacity
        style={[
          styles.option,
          selected === 'true' && styles.selected,
        ]}
        onPress={() => setSelected('true')}
      >
        <Text>True</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          selected === 'false' && styles.selected,
        ]}
        onPress={() => setSelected('false')}
      >
        <Text>False</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TrueFalseQuestion

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

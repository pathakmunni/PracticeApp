import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const FreeTextQuestion = ({ slide }: any) => {
  const [text, setText] = useState('')

  return (
    <View>
      <Text style={styles.question}>{slide.question??Text}</Text>

      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholder="Write your answer..."
      />
    </View>
  )
}

export default FreeTextQuestion

const styles = StyleSheet.create({
  question: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
  },
})

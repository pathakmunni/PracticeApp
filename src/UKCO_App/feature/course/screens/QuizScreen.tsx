import React, { useState } from 'react'
import { View, Button, Text, TouchableOpacity } from 'react-native'
import QuizRenderer from '../components/QuizRenderer'
import { useDispatch } from 'react-redux'
import { completeSection } from '../../../store/slices/progressSlice'

export default function QuizScreen({ route }) {

  const { questions } = route.params

  const [index, setIndex] = useState(0)

  const next = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1)
    }
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>

      <Text>
        {index + 1}/{questions.length}
      </Text>

      <QuizRenderer question={questions[index]} />

      <TouchableOpacity onPress={next}>
        <Text>Next</Text>
      </TouchableOpacity>

    </View>
  )
}
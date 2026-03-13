import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import useQuizQuestion from "../../hooks/useQuizQuestion";
import { useDispatch } from "react-redux";
import { selectAnswer } from "../../../../store/slices/quizSlice";

export default function TrueFalseQuestion({ question }: any) {


  const dispatch = useDispatch()

  const options = [
    { id: 'true', text: 'True' },
    { id: 'false', text: 'False' }
  ]

  return (
    <View>

      <Text>{question.question}</Text>

      {options.map(option => (

        <TouchableOpacity
          key={option.id}
          onPress={() =>
            dispatch(
              selectAnswer({
                questionId: question.questionId,
                value: option.id
              })
            )
          }
        >
          <Text>{option.text}</Text>
        </TouchableOpacity>

      ))}

    </View>
  )
}
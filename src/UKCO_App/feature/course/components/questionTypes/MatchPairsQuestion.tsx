import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import useQuizQuestion from "../../hooks/useQuizQuestion";
import { useDispatch } from "react-redux";
import { selectAnswer } from "../../../../store/slices/quizSlice";

export default function MatchPairsQuestion({ question }: any) {

  const dispatch = useDispatch()

  const [selected, setSelected] = useState(null)

  return (

    <View>

      <Text>{question.question}</Text>

      {question.left.map((item: any) => (

        <TouchableOpacity
          key={item.id}
          onPress={() => setSelected(item.id)}
        >
          <Text>{item.text}</Text>
        </TouchableOpacity>

      ))}

      {question.right.map((item: any) => (

        <TouchableOpacity
          key={item.id}
          onPress={() => {

            dispatch(
              selectAnswer({
                questionId: question.questionId,
                value: { left: selected, right: item.id }
              })
            )

          }}
        >
          <Text>{item.text}</Text>
        </TouchableOpacity>

      ))}

    </View>
  )
}
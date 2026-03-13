import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import useQuizQuestion from "../../hooks/useQuizQuestion";
import { useDispatch } from "react-redux";
import { selectAnswer } from "../../../../store/slices/quizSlice";
export default function OrderSequenceQuestion({ question }: any) {

  const dispatch = useDispatch()

  const [order, setOrder] = useState(question.items)

  return (

    <View>

      <Text>{question.question}</Text>

      {order.map((item: any, index: number) => (

        <TouchableOpacity key={index}>
          <Text>{item.text}</Text>
        </TouchableOpacity>

      ))}

      <Button
        title="Submit"
        onPress={() =>
          dispatch(
            selectAnswer({
              questionId: question.questionId,
              value: order
            })
          )
        }
      />

    </View>
  )
}
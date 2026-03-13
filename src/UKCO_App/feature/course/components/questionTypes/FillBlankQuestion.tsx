import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Button } from "react-native";
import useQuizQuestion from "../../hooks/useQuizQuestion";
import { useDispatch } from "react-redux";
import { selectAnswer } from "../../../../store/slices/quizSlice";

export default function FillBlankQuestion({ question }: any) {

  const dispatch = useDispatch()

  const [text, setText] = useState("")

  return (

    <View>

      <Text>{question.question}</Text>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type answer"
      />

      <Button
        title="Submit"
        onPress={() =>
          dispatch(
            selectAnswer({
              questionId: question.questionId,
              value: text
            })
          )
        }
      />

    </View>
  )
}
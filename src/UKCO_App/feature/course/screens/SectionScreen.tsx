import React, { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function SectionScreen({ route }) {

  const navigation = useNavigation()

  const { section } = route.params
  const [index, setIndex] = useState(0)

  const contents = section.content

  const next = () => {

    const isLastContent = index === contents.length - 1

    if (isLastContent) {

      navigation.navigate("Quiz", {
        questions: section.quiz,
        unitId: section.unitId,
        sectionIndex: section.index
      })

    } else {
      setIndex(index + 1)
    }
  }

  const previous = () => {
    if (index > 0) {
      setIndex(index - 1)
    }
  }

  const current = contents[index]

  return (
    <View style={{ flex: 1, padding: 20 }}>

      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        {current.text}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 40
        }}
      >

        <TouchableOpacity onPress={previous}>
          <Text>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={next}>
          <Text>
            {index === contents.length - 1 ? "Start Quiz" : "Next"}
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  )
}
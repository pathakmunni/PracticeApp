import React from "react";
import { View, Text, Image, Button, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { completeSection } from "../../../../store/slices/progressSlice";

export default function SectionContentScreen({ route, navigation }: any) {

  const { section, unitId, index } = route.params

  const dispatch = useDispatch()

  const finishSection = () => {

    dispatch(
      completeSection({
        unitId,
        sectionIndex: index,
      })
    )

    navigation.goBack()
  }

  return (
    <ScrollView style={{ padding: 20 }}>

      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {section.title}
      </Text>

      {section.content.map((item: any) => (

        <View key={item.contentId} style={{ marginVertical: 20 }}>

          {item.thumbnail && (
            <Image
              source={{ uri: item.thumbnail.url }}
              style={{ height: 200 }}
            />
          )}

          <Text style={{ fontSize: 18 }}>
            {item.text}
          </Text>

        </View>

      ))}

      <Button title="Next" onPress={finishSection} />

    </ScrollView>
  )
}
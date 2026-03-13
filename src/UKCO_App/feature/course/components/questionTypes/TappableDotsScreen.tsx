import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";

export default function TappableDotsScreen({ route }: any) {

  const { section } = route.params

  const [activeDot, setActiveDot] = useState<any>(null)

  return (
    <View style={{ flex: 1 }}>

      <Image
        source={{ uri: section.image }}
        style={{ width: "100%", height: 400 }}
      />

      {section.dots.map((dot: any) => (

        <TouchableOpacity
          key={dot.id}
          onPress={() => setActiveDot(dot)}
          style={{
            position: "absolute",
            top: dot.y,
            left: dot.x,
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: "red",
          }}
        />
      ))}

      {activeDot && (
        <View
          style={{
            position: "absolute",
            bottom: 40,
            left: 20,
            right: 20,
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text>{activeDot.text}</Text>
        </View>
      )}

    </View>
  )
}
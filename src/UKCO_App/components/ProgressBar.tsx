import React from "react";
import { View } from "react-native";

interface Props {
  progress: number;
}

export default function ProgressBar({ progress }: Props) {
  return (
    <View
      style={{
        height: 8,
        backgroundColor: "#eee",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          height: 8,
          width: `${progress}%`,
          backgroundColor: "#4CAF50",
        }}
      />
    </View>
  );
}
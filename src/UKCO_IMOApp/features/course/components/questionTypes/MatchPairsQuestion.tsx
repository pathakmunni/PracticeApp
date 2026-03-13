import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

interface Pair {
  left: any;
  right: any;
}

interface Props {
  question: any;
}

export default function MatchPairsQuestion({ question }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<any>({});

  const pairs: Pair[] = question.pairs || [];

  const rightOptions = [...pairs].sort(() => Math.random() - 0.5);

  const handleMatch = (leftIndex: number, right: any) => {
    setMatches({
      ...matches,
      [leftIndex]: right,
    });
    setSelectedLeft(null);
  };

  const renderItem = (item: any) => {
    if (!item) return null;

    const text = typeof item === "string" ? item : item.text;
    const image = typeof item === "object" ? item.image : null;

    return (
      <View style={styles.itemContent}>
        {image && (
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.question}>{question.question}</Text>

      <View style={styles.container}>
        {/* LEFT SIDE */}
        <View style={styles.column}>
          {pairs.map((pair, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.item,
                selectedLeft === index && styles.selected,
              ]}
              onPress={() => setSelectedLeft(index)}
            >
              {renderItem(pair.left)}
            </TouchableOpacity>
          ))}
        </View>

        {/* RIGHT SIDE */}
        <View style={styles.column}>
          {rightOptions.map((pair, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => {
                if (selectedLeft !== null) {
                  handleMatch(selectedLeft, pair.right);
                }
              }}
            >
              {renderItem(pair.right)}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  column: {
    flex: 1,
  },

  item: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  selected: {
    borderColor: "#4CAF50",
  },

  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },

  text: {
    flex: 1,
    fontSize: 15,
  },
});
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import ProgressBar from "../../../components/ProgressBar";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export default function UnitScreen({ route, navigation }: any) {

  const { unit } = route.params

  const progress = useSelector(
    (state: RootState) => state.progress.units[unit.unitId]
  )

  return (
    <FlatList
      data={unit.sections}

      keyExtractor={(item) => item.sectionId}

      renderItem={({ item, index }) => {

        const completed =
          progress?.completedSections?.includes(index) ?? false

        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SectionContent", {
                section: item,
                unitId: unit.unitId,
                index,
              })
            }
            style={{
              padding: 20,
              borderBottomWidth: 1,
              borderColor: "#eee",
            }}
          >
            <Text style={{ fontSize: 18 }}>
              {index + 1}. {item.title}
            </Text>

            <ProgressBar progress={completed ? 100 : 0} />
          </TouchableOpacity>
        )
      }}
    />
  )
}
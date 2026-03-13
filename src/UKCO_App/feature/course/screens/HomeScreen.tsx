// import React from "react";
// import { View, Text, FlatList, TouchableOpacity } from "react-native";
// import content from "../../../assets/contentNew.json";
// import ProgressBar from "../../../components/ProgressBar";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../store/store";

// export default function HomeScreen({ navigation }: any) {

//   const progress = useSelector((state: RootState) => state.progress.units);

//   return (
//     <FlatList
//       data={content.units}
//       keyExtractor={(item) => item.unitId}

//       renderItem={({ item }) => {

//         const completed = progress[item.unitId]?.completedSections?.length || 0
//         const total = item.sections.length

//         const percent = (completed / total) * 100

//         return (
//           <TouchableOpacity
//             onPress={() => navigation.navigate("Learning", { unit: item })}
//             style={{
//               backgroundColor: "white",
//               margin: 12,
//               padding: 18,
//               borderRadius: 12,
//             }}
//           >
//             <Text style={{ fontSize: 20, fontWeight: "bold" }}>
//               {item.title}
//             </Text>

//             <Text>
//               {completed}/{total}
//             </Text>

//             <ProgressBar progress={percent} />
//           </TouchableOpacity>
//         )
//       }}
//     />
//   )
// }

import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import content from "../../../assets/contentNew.json";
import ProgressBar from "../../../components/ProgressBar";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export default function HomeScreen({ navigation }: any) {

  const progress = useSelector((state: RootState) => state.progress.units);

  return (
    <FlatList
      data={content.units}
      keyExtractor={(item) => item.unitId}

      renderItem={({ item }) => {

        const completed = progress[item.unitId]?.completedSections?.length || 0
        const total = item.sections.length

        const percent = (completed / total) * 100

        return (
          <TouchableOpacity
            onPress={() => navigation.navigate("Unit", { unit: item })}
            style={{
              backgroundColor: "white",
              margin: 12,
              padding: 18,
              borderRadius: 12,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {item.title}
            </Text>

            <Text>
              {completed}/{total}
            </Text>

            <ProgressBar progress={percent} />
          </TouchableOpacity>
        )
      }}
    />
  )
}
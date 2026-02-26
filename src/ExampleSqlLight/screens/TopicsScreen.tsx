// import React from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import { RootState } from '../app/store';

// const TopicsScreen = () => {
//   const route = useRoute<any>();
//   const navigation = useNavigation<any>();

//   const { unitId, sectionId } = route.params;

//   const unit = useSelector((state: RootState) =>
//     state.home.units.find(u => (u.id || u.unit_id) === unitId),
//   );

//   const section = unit?.sections?.find(
//     (s: any) => (s.id || s.section_id) === sectionId,
//   );

//   console.log('TopicsScreen - unit:', unit);
//   console.log('TopicsScreen - section:', section);

//   if (!section) {
//     return (
//       <View style={styles.center}>
//         <Text>Section not found</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{section.title}</Text>
//       {section.topics.map(topic => (
//         <TouchableOpacity
//           key={topic.id}
//           onPress={() => {
//               navigation.navigate('Question', {
//                 unitId,
//                 sectionId: section.id,
//                 topicId: topic.id,
//               });
//             // }
//           }}
//         >
//           <Text>{'Continue'}</Text>
//         </TouchableOpacity>
//       ))}

//       {/* <FlatList
//         data={section.topics}
//         keyExtractor={(item, index) =>
//           String(item.id || item.topic_id || index)
//         }
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() =>
//               navigation.navigate('Question', {
//                 unitId,
//                 sectionId,
//                 topicId:
//                   item.id || item.topic_id,
//                 pageIndex: 0,
//                 slideIndex: 0,
//               })
//             }
//           >
//             <Text style={styles.topicTitle}>
//               {item.title || 'Untitled'}
//             </Text>

//             <Text>
//               {getSlideCount(item)} Slides
//             </Text>
//           </TouchableOpacity>
//         )}
//       /> */}

//        <TouchableOpacity
//           onPress={() => {
//               navigation.navigate('Question', {
//                 unitId,
//                 sectionId: section.id,
//                 topicId: section.topics[0].id,  
//               });
//             // }
//           }}
//         >
//           <Text>{'Continue'}</Text>
//         </TouchableOpacity>
//     </View>
//   );
// };

// export default TopicsScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//     elevation: 3,
//   },
//   topicTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


import React from 'react'
import { View, Text, Button } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'

const TopicScreen = ({ route, navigation }: any) => {
  const {unit, unitId, sectionId, topicId } = route.params

  console.log('TopicScreen - route.params:', route.params)

  const topic = useSelector((state: RootState) =>
    state.course.units
      .find(u => u.id === unitId)
      ?.sections.find(s => s.id === sectionId)  
      ?.topics.find(t => t.id === topicId)
  )

  console.log('TopicScreen - topic:', topic)

  if (!topic) return <Text>Not found</Text>

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>
        {topic.title || 'Section Introduction'}
      </Text>

      <Button
        title="Continue"
        onPress={() =>
          navigation.replace('Question', {
            unitId,
            sectionId,
            topicId,
          })
        }
      />
    </View>
  )
}

export default TopicScreen
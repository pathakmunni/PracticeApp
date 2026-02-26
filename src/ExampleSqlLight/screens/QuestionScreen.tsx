import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'

import TrueFalseQuestion from '../components/questions/TrueFalseQuestion'
import SingleChoiceQuestion from '../components/questions/SingleChoiceQuestion'
import MultipleChoiceQuestion from '../components/questions/MultipleChoiceQuestion'
import FreeTextQuestion from '../components/questions/FreeTextQuestion'

const QuestionScreen = ({ route }: any) => {
  const { unitId, sectionId, topicId } = route.params

  const topic = useSelector((state: RootState) =>
    state.course.units
      .find(u => u.id === unitId)
      ?.sections.find(s => s.id === sectionId)
      ?.topics.find(t => t.id === topicId)
  )

  if (!topic) return <Text>Topic not found</Text>

  const [index, setIndex] = useState(0)

  const pages = topic.pages || []
  const page = pages[index]

  if (!page) return <Text>No questions</Text>

  /* 🔥 TEMPLATE SWITCH */

  const renderQuestion = () => {
    switch (topic.template) {
      case 'true_false':
        return <TrueFalseQuestion page={page} />

      case 'single_choice':
        return <SingleChoiceQuestion page={page} />

      case 'multiple_choice':
        return <MultipleChoiceQuestion page={page} />

      case 'free_text':
        return <FreeTextQuestion page={page} />

      default:
        return <Text>Unknown template</Text>
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 20 }}>
        {topic.title}
      </Text>

      {renderQuestion()}
    </View>
  )
}

export default QuestionScreen


// import React, { useState, useEffect } from 'react'
// import { View, Text, Button } from 'react-native'
// import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '../app/store'
// import { setCurrentSlide } from '../features/learning/learningSlice'
// import { markSlideComplete } from '../features/progress/progressSlice'

// const QuestionScreen = ({ route }: any) => {
//   const { unitId, sectionId } = route.params
//   const dispatch = useDispatch()

//   const section = useSelector((state: RootState) =>
//     state.course.units
//       .find(u => u.id === unitId)
//       ?.sections.find(s => s.id === sectionId)
//   )

//   const pages =
//     section?.topics.flatMap(t => t.pages) || []

//   const [currentIndex, setCurrentIndex] =
//     useState(0)

//   if (!pages.length) {
//     return <Text>No slides found</Text>
//   }

//   const currentPage = pages[currentIndex]

//   useEffect(() => {
//     dispatch(
//       setCurrentSlide({
//         unitId,
//         sectionId,
//         slideId: currentPage.id,
//       })
//     )
//   }, [currentIndex])

//   const handleNext = () => {
//     dispatch(
//       markSlideComplete({
//         unitId,
//         sectionId,
//         slideId: currentPage.id,
//       })
//     )

//     if (currentIndex < pages.length - 1) {
//       setCurrentIndex(prev => prev + 1)
//     }
//   }

//   return (
//     <View>
//       <Text>{currentPage.question}</Text>

//       <Button title="Next" onPress={handleNext} />
//     </View>
//   )
// }

// export default QuestionScreen


// // import React, { useState } from 'react'
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   TextInput
// // } from 'react-native'
// // import { useSelector, useDispatch } from 'react-redux'
// // import { RootState } from '../app/store'

// // const QuestionScreen = ({ route, navigation }: any) => {
// //   const { unitId, sectionId, topicIndex } = route.params

// //   const section = useSelector((state: RootState) =>
// //     state.course.units
// //       .find(u => u.id === unitId)
// //       ?.sections.find(s => s.id === sectionId)
// //   )

// //   const topic = section?.topics[topicIndex]

// //   const pages = topic?.pages || []

// //   const [currentIndex, setCurrentIndex] = useState(0)
// //   const [selected, setSelected] = useState<any>(null)

// //   if (!topic) {
// //     return (
// //       <View style={styles.center}>
// //         <Text>No Topic Found</Text>
// //       </View>
// //     )
// //   }

// //   const currentPage = pages[currentIndex]
// //   console.log('Current Page:', currentPage)

// //   const progress =
// //     ((currentIndex + 1) / pages.length) * 100

// //   const handleNext = () => {
// //     if (currentIndex < pages.length - 1) {
// //       setCurrentIndex(prev => prev + 1)
// //       setSelected(null)
// //     } else {
// //       navigation.goBack()
// //     }
// //   }

// //   return (
// //     <View style={styles.container}>
// //       {/* Progress Bar */}
// //       <View style={styles.topBar}>
// //         <View
// //           style={[
// //             styles.progressFill,
// //             { width: `${progress}%` },
// //           ]}
// //         />
// //       </View>

// //       <View style={styles.card}>
// //         <Text style={styles.counter}>
// //           {currentIndex + 1} of {pages.length}
// //         </Text>

// //         <Text style={styles.title}>
// //           {topic.title}
// //         </Text>

// //         <Text style={styles.question}>
// //           {currentPage.question}
// //         </Text>

// //         {/* TRUE FALSE */}
// //         {currentPage.template === 'true_or_false' && (
// //           <View style={styles.row}>
// //             {['True', 'False'].map(option => (
// //               <TouchableOpacity
// //                 key={option}
// //                 style={[
// //                   styles.option,
// //                   selected === option &&
// //                     styles.selected,
// //                 ]}
// //                 onPress={() => setSelected(option)}
// //               >
// //                 <Text>{option}</Text>
// //               </TouchableOpacity>
// //             ))}
// //           </View>
// //         )}

// //         {/* SINGLE CHOICE */}
// //         {currentPage.template === 'single_choice' &&
// //           currentPage.options.map(
// //             (opt: string, i: number) => (
// //               <TouchableOpacity
// //                 key={i}
// //                 style={[
// //                   styles.option,
// //                   selected === opt &&
// //                     styles.selected,
// //                 ]}
// //                 onPress={() => setSelected(opt)}
// //               >
// //                 <Text>{opt}</Text>
// //               </TouchableOpacity>
// //             )
// //           )}

// //         {/* FREE TEXT */}
// //         {currentPage.template === 'free_text' && (
// //           <TextInput
// //             style={styles.input}
// //             placeholder="template your answer"
// //             value={selected}
// //             onChangeText={setSelected}
// //           />
// //         )}
// //       </View>

// //       <TouchableOpacity
// //         style={styles.button}
// //         onPress={handleNext}
// //       >
// //         <Text style={styles.buttonText}>
// //           Continue
// //         </Text>
// //       </TouchableOpacity>
// //     </View>
// //   )
// // }

// // export default QuestionScreen

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#E11D2E',
// //     padding: 15,
// //   },
// //   topBar: {
// //     height: 6,
// //     backgroundColor: '#7f1d1d',
// //     borderRadius: 5,
// //     marginBottom: 15,
// //   },
// //   progressFill: {
// //     height: 6,
// //     backgroundColor: 'green',
// //     borderRadius: 5,
// //   },
// //   card: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     borderRadius: 25,
// //     padding: 20,
// //   },
// //   counter: {
// //     fontSize: 14,
// //     color: '#999',
// //   },
// //   title: {
// //     fontSize: 22,
// //     fontWeight: 'bold',
// //     marginVertical: 8,
// //   },
// //   question: {
// //     fontSize: 16,
// //     marginVertical: 15,
// //   },
// //   row: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //   },
// //   option: {
// //     backgroundColor: '#eee',
// //     padding: 20,
// //     borderRadius: 20,
// //     marginVertical: 10,
// //     alignItems: 'center',
// //   },
// //   selected: {
// //     borderWidth: 2,
// //     borderColor: 'green',
// //   },
// //   input: {
// //     backgroundColor: '#f2f2f2',
// //     borderRadius: 15,
// //     padding: 15,
// //   },
// //   button: {
// //     backgroundColor: '#1f3b73',
// //     padding: 15,
// //     borderRadius: 25,
// //     alignItems: 'center',
// //     marginVertical: 10,
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontWeight: 'bold',
// //   },
// //   center: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// // })



// // // import React, { useState, useMemo } from 'react'
// // // import {
// // //   View,
// // //   Text,
// // //   StyleSheet,
// // //   TouchableOpacity,
// // //   TextInput,
// // // } from 'react-native'
// // // import { useRoute, useNavigation } from '@react-navigation/native'
// // // import { useSelector } from 'react-redux'
// // // import { RootState } from '../app/store'

// // // const QuestionScreen = () => {
// // //   const route = useRoute<any>()
// // //   const navigation = useNavigation<any>()

// // //   const { unitId, sectionId, topicId } = route.params

// // //   const unit = useSelector((state: RootState) =>
// // //     state.home.units.find(
// // //       u => (u.id || u.unit_id) === unitId
// // //     )
// // //   )

// // //   const section = unit?.sections?.find(
// // //     (s: any) =>
// // //       (s.id || s.section_id) === sectionId
// // //   )

// // //   const topic = section?.topics?.find(
// // //     (t: any) =>
// // //       (t.id || t.topic_id) === topicId
// // //   )

// // //   // 🔥 Flatten all slides from pages
// // //   const slides = useMemo(() => {
// // //     if (!topic?.pages) return []
// // //     return topic.pages.flatMap(
// // //       (page: any) => page.slides || []
// // //     )
// // //   }, [topic])

// // //   const [currentIndex, setCurrentIndex] = useState(0)
// // //   const [answer, setAnswer] = useState('')

// // //   const slide = slides[currentIndex]

// // //   if (!slide) {
// // //     return (
// // //       <View style={styles.center}>
// // //         <Text>No slides found</Text>
// // //       </View>
// // //     )
// // //   }

// // //   const totalSlides = slides.length
// // //   const progress = (currentIndex + 1) / totalSlides

// // //   const handleNext = () => {
// // //     if (currentIndex < totalSlides - 1) {
// // //       setCurrentIndex(prev => prev + 1)
// // //       setAnswer('')
// // //     } else {
// // //       navigation.goBack()
// // //     }
// // //   }

// // //   return (
// // //     <View style={styles.container}>
      
// // //       {/* 🔴 Header */}
// // //       <View style={styles.header}>
// // //         <TouchableOpacity onPress={() => navigation.goBack()}>
// // //           <Text style={styles.close}>✕</Text>
// // //         </TouchableOpacity>

// // //         <View style={styles.progressBar}>
// // //           <View
// // //             style={[
// // //               styles.progressFill,
// // //               { width: `${progress * 100}%` },
// // //             ]}
// // //           />
// // //         </View>
// // //       </View>

// // //       {/* White Card */}
// // //       <View style={styles.card}>
// // //         <Text style={styles.counter}>
// // //           {currentIndex + 1} of {totalSlides}
// // //         </Text>

// // //         <Text style={styles.topicTitle}>
// // //           {topic.title}
// // //         </Text>

// // //         <Text style={styles.questionText}>
// // //           {slide.question || slide.text}
// // //         </Text>

// // //         {/* 🔥 Question Types */}
// // //         {slide.template === 'true_false' && (
// // //           <View style={styles.row}>
// // //             <TouchableOpacity
// // //               style={styles.option}
// // //               onPress={() => setAnswer('true')}
// // //             >
// // //               <Text>TRUE</Text>
// // //             </TouchableOpacity>

// // //             <TouchableOpacity
// // //               style={styles.option}
// // //               onPress={() => setAnswer('false')}
// // //             >
// // //               <Text>FALSE</Text>
// // //             </TouchableOpacity>
// // //           </View>
// // //         )}

// // //         {slide.template === 'input' && (
// // //           <TextInput
// // //             style={styles.input}
// // //             value={answer}
// // //             onChangeText={setAnswer}
// // //             placeholder="template your answer..."
// // //           />
// // //         )}
// // //       </View>

// // //       {/* Continue Button */}
// // //       <TouchableOpacity
// // //         style={styles.continueBtn}
// // //         onPress={handleNext}
// // //       >
// // //         <Text style={{ color: '#fff', fontWeight: '600' }}>
// // //           Continue
// // //         </Text>
// // //       </TouchableOpacity>
// // //     </View>
// // //   )
// // // }

// // // export default QuestionScreen

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: '#E53935',
// // //   },
// // //   header: {
// // //     padding: 20,
// // //     paddingTop: 50,
// // //   },
// // //   close: {
// // //     color: '#fff',
// // //     fontSize: 22,
// // //   },
// // //   progressBar: {
// // //     height: 6,
// // //     backgroundColor: '#B71C1C',
// // //     borderRadius: 3,
// // //     marginTop: 15,
// // //   },
// // //   progressFill: {
// // //     height: 6,
// // //     backgroundColor: '#4CAF50',
// // //     borderRadius: 3,
// // //   },
// // //   card: {
// // //     flex: 1,
// // //     backgroundColor: '#F5F5F5',
// // //     marginTop: 20,
// // //     borderTopLeftRadius: 30,
// // //     borderTopRightRadius: 30,
// // //     padding: 20,
// // //   },
// // //   counter: {
// // //     color: '#666',
// // //     marginBottom: 10,
// // //   },
// // //   topicTitle: {
// // //     fontSize: 20,
// // //     fontWeight: 'bold',
// // //     color: '#1E3A8A',
// // //     marginBottom: 15,
// // //   },
// // //   questionText: {
// // //     fontSize: 16,
// // //     marginBottom: 20,
// // //   },
// // //   row: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //   },
// // //   option: {
// // //     flex: 1,
// // //     backgroundColor: '#fff',
// // //     padding: 20,
// // //     borderRadius: 15,
// // //     alignItems: 'center',
// // //     marginHorizontal: 5,
// // //     elevation: 3,
// // //   },
// // //   input: {
// // //     backgroundColor: '#fff',
// // //     padding: 15,
// // //     borderRadius: 15,
// // //   },
// // //   continueBtn: {
// // //     backgroundColor: '#1E3A8A',
// // //     padding: 18,
// // //     alignItems: 'center',
// // //   },
// // //   center: {
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },
// // // })

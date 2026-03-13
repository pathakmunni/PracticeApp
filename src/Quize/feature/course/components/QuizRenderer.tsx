import React from "react";

import TrueFalseQuestion from "./questionTypes/TrueFalseQuestion";
import SingleChoiceQuestion from "./questionTypes/SingleChoiceQuestion";
import MultipleChoiceQuestion from "./questionTypes/MultipleChoiceQuestion";
import MatchPairsQuestion from "./questionTypes/MatchPairsQuestion";
import ImageSingleChoiceQuestion from "./questionTypes/ImageSingleChoiceQuestion";
// import DragDropQuestion from "./questionTypes/DragDropQuestion";

const QuestionRegistry: any = {

  true_false: TrueFalseQuestion,

  single_choice: SingleChoiceQuestion,

  multiple_choice: MultipleChoiceQuestion,

  match_pairs: MatchPairsQuestion,

  image_single_choice: ImageSingleChoiceQuestion

  // drag_drop: DragDropQuestion

};

export default function QuizRenderer({ question }: any) {

  if (!question) return null;

  const Component = QuestionRegistry[question.type];

  if (!Component) {
    console.warn("Unknown question type:", question.type);
    return null;
  }

  return <Component question={question} />;
}

// import React from 'react';
// import TrueFalseQuestion from '../components/questionTypes/TrueFalseQuestion';
// import SingleChoiceQuestion from '../components/questionTypes/SingleChoiceQuestion';
// import MultipleChoiceQuestion from '../components/questionTypes/MultipleChoiceQuestion';
// import MatchPairsQuestion from '../components/questionTypes/MatchPairsQuestion';

// export default function QuizRenderer({ question }: any) {
//   if (!question) return null;

//   switch (question.type) {
//     case 'true_false':
//       return <TrueFalseQuestion question={question} />;

//     case 'single_choice':
//       return <SingleChoiceQuestion question={question} />;

//     case 'image_single_choice':
//       return <SingleChoiceQuestion question={question} />;

//     case 'multiple_choice':
//       return <MultipleChoiceQuestion question={question} />;

//     case 'match_pairs':
//       return <MatchPairsQuestion question={question} />;

//     default:
//       return null;
//   }
// }

// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectAnswer } from '../store/slices/quizSlice';
// import { RootState, AppDispatch } from '../store/store';

// interface Props {
//   question: any;
// }

// export default function QuizRenderer({ question }: Props) {
//   const dispatch = useDispatch<AppDispatch>();

//   if (!question) return null;

//   const selected = useSelector(
//     (state: RootState) =>
//       state.quiz.answers?.[question.questionId] ?? []
//   );

//   const submitted = useSelector(
//     (state: RootState) =>
//       state.quiz.submitted?.[question.questionId] ?? false
//   );

//   // -------- Generate options dynamically --------

//   const options =
//     question.type === 'true_false'
//       ? [
//           { id: 'true', text: 'True' },
//           { id: 'false', text: 'False' },
//         ]
//       : question.options ?? [];

//   // -------- Determine selection type --------

//   const allowMultiple =
//     question.type === 'multiple_choice' &&
//     (question.correctOptions?.length ?? 0) > 1;

//   const isSelected = (id: string) =>
//     selected.includes(id);

//   const isCorrect = (option: any) => {
//     if (question.type === 'true_false') {
//       return String(option.id) ===
//         String(question.correctAnswer);
//     }

//     if (question.type === 'multiple_choice') {
//       return (
//         question.correctOptions ?? []
//       )
//         .map(String)
//         .includes(String(option.id));
//     }

//     return false;
//   };

//   return (
//     <View>
//       <Text style={styles.question}>
//         {question.question}
//       </Text>

//       {options.map((option: any) => {
//         let style: any = styles.option;

//         if (submitted) {
//           if (isCorrect(option)) {
//             style = [
//               styles.option,
//               styles.correctOption,
//             ];
//           } else if (
//             isSelected(option.id) &&
//             !isCorrect(option)
//           ) {
//             style = [
//               styles.option,
//               styles.wrongOption,
//             ];
//           }
//         } else if (isSelected(option.id)) {
//           style = [
//             styles.option,
//             styles.selectedOption,
//           ];
//         }

//         return (
//           <TouchableOpacity
//             key={option.id}
//             onPress={() =>
//               dispatch(
//                 selectAnswer({
//                   questionId:
//                     question.questionId,
//                   optionId: String(option.id),
//                   allowMultiple,
//                 })
//               )
//             }
//             style={style}
//           >
//             <Text style={styles.optionText}>
//               {option.text}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}

//       {/* Explanation */}
//       {submitted && question.explanation && (
//         <Text style={styles.explanation}>
//           {question.explanation}
//         </Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   question: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 20,
//   },
//   option: {
//     padding: 15,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     marginBottom: 12,
//     backgroundColor: '#fff',
//   },
//   selectedOption: {
//     borderColor: '#4CAF50',
//     backgroundColor: '#E8F5E9',
//   },
//   correctOption: {
//     borderColor: '#2E7D32',
//     backgroundColor: '#C8E6C9',
//   },
//   wrongOption: {
//     borderColor: '#D32F2F',
//     backgroundColor: '#FFCDD2',
//   },
//   explanation: {
//     marginTop: 15,
//     fontSize: 14,
//     color: '#555',
//   },
//   optionText: {
//     fontSize: 15,
//   },
// });

// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectAnswer } from '../store/slices/quizSlice';
// import { RootState } from '../store';

// interface Props {
//   question: any;
// }

// export default function QuizRenderer({ question }: Props) {
//   const dispatch = useDispatch();

//   if (!question) return null;

//   const selected =
//     useSelector((state: RootState) =>
//       state.quiz.answers?.[question.questionId] ?? []
//     );

//   const submitted =
//     useSelector((state: RootState) =>
//       state.quiz.submitted?.[question.questionId] ?? false
//     );

//   // 🔥 GENERATE OPTIONS BASED ON TYPE
//   const options =
//     question.type === 'true_false'
//       ? [
//           { id: 'true', text: 'True' },
//           { id: 'false', text: 'False' },
//         ]
//       : question.options ?? [];

//   const isSelected = (id: any) =>
//     selected.map(String).includes(String(id));

//   const isCorrect = (option: any) => {
//     if (question.type === 'true_false') {
//       return String(option.id) === String(question.correctAnswer);
//     }

//     if (question.type === 'multiple_choice') {
//       return (question.correctOptions ?? [])
//         .map(String)
//         .includes(String(option.id));
//     }

//     return false;
//   };

//   return (
//     <View>
//       <Text style={styles.question}>{question.question}</Text>

//       {options.map((option: any) => {
//         let style: any = styles.option;

//         if (submitted) {
//           if (isCorrect(option)) {
//             style = [styles.option, styles.correctOption];
//           } else if (isSelected(option.id) && !isCorrect(option)) {
//             style = [styles.option, styles.wrongOption];
//           }
//         } else if (isSelected(option.id)) {
//           style = [styles.option, styles.selectedOption];
//         }

//         return (
//           <TouchableOpacity
//             key={option.id}
//             onPress={() =>
//               dispatch(
//                 selectAnswer({
//                   questionId: question.questionId,
//                   optionId: String(option.id),
//                 })
//               )
//             }
//             style={style}
//           >
//             <Text style={styles.optionText}>{option.text}</Text>
//           </TouchableOpacity>
//         );
//       })}

//       {/* Explanation */}
//       {submitted && question.explanation && (
//         <Text style={styles.explanation}>
//           {question.explanation}
//         </Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   question: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 20,
//   },
//   option: {
//     padding: 15,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     marginBottom: 12,
//     backgroundColor: '#fff',
//   },
//   selectedOption: {
//     borderColor: '#4CAF50',
//     backgroundColor: '#E8F5E9',
//   },
//   correctOption: {
//     borderColor: '#2E7D32',
//     backgroundColor: '#C8E6C9',
//   },
//   wrongOption: {
//     borderColor: '#D32F2F',
//     backgroundColor: '#FFCDD2',
//   },
//   explanation: {
//     marginTop: 15,
//     fontSize: 14,
//     color: '#555',
//   },
//   optionText: {
//     fontSize: 15,
//   },
// });

// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectAnswer } from '../store/slices/quizSlice';
// import { RootState } from '../store';

// interface Props {
//   question: any;
// }

// export default function QuizRenderer({ question }: Props) {
//   const dispatch = useDispatch();

//   if (!question) return null;

//   const selected =
//     useSelector((state: RootState) =>
//       state.quiz.answers?.[question.questionId] ?? []
//     );

//   const submitted =
//     useSelector((state: RootState) =>
//       state.quiz.submitted?.[question.questionId] ?? false
//     );

//   // ✅ USE correctOptions (your real JSON field)
//   const correctIds = (question.correctOptions ?? []).map(String);

//   const isSelected = (id: any) =>
//     selected.map(String).includes(String(id));

//   const isCorrect = (id: any) =>
//     correctIds.includes(String(id));

//   return (
//     <View>
//       <Text style={styles.question}>{question.question}</Text>

//       {question.options?.map((option: any) => {
//         let style: any = styles.option;

//         if (submitted) {
//           if (isCorrect(option.id)) {
//             style = [styles.option, styles.correctOption];
//           } else if (isSelected(option.id) && !isCorrect(option.id)) {
//             style = [styles.option, styles.wrongOption];
//           }
//         } else if (isSelected(option.id)) {
//           style = [styles.option, styles.selectedOption];
//         }

//         return (
//           <TouchableOpacity
//             key={option.id}
//             onPress={() =>
//               dispatch(
//                 selectAnswer({
//                   questionId: question.questionId,
//                   optionId: String(option.id),
//                 })
//               )
//             }
//             style={style}
//           >
//             <Text style={styles.optionText}>{option.text}</Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   question: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 20,
//   },
//   option: {
//     padding: 15,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     marginBottom: 12,
//     backgroundColor: '#fff',
//   },
//   selectedOption: {
//     borderColor: '#4CAF50',
//     backgroundColor: '#E8F5E9',
//   },
//   correctOption: {
//     borderColor: '#2E7D32',
//     backgroundColor: '#C8E6C9',
//   },
//   wrongOption: {
//     borderColor: '#D32F2F',
//     backgroundColor: '#FFCDD2',
//   },
//   optionText: {
//     fontSize: 15,
//   },
// });

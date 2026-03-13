import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import useQuizQuestion from '../../hooks/useQuizQuestion';

export default function TrueFalseQuestion({ question }: any) {
  const { submitted, selectOption, isSelected, isCorrectOption, isCorrect } =
    useQuizQuestion(question, false);

  const options = [
    { id: 'true', text: 'True' },
    { id: 'false', text: 'False' },
  ];

  return (
    <View>
      <Text style={styles.question}>{question.question}</Text>

      <View
        style={{
          marginBottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        {options.map(option => {
          let style: any = styles.option;

          if (submitted) {
            if (isCorrectOption(option.id)) {
              style = [styles.option, styles.correct];
            } else if (isSelected(option.id)) {
              style = [styles.option, styles.wrong];
            }
          } else if (isSelected(option.id)) {
            style = [styles.option, styles.selected];
          }

          return (
            <TouchableOpacity
              key={option.id}
              style={style}
              disabled={submitted && isCorrect}
              onPress={() => selectOption(option.id)}
            >
              <Text>{option.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {submitted && question.explanation && (
        <Text style={styles.explanation}>{question.explanation}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    fontSize: 18,
    marginBottom: 20,
  },

  option: {
    marginTop: 20,
    height: '60%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#ccc',
  },

  selected: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },

  correct: {
    borderColor: '#2E7D32',
    backgroundColor: '#C8E6C9',
  },

  wrong: {
    borderColor: '#D32F2F',
    backgroundColor: '#FFCDD2',
  },
  explanation: {
    marginTop: 10,
    color: '#555',
  },
});

// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectAnswer } from '../../store/slices/quizSlice';
// import { RootState, AppDispatch } from '../../store/store';

// export default function TrueFalseQuestion({ question }: any) {
//   const dispatch = useDispatch<AppDispatch>();

//   const selected = useSelector(
//     (state: RootState) => state.quiz.answers?.[question.questionId] ?? []
//   );

//   const submitted = useSelector(
//     (state: RootState) => state.quiz.submitted?.[question.questionId] ?? false
//   );

//   const options = [
//     { id: 'true', text: 'True' },
//     { id: 'false', text: 'False' },
//   ];

//   const isSelected = (id: string) => selected.includes(id);

//   const isCorrectOption = (id: string) =>
//     String(id) === String(question.correctAnswer);

//   const questionCorrect =
//     submitted && selected.length > 0 && isCorrectOption(selected[0]);

//   return (
//     <View>
//       <Text style={styles.question}>{question.question}</Text>

//       {options.map(option => {
//         let style: any = styles.option;

//         if (submitted) {
//           if (isCorrectOption(option.id)) {
//             style = [styles.option, styles.correct];
//           } else if (isSelected(option.id)) {
//             style = [styles.option, styles.wrong];
//           }
//         } else if (isSelected(option.id)) {
//           style = [styles.option, styles.selected];
//         }

//         return (
//           <TouchableOpacity
//             key={option.id}
//             style={style}
//             disabled={questionCorrect}
//             onPress={() =>
//               dispatch(
//                 selectAnswer({
//                   questionId: question.questionId,
//                   optionId: option.id,
//                   allowMultiple: false,
//                 })
//               )
//             }
//           >
//             <Text>{option.text}</Text>
//           </TouchableOpacity>
//         );
//       })}

//       {submitted && question.explanation && (
//         <Text style={styles.explanation}>{question.explanation}</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   question: { fontSize: 18, marginBottom: 20 },

//   option: {
//     padding: 15,
//     borderWidth: 1,
//     borderRadius: 10,
//     marginBottom: 10,
//     borderColor: '#ccc',
//   },

//   selected: {
//     borderColor: '#4CAF50',
//     backgroundColor: '#E8F5E9',
//   },

//   correct: {
//     borderColor: '#2E7D32',
//     backgroundColor: '#C8E6C9',
//   },

//   wrong: {
//     borderColor: '#D32F2F',
//     backgroundColor: '#FFCDD2',
//   },

//   explanation: {
//     marginTop: 10,
//     color: '#555',
//   },
// });

// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectAnswer } from '../../store/slices/quizSlice';
// import { RootState, AppDispatch } from '../../store/store';

// export default function TrueFalseQuestion({ question }: any) {
//   const dispatch = useDispatch<AppDispatch>();

//   const selected = useSelector(
//     (state: RootState) =>
//       state.quiz.answers?.[question.questionId] ?? []
//   );

//   const submitted = useSelector(
//     (state: RootState) =>
//       state.quiz.submitted?.[question.questionId] ?? false
//   );

//   const options = [
//     { id: 'true', text: 'True' },
//     { id: 'false', text: 'False' },
//   ];

//   const isSelected = (id: string) => selected.includes(id);

//   const isCorrect = (id: string) =>
//     String(id) === String(question.correctAnswer);

//   return (
//     <View>
//       <Text style={styles.question}>{question.question}</Text>

//       {options.map(option => {
//         let style: any = styles.option;

//         if (submitted) {
//           if (isCorrect(option.id)) {
//             style = [styles.option, styles.correct];
//           } else if (isSelected(option.id)) {
//             style = [styles.option, styles.wrong];
//           }
//         } else if (isSelected(option.id)) {
//           style = [styles.option, styles.selected];
//         }

//         return (
//           <TouchableOpacity
//             key={option.id}
//             style={style}
//             disabled={submitted}
//             onPress={() =>
//               dispatch(
//                 selectAnswer({
//                   questionId: question.questionId,
//                   optionId: option.id,
//                   allowMultiple: false,
//                 })
//               )
//             }
//           >
//             <Text>{option.text}</Text>
//           </TouchableOpacity>
//         );
//       })}

//       {submitted && question.explanation && (
//         <Text style={styles.explanation}>{question.explanation}</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   question: { fontSize: 18, marginBottom: 20 },

//   option: {
//     padding: 15,
//     borderWidth: 1,
//     borderRadius: 10,
//     marginBottom: 10,
//     borderColor: '#ccc',
//   },

//   selected: {
//     borderColor: '#4CAF50',
//     backgroundColor: '#E8F5E9',
//   },

//   correct: {
//     borderColor: '#2E7D32',
//     backgroundColor: '#C8E6C9',
//   },

//   wrong: {
//     borderColor: '#D32F2F',
//     backgroundColor: '#FFCDD2',
//   },

//   explanation: {
//     marginTop: 10,
//     color: '#555',
//   },
// });

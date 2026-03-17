// import React, { useState } from "react";
// import { View } from "react-native";
// import { useSelector, useDispatch } from "react-redux";

// import AppHeader from "../../../components/AppHeader";
// import BottomNavigation from "../components/BottomNavigation";
// import ContentRenderer from "../components/ContentRenderer";
// import QuizRenderer from "../components/QuizRenderer";

// import { submitQuestion } from "../../../store/slices/quizSlice";
// import { RootState } from "../../../store/store";

// export default function LearningScreen({ route, navigation }: any) {

//   const { section } = route.params;

//   const dispatch = useDispatch();

//   const [index, setIndex] = useState(0);

//   const isQuiz = section.sectionType === "quiz";

//   const items = isQuiz
//     ? section.questions ?? []
//     : section.content ?? [];

//   const currentItem = items[index];

//   const selected = useSelector(
//     (state: RootState) =>
//       state.quiz.answers?.[currentItem?.questionId ?? ""] ?? []
//   );

//   const submitted = useSelector(
//     (state: RootState) =>
//       state.quiz.submitted?.[currentItem?.questionId ?? ""] ?? false
//   );

//   if (!currentItem) return null;

//   const isLast = index === items.length - 1;

//   /* ---------- NEXT ---------- */

//   const handleNext = () => {

//     if (!isQuiz) {

//       if (isLast) navigation.goBack();
//       else setIndex(prev => prev + 1);

//       return;
//     }

//     if (!submitted) {
//       dispatch(submitQuestion(currentItem.questionId));
//       return;
//     }

//     if (isLast) {
//       navigation.goBack();
//     } else {
//       setIndex(prev => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (index > 0) setIndex(prev => prev - 1);
//   };

//   const progress = (index + 1) / items.length;

//   return (

//     <View style={{ flex: 1 }}>

//       <AppHeader
//         title={section.title}
//         onBack={() => navigation.goBack()}
//         showProgress
//         progress={progress}
//       />

//       <View style={{ flex: 1, padding: 20 }}>

//         {isQuiz
//           ? <QuizRenderer question={currentItem} />
//           : <ContentRenderer item={currentItem} />
//         }

//       </View>

//       <BottomNavigation
//         onNext={handleNext}
//         onPrevious={handlePrevious}
//         disablePrevious={index === 0}
//         disableNext={isQuiz ? selected.length === 0 : false}
//         nextLabel={submitted ? "Next" : "Submit"}
//       />

//     </View>
//   );
// }

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppHeader from '../../../components/AppHeader';
import BottomNavigation from '../components/BottomNavigation';
import ContentRenderer from '../components/ContentRenderer';
import QuizRenderer from '../components/QuizRenderer';

import { submitQuestion } from '../../../store/slices/quizSlice';
import { RootState } from '../../../store/store';

export default function LearningScreen({ route, navigation }: any) {
  const { section } = route.params;

  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);

  const isQuiz = section.sectionType === 'quiz';

  const items = isQuiz ? section.questions ?? [] : section.content ?? [];

  const currentItem = items[index];

  const selected = useSelector(
    (state: RootState) =>
      state.quiz.answers?.[currentItem?.questionId ?? ''] ?? [],
  );

  const submitted = useSelector(
    (state: RootState) =>
      state.quiz.submitted?.[currentItem?.questionId ?? ''] ?? false,
  );

  if (!currentItem) return null;

  const isLast = index === items.length - 1;

  /* ---------- CHECK IF ANSWER CORRECT ---------- */

  const isCorrect = (() => {
    if (!isQuiz) return true;

    if (currentItem.type === 'true_false') {
      return (
        selected.length === 1 &&
        String(selected[0]) === String(currentItem.correctOptions)
      );
    }

    if (currentItem.type === 'single_choice') {
      const correctIds = (currentItem.correctOptions ?? []).map(String);

      return selected.length === 1 && correctIds.includes(String(selected[0]));
    }

    if (currentItem.type === 'image_single_choice') {
      const correctIds = (currentItem.correctOptions ?? []).map(String);

      return selected.length === 1 && correctIds.includes(String(selected[0]));
    }

    if (currentItem.type === 'multiple_choice') {
      const correctIds = currentItem.correctOptions.map(String);
      const selectedIds = selected.map(String);

      return (
        selectedIds.length === correctIds.length &&
        selectedIds.every(id => correctIds.includes(id))
      );
    }

    if (currentItem.type === 'match_pairs') {
      // handled inside component
      return submitted;
    }
    return false;
  })();

  /* ---------- NEXT BUTTON ---------- */

  const handleNext = () => {
    /* CONTENT SLIDES */
    if (!isQuiz) {
      if (isLast) {
        navigation.goBack();
      } else {
        setIndex(prev => prev + 1);
      }
      return;
    }

    /* QUIZ FLOW */

    if (!submitted) {
      dispatch(submitQuestion(currentItem.questionId));
      return;
    }

    if (!isCorrect) return;

    if (isLast) {
      navigation.goBack();
    } else {
      setIndex(prev => prev + 1);
    }
  };

  /* ---------- PREVIOUS BUTTON ---------- */

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(prev => prev - 1);
    }
  };

  /* ---------- BUTTON LABEL ---------- */

  let nextLabel = 'Next';

  if (isQuiz) {
    if (!submitted) nextLabel = 'Submit';
    else if (isLast) nextLabel = 'Finish';
    else nextLabel = 'Next';
  } else {
    nextLabel = isLast ? 'Finish' : 'Next';
  }

  const progress = (index + 1) / items.length;

  return (
    <View style={styles.container}>
      <AppHeader
        title={section.title}
        onBack={() => navigation.goBack()}
        showProgress
        progress={progress}
      />

      <View style={styles.content}>
        {isQuiz ? (
          <QuizRenderer question={currentItem} />
        ) : (
          <ContentRenderer item={currentItem} />
        )}
      </View>

      <BottomNavigation
        onNext={handleNext}
        onPrevious={handlePrevious}
        disablePrevious={index === 0}
        disableNext={isQuiz ? selected.length === 0 : false}
        nextLabel={nextLabel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    padding: 20,
  },
});

// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';

// import AppHeader from '../../../components/AppHeader';
// import BottomNavigation from '../components/BottomNavigation';
// import ContentRenderer from '../components/ContentRenderer';
// import QuizRenderer from '../components/QuizRenderer';

// import {
//   submitQuestion,
//   restoreProgress,
// } from '../../../store/slices/quizSlice';
// import { RootState } from '../../../store/store';

// import { saveProgress, loadProgress } from '../../../utils/progressStorage';

// export default function LearningScreen({ route, navigation }: any) {
//   const { section } = route.params;

//   const dispatch = useDispatch();

//   const isQuiz = section.sectionType === 'quiz';

//   const items = isQuiz ? section.questions ?? [] : section.content ?? [];

//   const [index, setIndex] = useState(0);

//   const currentItem = items[index];

//   const selected = useSelector(
//     (state: RootState) =>
//       state.quiz.answers?.[currentItem?.questionId ?? ''] ?? [],
//   );

//   const submitted = useSelector(
//     (state: RootState) =>
//       state.quiz.submitted?.[currentItem?.questionId ?? ''] ?? false,
//   );

//   const quizState = useSelector((state: RootState) => state.quiz);

//   const isLast = index === items.length - 1;

//   /* ---------- RESTORE QUIZ PROGRESS ---------- */

//   useEffect(() => {
//     if (!isQuiz) return;

//     const restore = async () => {
//       const data = await loadProgress();

//       if (data && data.currentIndex !== undefined) {
//         dispatch(restoreProgress(data));
//         setIndex(data.currentIndex);
//       }
//     };

//     restore();
//   }, [isQuiz]);

//   /* ---------- SAVE QUIZ PROGRESS ---------- */

//   useEffect(() => {
//     if (!isQuiz) return;

//     saveProgress({
//       ...quizState,
//       currentIndex: index,
//     });
//   }, [quizState, index, isQuiz]);

//   if (!currentItem) return null;

//   /* ---------- CHECK CORRECT ANSWER ---------- */

//   const isCorrect = (() => {
//     if (!isQuiz) return true;

//     if (currentItem.type === 'true_false') {
//       return (
//         selected.length === 1 &&
//         String(selected[0]) === String(currentItem.correctOptions)
//       );
//     }

//     if (currentItem.type === 'single_choice') {
//       const correctIds = (currentItem.correctOptions ?? []).map(String);

//       return selected.length === 1 && correctIds.includes(String(selected[0]));
//     }

//     if (currentItem.type === 'image_single_choice') {
//       const correctIds = (currentItem.correctOptions ?? []).map(String);

//       return selected.length === 1 && correctIds.includes(String(selected[0]));
//     }

//     if (currentItem.type === 'multiple_choice') {
//       const correctIds = (currentItem.correctOptions ?? []).map(String);
//       const selectedIds = selected.map(String);

//       return (
//         selectedIds.length === correctIds.length &&
//         selectedIds.every((id: any) => correctIds.includes(id))
//       );
//     }

//     if (currentItem.type === 'match_pairs') {
//     }

//     return false;
//   })();

//   /* ---------- NEXT BUTTON ---------- */

//   const handleNext = () => {
//     /* CONTENT SECTION */
//     if (!isQuiz) {
//       if (isLast) {
//         navigation.goBack();
//       } else {
//         setIndex(prev => prev + 1);
//       }
//       return;
//     }

//     /* QUIZ SECTION */

//     if (!submitted) {
//       dispatch(submitQuestion(currentItem.questionId));
//       return;
//     }

//     if (!isCorrect) return;

//     if (isLast) {
//       navigation.goBack();
//     } else {
//       setIndex(prev => prev + 1);
//     }
//   };

//   /* ---------- PREVIOUS BUTTON ---------- */

//   const handlePrevious = () => {
//     if (index > 0) {
//       setIndex(prev => prev - 1);
//     }
//   };

//   /* ---------- BUTTON LABEL ---------- */

//   let nextLabel = 'Next';

//   if (isQuiz) {
//     if (!submitted) nextLabel = 'Submit';
//     else if (isLast) nextLabel = 'Finish';
//     else nextLabel = 'Next';
//   } else {
//     nextLabel = isLast ? 'Finish' : 'Next';
//   }

//   const progress = (index + 1) / items.length;

//   return (
//     <View style={styles.container}>
//       <AppHeader
//         title={section.title}
//         onBack={() => navigation.goBack()}
//         showProgress
//         progress={progress}
//       />

//       <View style={styles.content}>
//         {isQuiz ? (
//           <QuizRenderer question={currentItem} />
//         ) : (
//           <ContentRenderer item={currentItem} />
//         )}
//       </View>

//       <BottomNavigation
//         onNext={handleNext}
//         onPrevious={handlePrevious}
//         disablePrevious={index === 0}
//         disableNext={isQuiz ? selected.length === 0 : false}
//         nextLabel={nextLabel}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   content: {
//     flex: 1,
//     padding: 20,
//   },
// });

// import React, { useState } from "react";
// import { View, StyleSheet } from "react-native";
// import { useDispatch, useSelector } from "react-redux";

// import AppHeader from "../../../components/AppHeader";
// import BottomNavigation from "../components/BottomNavigation";
// import ContentRenderer from "../components/ContentRenderer";
// import QuizRenderer from "../components/QuizRenderer";

// import { submitQuestion } from "../../../store/slices/quizSlice";
// import { RootState } from "../../../store/store";

// export default function LearningScreen({ route, navigation }: any) {
//   const { section } = route.params;

//   const dispatch = useDispatch();

//   const [index, setIndex] = useState(0);

//   const isQuiz = section.sectionType === "quiz";

//   const items = isQuiz ? section.questions ?? [] : section.content ?? [];

//   const currentItem = items[index];

//   const selected = useSelector(
//     (state: RootState) =>
//       state.quiz.answers?.[currentItem?.questionId ?? ""] ?? []
//   );

//   const submitted = useSelector(
//     (state: RootState) =>
//       state.quiz.submitted?.[currentItem?.questionId ?? ""] ?? false
//   );

//   if (!currentItem) return null;

//   const isLast = index === items.length - 1;

//   /* ---------- CHECK IF ANSWER CORRECT ---------- */

//   const isCorrect = (() => {
//     if (!isQuiz) return true;

//     if (currentItem.type === "true_false") {
//       return (
//         selected.length === 1 &&
//         String(selected[0]) === String(currentItem.correctOptions)
//       );
//     }

//     if (currentItem.type === "single_choice") {
//       const correctIds = (currentItem.correctOptions ?? []).map(String);

//       return selected.length === 1 && correctIds.includes(String(selected[0]));
//     }

//     if (currentItem.type === "image_single_choice") {
//       const correctIds = (currentItem.correctOptions ?? []).map(String);

//       return selected.length === 1 && correctIds.includes(String(selected[0]));
//     }

//     if (currentItem.type === "multiple_choice") {
//       const correctIds = (currentItem.correctOptions ?? []).map(String);
//       const selectedIds = selected.map(String);

//       return (
//         selectedIds.length === correctIds.length &&
//         selectedIds.every(id => correctIds.includes(id))
//       );
//     }

//     return false;
//   })();

//   /* ---------- NEXT BUTTON ---------- */

//   const handleNext = () => {
//     if (!isQuiz) {
//       if (isLast) navigation.goBack();
//       else setIndex(prev => prev + 1);
//       return;
//     }

//     /* Step 1 → Submit first */
//     if (!submitted) {
//       dispatch(submitQuestion(currentItem.questionId));
//       return;
//     }

//     /* Step 2 → If wrong stay */
//     if (!isCorrect) {
//       return;
//     }

//     /* Step 3 → Next question */
//     if (isLast) {
//       navigation.goBack();
//     } else {
//       setIndex(prev => prev + 1);
//     }
//   };

//   /* ---------- PREVIOUS BUTTON ---------- */

//   const handlePrevious = () => {
//     if (index > 0) {
//       setIndex(prev => prev - 1);
//     }
//   };

//   /* ---------- BUTTON LABEL ---------- */

//   let nextLabel = "Next";

//   if (isQuiz) {
//     if (!submitted) nextLabel = "Submit";
//     else if (isLast) nextLabel = "Finish";
//     else nextLabel = "Next";
//   } else {
//     nextLabel = isLast ? "Finish" : "Next";
//   }

//   const progress = (index + 1) / items.length;

//   return (
//     <View style={styles.container}>
//       <AppHeader
//         title={section.title}
//         onBack={() => navigation.goBack()}
//         showProgress
//         progress={progress}
//       />

//       <View style={styles.content}>
//         {isQuiz ? (
//           <QuizRenderer question={currentItem} />
//         ) : (
//           <ContentRenderer item={currentItem} />
//         )}
//       </View>

//       <BottomNavigation
//         onNext={handleNext}
//         onPrevious={handlePrevious}
//         disablePrevious={index === 0}
//         disableNext={!selected || selected.length === 0}
//         nextLabel={nextLabel}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   content: {
//     flex: 1,
//     padding: 20,
//   },
// });

// import React, { useState } from 'react';
// import { View } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { submitQuestion } from '../store/slices/quizSlice';
// import ContentRenderer from '../components/ContentRenderer';
// import QuizRenderer from '../components/QuizRenderer';
// import BottomNavigation from '../components/BottomNavigation';
// import AppHeader from '../components/AppHeader';
// import { RootState } from '../store/store';

// export default function LearningScreen({ route, navigation }: any) {
//   const { section } = route.params;

//   const dispatch = useDispatch();
//   const [index, setIndex] = useState(0);

//   const isQuiz = section.sectionType === 'quiz';

//   const items = isQuiz ? section.questions ?? [] : section.content ?? [];

//   const currentItem = items[index];

//   const selected = useSelector(
//     (state: RootState) =>
//       state.quiz.answers?.[currentItem?.questionId ?? ''] ?? []
//   );

//   const submitted = useSelector(
//     (state: RootState) =>
//       state.quiz.submitted?.[currentItem?.questionId ?? ''] ?? false
//   );

//   if (!currentItem) return null;

//   const isLast = index === items.length - 1;

//   /* ---------- CHECK CORRECT ---------- */

//   const isCorrect = (() => {
//     if (!isQuiz) return true;

//     if (currentItem.type === 'true_false') {
//       return (
//         selected.length === 1 &&
//         String(selected[0]) === String(currentItem.correctAnswer)
//       );
//     }

//     if (currentItem.type === 'multiple_choice') {
//       const correctIds = (currentItem.correctOptions ?? []).map(String);
//       const selectedIds = selected.map(String);

//       return (
//         selectedIds.length > 0 &&
//         selectedIds.length === correctIds.length &&
//         selectedIds.every(id => correctIds.includes(id))
//       );
//     }

//     return false;
//   })();

//   /* ---------- NEXT ---------- */

//   const handleNext = () => {
//     if (!isQuiz) {
//       if (isLast) {
//         navigation.goBack();
//       } else {
//         setIndex(prev => prev + 1);
//       }
//       return;
//     }

//     if (!submitted) {
//       dispatch(submitQuestion(currentItem.questionId));
//       return;
//     }

//     if (!isCorrect) return;

//     if (isLast) {
//       navigation.goBack();
//     } else {
//       setIndex(prev => prev + 1);
//     }
//   };

//   /* ---------- PREVIOUS ---------- */

//   const handlePrevious = () => {
//     if (index > 0) {
//       setIndex(prev => prev - 1);
//     }
//   };

//   /* ---------- BUTTON LABEL ---------- */

//   let nextLabel = 'Next';

//   if (isQuiz) {
//     if (!submitted) nextLabel = 'Submit';
//     else if (isLast) nextLabel = 'Finish';
//     else nextLabel = 'Next';
//   } else {
//     nextLabel = isLast ? 'Finish' : 'Next';
//   }

//   const progress = (index + 1) / items.length;

//   return (
//     <View style={{ flex: 1 }}>
//       <AppHeader
//         title={section.title}
//         onBack={() => navigation.goBack()}
//         showProgress
//         progress={progress}
//       />

//       <View style={{ flex: 1, padding: 20 }}>
//         {isQuiz ? (
//           <QuizRenderer question={currentItem} />
//         ) : (
//           <ContentRenderer item={currentItem} />
//         )}
//       </View>

//       <BottomNavigation
//         onNext={handleNext}
//         onPrevious={handlePrevious}
//         disablePrevious={index === 0}
//         disableNext={isQuiz ? selected.length === 0 : false}
//         nextLabel={nextLabel}
//       />
//     </View>
//   );
// }

// import React, { useState } from 'react';
// import { View } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';

// import AppHeader from '../components/AppHeader';
// import BottomNavigation from '../components/BottomNavigation';
// import ContentRenderer from '../components/ContentRenderer';
// import QuestionRenderer from '../components/QuestionRender';

// import { submitQuestion } from '../store/slices/quizSlice';
// import { RootState } from '../store/store';

// export default function LearningScreen({ route, navigation }: any) {
//   const { section } = route.params;

//   const dispatch = useDispatch();
//   const [index, setIndex] = useState(0);

//   const isQuiz = section.sectionType === 'quiz';

//   const items = isQuiz
//     ? section.questions ?? []
//     : section.content ?? [];

//   const currentItem = items[index];

//   const selected = useSelector((state: RootState) =>
//     state.quiz.answers?.[currentItem?.questionId ?? ''] ?? []
//   );

//   const submitted = useSelector((state: RootState) =>
//     state.quiz.submitted?.[currentItem?.questionId ?? ''] ?? false
//   );

//   if (!currentItem) return null;

//   const isLast = index === items.length - 1;

//   /* ---------------- VALIDATION ---------------- */

//   const isCorrect = (() => {
//     if (!isQuiz) return true;

//     // TRUE FALSE
//     if (currentItem.type === 'true_false') {
//       return (
//         selected.length === 1 &&
//         String(selected[0]) ===
//           String(currentItem.correctAnswer)
//       );
//     }

//     // SINGLE OR MULTIPLE CHOICE
//     if (
//       currentItem.type === 'multiple_choice' ||
//       currentItem.type === 'single_choice'
//     ) {
//       const correctIds = (
//         currentItem.correctOptions ?? []
//       ).map(String);

//       const selectedIds = selected.map(String);

//       return (
//         selectedIds.length > 0 &&
//         selectedIds.every(id =>
//           correctIds.includes(id)
//         ) &&
//         selectedIds.length === correctIds.length
//       );
//     }

//     return false;
//   })();

//   /* ---------------- NEXT BUTTON ---------------- */

//   const handleNext = () => {
//   if (!isQuiz) {
//     if (isLast) {
//       navigation.goBack();
//     } else {
//       setIndex(prev => prev + 1);
//     }
//     return;
//   }

//   // SUBMIT ANSWER
//   dispatch(submitQuestion(currentItem.questionId));

//   // CHECK RESULT
//   if (!isCorrect) return;

//   // MOVE NEXT
//   if (isLast) {
//     navigation.goBack();
//   } else {
//     setIndex(prev => prev + 1);
//   }
// };

//   // const handleNext = () => {
//   //   if (!isQuiz) {
//   //     if (isLast) {
//   //       navigation.goBack();
//   //     } else {
//   //       setIndex(prev => prev + 1);
//   //     }
//   //     return;
//   //   }

//   //   // First click = Submit
//   //   if (!submitted) {
//   //     dispatch(submitQuestion(currentItem.questionId));
//   //     return;
//   //   }

//   //   // If correct move forward
//   //   if (isCorrect) {
//   //     if (isLast) {
//   //       navigation.goBack();
//   //     } else {
//   //       setIndex(prev => prev + 1);
//   //     }
//   //   }
//   // };

//   /* ---------------- PREVIOUS BUTTON ---------------- */

//   const handlePrevious = () => {
//     if (index > 0) {
//       setIndex(prev => prev - 1);
//     }
//   };

//   /* ---------------- BUTTON LABEL ---------------- */

//   let nextLabel = 'Next';

// if (isQuiz) {
//   nextLabel = isLast ? 'Finish' : 'Next';
// } else {
//   nextLabel = isLast ? 'Finish' : 'Next';
// }

//   // let nextLabel = 'Next';

//   // if (isQuiz) {
//   //   if (!submitted) {
//   //     nextLabel = 'Submit';
//   //   } else if (isLast) {
//   //     nextLabel = 'Finish';
//   //   } else {
//   //     nextLabel = 'Next';
//   //   }
//   // } else {
//   //   nextLabel = isLast ? 'Finish' : 'Next';
//   // }

//   const progress = (index + 1) / items.length;

//   return (
//     <View style={{ flex: 1 }}>
//       <AppHeader
//         title={section.title}
//         onBack={() => navigation.goBack()}
//         showProgress
//         progress={progress}
//       />

//       <View style={{ flex: 1, padding: 20 }}>
//         {isQuiz ? (
//           <QuestionRenderer question={currentItem} />
//         ) : (
//           <ContentRenderer item={currentItem} />
//         )}
//       </View>

//       <BottomNavigation
//         onNext={handleNext}
//         onPrevious={handlePrevious}
//         disablePrevious={index === 0}
//         disableNext={isQuiz ? selected.length === 0 : false}
//         nextLabel={nextLabel}
//       />
//     </View>
//   );
// }

// import React, { useState } from 'react';
// import { View } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { submitQuestion } from '../store/slices/quizSlice';
// import ContentRenderer from '../components/ContentRenderer';
// import QuizRenderer from '../components/QuizRenderer';
// import BottomNavigation from '../components/BottomNavigation';
// import AppHeader from '../components/AppHeader';
// import { RootState } from '../store/store';
// import QuestionRenderer from '../components/QuestionRender';

// export default function LearningScreen({ route, navigation }: any) {
//   const { section } = route.params;

//   const dispatch = useDispatch();
//   const [index, setIndex] = useState(0);

//   const isQuiz = section.sectionType === 'quiz';

//   const items = isQuiz
//     ? section.questions ?? []
//     : section.content ?? [];

//   const currentItem = items[index];

//   // ✅ ALWAYS CALL HOOKS (never conditionally)

//   const selected = useSelector((state: RootState) =>
//     state.quiz.answers?.[currentItem?.questionId ?? ''] ?? []
//   );

//   const submitted = useSelector((state: RootState) =>
//     state.quiz.submitted?.[currentItem?.questionId ?? ''] ?? false
//   );

//   if (!currentItem) return null;

//   const isLast = index === items.length - 1;

//   /* ---------- VALIDATION ---------- */

//   const isCorrect = (() => {
//     if (!isQuiz) return true;

//     if (currentItem.type === 'true_false') {
//       return (
//         selected.length === 1 &&
//         String(selected[0]) ===
//           String(currentItem.correctAnswer)
//       );
//     }

//     if (currentItem.type === 'multiple_choice') {
//       const correctIds = (
//         currentItem.correctOptions ?? []
//       ).map(String);

//       const selectedIds = selected.map(String);

//       return (
//         selectedIds.length > 0 &&
//         selectedIds.every(id =>
//           correctIds.includes(id)
//         ) &&
//         correctIds.length === selectedIds.length
//       );
//     }

//     return false;
//   })();

//   /* ---------- HANDLERS ---------- */

//   // const handleNext = () => {
//   //   if (isQuiz) {
//   //     if (!submitted) {
//   //       dispatch(
//   //         submitQuestion(currentItem.questionId)
//   //       );
//   //       if (!isCorrect) return;
//   //     }

//   //     if (isLast && isCorrect) {
//   //       navigation.goBack();
//   //       return;
//   //     }

//   //     if (isCorrect) {
//   //       setIndex(prev => prev + 1);
//   //     }
//   //   } else {
//   //     if (isLast) {
//   //       navigation.goBack();
//   //     } else {
//   //       setIndex(prev => prev + 1);
//   //     }
//   //   }
//   // };

// const handleNext = () => {
//   if (!isQuiz) {
//     if (isLast) {
//       navigation.goBack();
//     } else {
//       setIndex(prev => prev + 1);
//     }
//     return;
//   }

//   // QUIZ FLOW

//   // If not submitted yet → submit first
//   if (!submitted) {
//     dispatch(submitQuestion(currentItem.questionId));
//     return;
//   }

//   // If submitted and correct → go next
//   if (isCorrect) {
//     if (isLast) {
//       navigation.goBack();
//     } else {
//       setIndex(prev => prev + 1);
//     }
//   }
// };

//   const handlePrevious = () => {
//     if (index > 0) {
//       setIndex(prev => prev - 1);
//     }
//   };

//   /* ---------- BUTTON LABEL ---------- */

//   let nextLabel = 'Next';

//   if (isQuiz) {
//     if (!submitted) {
//       nextLabel = 'Submit';
//     } else if (isLast) {
//       nextLabel = 'Finish';
//     } else {
//       nextLabel = 'Next';
//     }
//   } else {
//     nextLabel = isLast ? 'Finish' : 'Next';
//   }

//   const progress = (index + 1) / items.length;

//   return (
//     <View style={{ flex: 1 }}>
//       <AppHeader
//         title={section.title}
//         onBack={() => navigation.goBack()}
//         showProgress
//         progress={progress}
//       />

//       <View style={{ flex: 1, padding: 20 }}>
//         {isQuiz ? (
//           <QuizRenderer question={currentItem} />
//         ) : (
//           <ContentRenderer item={currentItem} />
//         )}
//       </View>

//       <BottomNavigation
//         onNext={handleNext}
//         onPrevious={handlePrevious}
//         disablePrevious={index === 0}
//         disableNext={isQuiz ? selected.length === 0 : false}
//         nextLabel={nextLabel}
//       />
//     </View>
//   );
// }

// import React, { useState, useMemo } from 'react';
// import { View } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { submitQuestion } from '../store/slices/quizSlice';
// import ContentRenderer from '../components/ContentRenderer';
// import QuizRenderer from '../components/QuizRenderer';
// import BottomNavigation from '../components/BottomNavigation';
// import AppHeader from '../components/AppHeader';
// import { RootState } from '../store';

// export default function LearningScreen({ route, navigation }: any) {
//   const { section } = route.params;

//   const dispatch = useDispatch();
//   const [index, setIndex] = useState(0);

//   const isQuiz = section.sectionType === 'quiz';

//   const items = isQuiz
//     ? section.questions ?? []
//     : section.content ?? [];

//   const currentItem = items[index];

//   if (!currentItem) return null;

//   /* ---------------- QUIZ STATE ---------------- */

//   const selected =
//     useSelector((state: RootState) =>
//       state.quiz.answers?.[currentItem.questionId] ?? []
//     );

//   const submitted =
//     useSelector((state: RootState) =>
//       state.quiz.submitted?.[currentItem.questionId] ?? false
//     );

//   const correctIds = (currentItem.correctOptions ?? []).map(String);
//   const selectedIds = selected.map(String);

//   const isCorrect =
//     selectedIds.length > 0 &&
//     selectedIds.every(id => correctIds.includes(id)) &&
//     correctIds.length === selectedIds.length;

//   const isLast = index === items.length - 1;

//   /* ---------------- HANDLERS ---------------- */

//   const handleNext = () => {
//     if (isQuiz) {
//       // Submit first
//       if (!submitted) {
//         dispatch(submitQuestion(currentItem.questionId));
//         if (!isCorrect) return;
//       }

//       // Finish if last
//       if (isLast && isCorrect) {
//         navigation.goBack();
//         return;
//       }

//       if (isCorrect) {
//         setIndex(prev => prev + 1);
//       }
//     } else {
//       // CONTENT MODE
//       if (isLast) {
//         navigation.goBack();
//       } else {
//         setIndex(prev => prev + 1);
//       }
//     }
//   };

//   const handlePrevious = () => {
//     if (index > 0) {
//       setIndex(prev => prev - 1);
//     }
//   };

//   /* ---------------- BUTTON LABEL ---------------- */

//   let nextLabel = 'Next';

//   if (isQuiz) {
//     if (!submitted) {
//       nextLabel = 'Submit';
//     } else if (isLast) {
//       nextLabel = 'Finish';
//     } else {
//       nextLabel = 'Next';
//     }
//   } else {
//     nextLabel = isLast ? 'Finish' : 'Next';
//   }

//   const progress = (index + 1) / items.length;

//   return (
//     <View style={{ flex: 1 }}>
//       <AppHeader
//         title={section.title}
//         onBack={() => navigation.goBack()}
//         showProgress
//         progress={progress}
//       />

//       <View style={{ flex: 1, padding: 20 }}>
//         {isQuiz ? (
//           <QuizRenderer question={currentItem} />
//         ) : (
//           <ContentRenderer item={currentItem} />
//         )}
//       </View>

//       <BottomNavigation
//         onNext={handleNext}
//         onPrevious={handlePrevious}
//         disablePrevious={index === 0}
//         disableNext={
//           isQuiz ? selected.length === 0 : false
//         }
//         nextLabel={nextLabel}
//       />
//     </View>
//   );
// }

// import React, { useState, useMemo } from 'react';
// import { View } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { submitQuestion } from '../store/slices/quizSlice';
// import QuizRenderer from '../components/QuizRenderer';
// import BottomNavigation from '../components/BottomNavigation';
// import AppHeader from '../components/AppHeader';
// import { RootState } from '../store';
// import ContentRenderer from '../components/ContentRenderer';

// export default function LearningScreen({ route, navigation }: any) {
//   const { section } = route.params;

//   const dispatch = useDispatch();
//   const [index, setIndex] = useState(0);

//   const questions = section?.questions ?? [];
//   const isQuiz = section.sectionType === 'quiz';

//     const currentItem = isQuiz
//     ? section.questions[index]
//     : section.content[index];

//   if (!currentItem) return null;

//   const selected =
//     useSelector((state: RootState) =>
//       state.quiz.answers?.[currentItem.questionId] ?? []
//     );

//   const submitted =
//     useSelector((state: RootState) =>
//       state.quiz.submitted?.[currentItem.questionId] ?? false
//     );

//   const correctIds = (currentItem.correctOptions ?? []).map(String);
//   const selectedIds = selected.map(String);

//   const isCorrect =
//     selectedIds.length > 0 &&
//     selectedIds.every(id => correctIds.includes(id)) &&
//     correctIds.length === selectedIds.length;

//   const isLastQuestion = index === questions.length - 1;

//   const handleNext = () => {
//     // First click = Submit
//     if (!submitted) {
//       dispatch(submitQuestion(currentItem.questionId));

//       if (!isCorrect) {
//         return; // stay on same question
//       }
//     }

//     // If last question and correct → Finish
//     if (isLastQuestion && isCorrect) {
//       navigation.goBack(); // 👈 Navigate back
//       return;
//     }

//     // Move to next
//     if (isCorrect) {
//       setIndex(prev => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (index > 0) {
//       setIndex(prev => prev - 1);
//     }
//   };

//   // const progress = (index + 1) / questions.length;
//     const total = isQuiz
//     ? section.questions?.length ?? 0
//     : section.content?.length ?? 0;
//   const progress = total > 0 ? (index + 1) / total : 0;

//   const nextLabel = !submitted
//     ? 'Submit'
//     : isLastQuestion
//     ? 'Finish'
//     : 'Next';

//   return (
//     <View style={{ flex: 1 }}>
//       <AppHeader
//         title="Test Your Knowledge"
//         onBack={() => navigation.goBack()}
//         showProgress
//         progress={progress}
//       />

//       <View style={{ flex: 1, padding: 20 }}>
//          {isQuiz ? (
//           <QuizRenderer question={currentItem} />
//         ) : (
//           <ContentRenderer item={currentItem} />
//         )}
//         {/* {isQuiz}
//         <QuizRenderer question={currentItem} /> */}
//       </View>

//       <BottomNavigation
//         onNext={handleNext}
//         onPrevious={handlePrevious}
//         disablePrevious={index === 0}
//         disableNext={selected.length === 0}
//         nextLabel={nextLabel}
//       />
//     </View>
//   );
// }

// import React, { useState } from 'react';
// import { View } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { submitQuestion } from '../store/slices/quizSlice';
// import QuizRenderer from '../components/QuizRenderer';
// import BottomNavigation from '../components/BottomNavigation';
// import AppHeader from '../components/AppHeader';
// import { RootState } from '../store';

// export default function LearningScreen({ route, navigation }: any) {
//   const { section } = route.params;

//   const dispatch = useDispatch();
//   const [index, setIndex] = useState(0);
//   const [isCorrect, setIsCorrect] = useState(false);

//   const questions = section?.questions ?? [];
//   const currentItem = questions[index];

//   if (!currentItem) return null;

//   const selected = useSelector(
//     (state: RootState) => state.quiz.answers?.[currentItem.questionId] ?? [],
//   );

//   const submitted = useSelector(
//     (state: RootState) =>
//       state.quiz.submitted?.[currentItem.questionId] ?? false,
//   );

//   // const handleNext = () => {
//   //   if (!submitted) {
//   //     dispatch(submitQuestion(currentItem.questionId));
//   //     return;
//   //   }

//   //   if (index < questions.length - 1) {
//   //     setIndex(prev => prev + 1);
//   //   }
//   // };

//   const handleNext = () => {
//     const correctIds = (currentItem.correctOptions ?? []).map(String);
//     const selectedIds = selected.map(String);

//     const isCorrect =
//       selectedIds.length > 0 &&
//       selectedIds.every(id => correctIds.includes(id)) &&
//       correctIds.length === selectedIds.length;

//     // First click = Submit
//     if (!submitted) {
//       dispatch(submitQuestion(currentItem.questionId));
//       // ❌ If wrong → DO NOT MOVE
//       if (!isCorrect) {
//         return;
//       }
//     }
//     console.log('Is Correct:', isCorrect);
//     setIsCorrect(isCorrect);

//     // ✅ Only move if correct
//     if (isCorrect && index < questions.length - 1) {
//       setIndex(prev => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (index > 0) {
//       setIndex(prev => prev - 1);
//     }
//   };

//   const progress = (index + 1) / questions.length;

//   return (
//     <View style={{ flex: 1 }}>
//       <AppHeader
//         title="Test Your Knowledge"
//         onBack={() => navigation.goBack()}
//         showProgress
//         progress={progress}
//       />

//       <View style={{ flex: 1, padding: 20 }}>
//         <QuizRenderer question={currentItem} />
//       </View>

//       <BottomNavigation
//         onNext={handleNext}
//         onPrevious={handlePrevious}
//         disablePrevious={index === 0}
//         disableNext={selected.length === 0}
//         nextLabel={submitted && isCorrect ? 'Next' : 'Submit'}
//       />
//     </View>
//   );
// }

// import React, { useState } from 'react';
// import { View } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { submitQuestion } from '../store/slices/quizSlice';
// import QuizRenderer from '../components/QuizRenderer';
// import BottomNavigation from '../components/BottomNavigation';
// import AppHeader from '../components/AppHeader';

// export default function LearningScreen({ route, navigation }: any) {
//   const { section } = route.params;

//   const dispatch = useDispatch();
//   const [index, setIndex] = useState(0);

//   const questions = section.questions;
//   const currentItem = questions[index];

//   // ✅ SAFE SELECTOR
//   const selected =
//     useSelector((state: any) =>
//       state?.quiz?.answers?.[currentItem?.questionId]
//     ) || [];

//   const submitted =
//     useSelector((state: any) =>
//       state?.quiz?.submitted?.[currentItem?.questionId]
//     ) || false;

//   const handleNext = () => {
//     if (!submitted) {
//       dispatch(submitQuestion(currentItem.questionId));
//       return;
//     }

//     if (index < questions.length - 1) {
//       setIndex(prev => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (index > 0) {
//       setIndex(prev => prev - 1);
//     }
//   };

//   const progress = (index + 1) / questions.length;

//   return (
//     <View style={{ flex: 1 }}>
//       <AppHeader
//         title="Test Your Knowledge"
//         onBack={() => navigation.goBack()}
//         showProgress
//         progress={progress}
//       />

//       <View style={{ flex: 1, padding: 20 }}>
//         <QuizRenderer question={currentItem} />
//       </View>

//       <BottomNavigation
//         onNext={handleNext}
//         onPrevious={handlePrevious}
//         disablePrevious={index === 0}
//         disableNext={selected.length === 0}
//         nextLabel={submitted ? 'Next' : 'Submit'}
//       />
//     </View>
//   );
// }

// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import ProgressBar from '../components/ProgressBar';
// import ContentRenderer from '../components/ContentRenderer';
// import QuizRenderer from '../components/QuizRenderer';
// import BottomNavigation from '../components/BottomNavigation';
// import AppHeader from '../components/AppHeader';

// import { useSelector, useDispatch } from 'react-redux';
// import { submitQuestion } from '../store/slices/quizSlice';

// export default function LearningScreen({ route, navigation }: any) {
//   const { section } = route.params;
//   const [index, setIndex] = useState(0);

//   const dispatch = useDispatch();

//   const selected =
//     useSelector((state: any) => state.quiz.answers[currentItem.questionId]) ||
//     [];

//   const submitted = useSelector(
//     (state: any) => state.quiz.submitted[currentItem.questionId],
//   );

//   const isQuiz = section.sectionType === 'quiz';

//   const total = isQuiz
//     ? section.questions?.length ?? 0
//     : section.content?.length ?? 0;

//   const currentItem = isQuiz
//     ? section.questions[index]
//     : section.content[index];

//   const progress = total > 0 ? (index + 1) / total : 0;

//   if (!currentItem) return null;

//   const handleNext = () => {
//     if (index < total - 1) {
//       setIndex(i => i + 1);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <AppHeader
//         title={section.title}
//         onBack={() => navigation.goBack()}
//         showProgress
//         progress={progress}
//       />
//       <ProgressBar progress={progress} />

//       <View style={{ flex: 1, padding: 20 }}>
//         {isQuiz ? (
//           <QuizRenderer question={currentItem} />
//         ) : (
//           <ContentRenderer item={currentItem} />
//         )}
//       </View>

//       <BottomNavigation
//         index={index}
//         total={total}
//         onNext={() => index < total - 1 && setIndex(i => i + 1)}
//         onPrev={() => index > 0 && setIndex(i => i - 1)}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   backButton: {
//     padding: 15,
//     backgroundColor: '#f5f5f5',
//   },
//   backText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

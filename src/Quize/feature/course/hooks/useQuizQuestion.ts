import { useDispatch, useSelector } from "react-redux";
import { selectAnswer } from "../../../store/slices/quizSlice";
import { RootState, AppDispatch } from "../../../store/store";

export default function useQuizQuestion(question: any, allowMultiple: boolean) {

  const dispatch = useDispatch<AppDispatch>();

  const selected = useSelector(
    (state: RootState) =>
      state.quiz.answers?.[question.questionId] ?? []
  );

  const submitted = useSelector(
    (state: RootState) =>
      state.quiz.submitted?.[question.questionId] ?? false
  );

  /* ---------- SELECT OPTION ---------- */

  const selectOption = (optionId: string) => {

    if (submitted) return;

    dispatch(
      selectAnswer({
        questionId: question.questionId,
        optionId: String(optionId),
        allowMultiple
      })
    );
  };

  /* ---------- CHECK SELECTED ---------- */

  const isSelected = (id: string) => {
    return selected.includes(String(id));
  };

  /* ---------- CHECK CORRECT OPTION ---------- */

  const isCorrectOption = (id: string) => {

    if (question.type === "true_false") {
      return String(id) === String(question.correctAnswer);
    }

    if (question.type === "multiple_choice" || question.type === "single_choice") {
      return (question.correctOptions ?? [])
        .map(String)
        .includes(String(id));
    }

    return false;
  };

  /* ---------- CHECK ANSWER CORRECT ---------- */

  const isCorrect = (() => {

    if (question.type === "true_false") {
      return (
        selected.length === 1 &&
        String(selected[0]) === String(question.correctAnswer)
      );
    }

    if (question.type === "multiple_choice") {

      const correctIds = (question.correctOptions ?? []).map(String);
      const selectedIds = selected.map(String);

      return (
        selectedIds.length === correctIds.length &&
        selectedIds.every(id => correctIds.includes(id))
      );
    }

    if (question.type === "single_choice") {

      const correctIds = (question.correctOptions ?? []).map(String);

      return (
        selected.length === 1 &&
        correctIds.includes(String(selected[0]))
      );
    }

    return false;

  })();

  return {
    submitted,
    selectOption,
    isSelected,
    isCorrectOption,
    isCorrect,
    selected
  };
}
// import { useDispatch, useSelector } from "react-redux";
// import { selectAnswer } from "../../../store/slices/quizSlice";
// import { RootState, AppDispatch } from "../../../store/store";

// export default function useQuizQuestion(question: any, allowMultiple = false) {
//   const dispatch = useDispatch<AppDispatch>();

//   const selected = useSelector(
//     (state: RootState) => state.quiz.answers?.[question.questionId] ?? []
//   );

//   const submitted = useSelector(
//     (state: RootState) => state.quiz.submitted?.[question.questionId] ?? false
//   );

//   const correctIds = question.correctOptions
//     ? question.correctOptions.map(String)
//     : [String(question.correctAnswer)];

//   const selectOption = (id: string) => {
//     dispatch(
//       selectAnswer({
//         questionId: question.questionId,
//         optionId: id,
//         allowMultiple,
//       })
//     );
//   };

//   const isSelected = (id: string) => selected.includes(String(id));

//   const isCorrectOption = (id: string) => correctIds.includes(String(id));

//   const isCorrect =
//     selected.length === correctIds.length &&
//     selected.every(id => correctIds.includes(String(id)));

//   return {
//     selected,
//     submitted,
//     selectOption,
//     isSelected,
//     isCorrectOption,
//     isCorrect,
//   };
// }

// import { useDispatch, useSelector } from "react-redux";
// import { selectAnswer } from "../store/slices/quizSlice";
// import { RootState, AppDispatch } from "../store/store";

// export default function useQuizQuestion(question: any, allowMultiple = false) {
//   const dispatch = useDispatch<AppDispatch>();

//   const selected = useSelector(
//     (state: RootState) => state.quiz.answers?.[question.questionId] ?? []
//   );

//   const submitted = useSelector(
//     (state: RootState) => state.quiz.submitted?.[question.questionId] ?? false
//   );

//   const correctIds = (question.correctOptions ?? []).map(String);

//   const selectOption = (id: string) => {
//     dispatch(
//       selectAnswer({
//         questionId: question.questionId,
//         optionId: id,
//         allowMultiple,
//       })
//     );
//   };

//   const isSelected = (id: string) => selected.includes(String(id));

//   const isCorrectOption = (id: string) => correctIds.includes(String(id));

//   const isCorrect =
//     selected.length === correctIds.length &&
//     selected.every(id => correctIds.includes(String(id)));

//   return {
//     selected,
//     submitted,
//     selectOption,
//     isSelected,
//     isCorrectOption,
//     isCorrect,
//   };
// }
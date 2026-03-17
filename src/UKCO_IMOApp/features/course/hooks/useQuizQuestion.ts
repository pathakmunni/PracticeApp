import { useDispatch, useSelector } from "react-redux";
import { selectAnswer } from "../../../store/slices/quizSlice";
import { RootState, AppDispatch } from "../../../store/store";

export default function useQuizQuestion(question: any, allowMultiple = false) {
  const dispatch = useDispatch<AppDispatch>();

  const selected = useSelector(
    (state: RootState) => state.quiz.answers?.[question.questionId] ?? []
  );

  const submitted = useSelector(
    (state: RootState) => state.quiz.submitted?.[question.questionId] ?? false
  );

  const correctIds = (question.correctOptions ?? []).map(String);

  const selectOption = (id: string) => {
    dispatch(
      selectAnswer({
        questionId: question.questionId,
        optionId: id,
        allowMultiple,
      })
    );
  };

  const isSelected = (id: string) => selected.includes(String(id));

  const isCorrectOption = (id: string) => correctIds.includes(String(id));

  const isCorrect =
    selected.length === correctIds.length &&
    selected.every(id => correctIds.includes(String(id)));

  return {
    selected,
    submitted,
    selectOption,
    isSelected,
    isCorrectOption,
    isCorrect,
  };
}
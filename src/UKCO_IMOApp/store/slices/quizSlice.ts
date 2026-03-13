import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  answers: {},
  submitted: {},
  currentIndex: 0,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {

    selectAnswer: (state, action) => {
      const { questionId, optionId, allowMultiple } = action.payload;

      if (!state.answers[questionId]) {
        state.answers[questionId] = [];
      }

      if (allowMultiple) {
        const exists = state.answers[questionId].includes(optionId);

        if (exists) {
          state.answers[questionId] =
            state.answers[questionId].filter(id => id !== optionId);
        } else {
          state.answers[questionId].push(optionId);
        }
      } else {
        state.answers[questionId] = [optionId];
      }
    },

    submitQuestion: (state, action) => {
      state.submitted[action.payload] = true;
    },

    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },

    restoreProgress: (state, action) => {
      return action.payload;
    },

    resetQuiz: () => initialState,
  },
});

export const {
  selectAnswer,
  submitQuestion,
  setCurrentIndex,
  restoreProgress,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;


// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface QuizState {
//   answers: {
//     [questionId: string]: string[];
//   };
//   submitted: {
//     [questionId: string]: boolean;
//   };
// }

// interface SelectAnswerPayload {
//   questionId: string;
//   optionId: string;
//   allowMultiple: boolean;
// }

// const initialState: QuizState = {
//   answers: {},
//   submitted: {},
// };

// const quizSlice = createSlice({
//   name: 'quiz',
//   initialState,
//   reducers: {
//     selectAnswer: (
//       state,
//       action: PayloadAction<SelectAnswerPayload>
//     ) => {
//       const { questionId, optionId, allowMultiple } =
//         action.payload;

//       if (!state.answers[questionId]) {
//         state.answers[questionId] = [];
//       }

//       if (allowMultiple) {
//         const exists =
//           state.answers[questionId].includes(optionId);

//         if (exists) {
//           state.answers[questionId] =
//             state.answers[questionId].filter(
//               id => id !== optionId
//             );
//         } else {
//           state.answers[questionId].push(optionId);
//         }
//       } else {
//         state.answers[questionId] = [optionId];
//       }

//       // reset submit when user changes answer
//       state.submitted[questionId] = false;
//     },

//     submitQuestion: (
//       state,
//       action: PayloadAction<string>
//     ) => {
//       state.submitted[action.payload] = true;
//     },
//   },
// });

// export const { selectAnswer, submitQuestion } =
//   quizSlice.actions;

// export default quizSlice.reducer;


// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface QuizState {
//   answers: {
//     [questionId: string]: string[];
//   };
//   submitted: {
//     [questionId: string]: boolean;
//   };
// }

// const initialState: QuizState = {
//   answers: {},
//   submitted: {},
// };

// const quizSlice = createSlice({
//   name: 'quiz',
//   initialState,
//   reducers: {
//     selectAnswer: (
//       state,
//       action: PayloadAction<{ questionId: string; optionId: string }>
//     ) => {
//       const { questionId, optionId } = action.payload;

//       // Single select question
//       state.answers[questionId] = [optionId];

//       // ✅ Reset submitted so user can retry
//       state.submitted[questionId] = false;
//     },

//     submitQuestion: (state, action: PayloadAction<string>) => {
//       state.submitted[action.payload] = true;
//     },
//   },
// });

// export const { selectAnswer, submitQuestion } = quizSlice.actions;
// export default quizSlice.reducer;

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface QuizState {
//   answers: {
//     [questionId: string]: string[];
//   };
//   submitted: {
//     [questionId: string]: boolean;
//   };
// }

// const initialState: QuizState = {
//   answers: {},
//   submitted: {},
// };

// const quizSlice = createSlice({
//   name: 'quiz',
//   initialState,
//   reducers: {
//     selectAnswer: (
//       state,
//       action: PayloadAction<{ questionId: string; optionId: string }>
//     ) => {
//       const { questionId, optionId } = action.payload;

//       if (!state.answers[questionId]) {
//         state.answers[questionId] = [];
//       }

//       const exists = state.answers[questionId].includes(optionId);

//       if (exists) {
//         state.answers[questionId] =
//           state.answers[questionId].filter(id => id !== optionId);
//       } else {
//         state.answers[questionId].push(optionId);
//       }
//     },

//     submitQuestion: (state, action: PayloadAction<string>) => {
//       state.submitted[action.payload] = true;
//     },
//   },
// });

// export const { selectAnswer, submitQuestion } = quizSlice.actions;
// export default quizSlice.reducer;
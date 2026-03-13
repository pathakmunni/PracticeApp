import { createSlice } from '@reduxjs/toolkit'

interface QuizState {
  answers: Record<string, any>
  submitted: Record<string, boolean>
  score: number
}

const initialState: QuizState = {
  answers: {},
  submitted: {},
  score: 0,
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {

    selectAnswer(state, action) {
      const { questionId, value } = action.payload
      state.answers[questionId] = value
    },

    submitQuestion(state, action) {
      state.submitted[action.payload] = true
    },

    increaseScore(state) {
      state.score += 1
    },

    resetQuiz(state) {
      state.answers = {}
      state.submitted = {}
      state.score = 0
    }

  }
})

export const {
  selectAnswer,
  submitQuestion,
  increaseScore,
  resetQuiz
} = quizSlice.actions

export default quizSlice.reducer
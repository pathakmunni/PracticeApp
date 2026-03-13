import { createSlice } from '@reduxjs/toolkit'

interface ProgressState {

  units: Record<
    string,
    {
      completedSections: number[]
      quizCompleted: boolean
    }
  >
}

const initialState: ProgressState = {
  units: {},
}

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {

    completeSection(state, action) {

      const { unitId, sectionIndex } = action.payload

      if (!state.units[unitId]) {
        state.units[unitId] = {
          completedSections: [],
          quizCompleted: false,
        }
      }

      if (
        !state.units[unitId].completedSections.includes(sectionIndex)
      ) {
        state.units[unitId].completedSections.push(sectionIndex)
      }

    },

    completeQuiz(state, action) {

      const { unitId } = action.payload

      if (!state.units[unitId]) {
        state.units[unitId] = {
          completedSections: [],
          quizCompleted: true,
        }
      }

      state.units[unitId].quizCompleted = true
    },

  },
})

export const { completeSection, completeQuiz } =
  progressSlice.actions

export default progressSlice.reducer
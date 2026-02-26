// import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// interface LearningState {
//   currentUnitId?: string
//   currentSectionId?: string
//   currentSlideId?: string
//   lastVisited?: {
//     unitId: string
//     sectionId: string
//     slideId: string
//   }
// }

// const initialState: LearningState = {}

// const learningSlice = createSlice({
//   name: 'learning',
//   initialState,
//   reducers: {
//     setCurrentSlide: (
//       state,
//       action: PayloadAction<{
//         unitId: string
//         sectionId: string
//         slideId: string
//       }>
//     ) => {
//       state.currentUnitId = action.payload.unitId
//       state.currentSectionId = action.payload.sectionId
//       state.currentSlideId = action.payload.slideId

//       state.lastVisited = action.payload
//     },
//   },
// })

// export const { setCurrentSlide } = learningSlice.actions
// export default learningSlice.reducer


import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LearningState {
  currentUnitId?: string
  currentSectionId?: string
  currentSlideId?: string
}

const initialState: LearningState = {}

const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    setCurrentSlide: (
      state,
      action: PayloadAction<{
        unitId: string
        sectionId: string
        slideId: string
      }>
    ) => {
      state.currentUnitId = action.payload.unitId
      state.currentSectionId = action.payload.sectionId
      state.currentSlideId = action.payload.slideId
    },
    clearLearning: state => {
      state.currentUnitId = undefined
      state.currentSectionId = undefined
      state.currentSlideId = undefined
    },
  },
})

export const { setCurrentSlide, clearLearning } =
  learningSlice.actions

export default learningSlice.reducer

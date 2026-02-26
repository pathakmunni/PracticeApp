// import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// interface ProgressState {
//   [unitId: string]: {
//     [sectionId: string]: {
//       [slideId: string]: {
//         completed: boolean
//       }
//     }
//   }
// }

// const initialState: ProgressState = {}

// const progressSlice = createSlice({
//   name: 'progress',
//   initialState,
//   reducers: {
//     markSlideCompleted: (
//       state,
//       action: PayloadAction<{
//         unitId: string
//         sectionId: string
//         slideId: string
//       }>
//     ) => {
//       const { unitId, sectionId, slideId } =
//         action.payload

//       if (!state[unitId]) state[unitId] = {}
//       if (!state[unitId][sectionId])
//         state[unitId][sectionId] = {}

//       state[unitId][sectionId][slideId] = {
//         completed: true,
//       }
//     },
//   },
// })

// export const { markSlideCompleted } =
//   progressSlice.actions
// export default progressSlice.reducer


import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SlideProgress {
  completed: boolean
}

interface ProgressState {
  [unitId: string]: {
    [sectionId: string]: {
      [slideId: string]: SlideProgress
    }
  }
}

const initialState: ProgressState = {}

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    markSlideComplete: (
      state,
      action: PayloadAction<{
        unitId: string
        sectionId: string
        slideId: string
      }>
    ) => {
      const { unitId, sectionId, slideId } =
        action.payload

      if (!state[unitId]) state[unitId] = {}
      if (!state[unitId][sectionId])
        state[unitId][sectionId] = {}

      state[unitId][sectionId][slideId] = {
        completed: true,
      }
    },
  },
})

export const { markSlideComplete } =
  progressSlice.actions

export default progressSlice.reducer

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface ProgressState {
//   completedSections: Record<string, boolean>;
// }

// const initialState: ProgressState = {
//   completedSections: {},
// };

// const progressSlice = createSlice({
//   name: 'progress',
//   initialState,
//   reducers: {
//     markSectionComplete: (state, action: PayloadAction<string>) => {
//       state.completedSections[action.payload] = true;
//     },
//   },
// });

// export const { markSectionComplete } = progressSlice.actions;
// export default progressSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  completedSlides: {},
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {

    markSlideComplete: (state, action) => {
      const { slideId } = action.payload;

      state.completedSlides[slideId] = true;
    },

    restoreProgress: (state, action) => {
      return action.payload;
    },

  },
});

export const { markSlideComplete, restoreProgress } =
  progressSlice.actions;

export default progressSlice.reducer;
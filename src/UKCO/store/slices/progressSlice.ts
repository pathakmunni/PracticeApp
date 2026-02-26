import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProgressState {
  completedSlides: Record<string, boolean>;
}

const initialState: ProgressState = {
  completedSlides: {},
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    markSlideComplete: (state, action: PayloadAction<string>) => {
      state.completedSlides[action.payload] = true;
    },
    resetProgress: state => {
      state.completedSlides = {};
    },
  },
});

export const { markSlideComplete, resetProgress } = progressSlice.actions;
export default progressSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProgressState {
  completedSections: Record<string, boolean>;
}

const initialState: ProgressState = {
  completedSections: {},
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    markSectionComplete: (state, action: PayloadAction<string>) => {
      state.completedSections[action.payload] = true;
    },
  },
});

export const { markSectionComplete } = progressSlice.actions;
export default progressSlice.reducer;
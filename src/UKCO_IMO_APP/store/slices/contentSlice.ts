import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContent } from '../../api/contentApi';
import { AppContent } from '../../types/contentTypes';

export const loadContent = createAsyncThunk<AppContent>(
  'content/load',
  async () => {
    return await fetchContent();
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    data: null as AppContent | null,
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadContent.pending, state => {
        state.loading = true;
      })
      .addCase(loadContent.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      });
  },
});

export default contentSlice.reducer;
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchContent } from '../../api/contentApi';

// export const loadContent = createAsyncThunk(
//   'content/load',
//   async () => {
//     return await fetchContent();
//   }
// );

// const contentSlice = createSlice({
//   name: 'content',
//   initialState: {
//     units: [],
//     loading: false,
//   },
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(loadContent.pending, state => {
//         state.loading = true;
//       })
//       .addCase(loadContent.fulfilled, (state, action) => {
//         state.units = action.payload.units;
//         state.loading = false;
//       });
//   },
// });

// export default contentSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContent } from '../../api/contentApi';

export const loadContent = createAsyncThunk(
  'content/loadContent',
  async () => {
    return await fetchContent();
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    units: [],
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadContent.pending, state => {
        state.loading = true;
      })
      .addCase(loadContent.fulfilled, (state, action) => {
        state.units = action.payload.units;
        state.loading = false;
      })
      .addCase(loadContent.rejected, state => {
        state.loading = false;
      });
  },
});

export default contentSlice.reducer;
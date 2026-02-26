import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Unit } from '../../types/courseTypes'
import { fetchCourse } from '../../services/courseService'

interface HomeState {
  units: Unit[]
  loading: boolean
  error: string | null
}

const initialState: HomeState = {
  units: [],
  loading: false,
  error: null,
}

export const loadCourse = createAsyncThunk(
  'home/loadCourse',
  async () => {
    return await fetchCourse()
  }
)

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setUnits: (state, action: PayloadAction<Unit[]>) => {
      state.units = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadCourse.pending, state => {
        state.loading = true
      })
      .addCase(loadCourse.fulfilled, (state, action) => {
        state.loading = false
        state.units = action.payload
      })
  },
})

export const { setUnits } = homeSlice.actions

export default homeSlice.reducer

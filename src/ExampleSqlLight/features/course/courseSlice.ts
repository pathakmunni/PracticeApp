import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/* ========= TYPES ========= */

export interface Page {
  id: string
  type: string
  question?: string
  options?: string[]
  correctAnswer?: any
}

export interface Topic {
  id: string
  title: string
  pages: Page[]
}

export interface Section {
  id: string
  title: string
  topics: Topic[]
}

export interface Unit {
  id: string
  title: string
  sections: Section[]
}

interface CourseState {
  units: Unit[]
}

const initialState: CourseState = {
  units: [],
}

/* ========= SLICE ========= */

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourse: (state, action: PayloadAction<Unit[]>) => {
      state.units = action.payload
    },
    clearCourse: state => {
      state.units = []
    },
  },
})

export const { setCourse, clearCourse } = courseSlice.actions
export default courseSlice.reducer

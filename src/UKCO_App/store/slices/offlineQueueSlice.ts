import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({

  name: 'offlineQueue',

  initialState: {
    actions: []
  },

  reducers: {

    addOfflineAction(state, action) {
      state.actions.push(action.payload)
    },

    clearQueue(state) {
      state.actions = []
    }

  }

})

export const { addOfflineAction, clearQueue } = slice.actions
export default slice.reducer
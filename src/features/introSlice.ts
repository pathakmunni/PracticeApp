import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Intro {
  id: string;
  name: string;
  description: string;
}

interface IntroState {
  intros: Intro[];
}

const initialState: IntroState = {
  intros: [],
};

const introSlice = createSlice({
  name: 'intro',
  initialState,
  reducers: {
    addIntro: (state, action: PayloadAction<Omit<Intro, 'id'>>) => {
      const newIntro: Intro = { id: Date.now().toString(), ...action.payload };
      state.intros.push(newIntro);
    },
    editIntro: (state, action: PayloadAction<Intro>) => {
      const index = state.intros.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) state.intros[index] = action.payload;
    },
    deleteIntro: (state, action: PayloadAction<string>) => {
      state.intros = state.intros.filter((i) => i.id !== action.payload);
    },
  },
});

export const { addIntro, editIntro, deleteIntro } = introSlice.actions;
export default introSlice.reducer;

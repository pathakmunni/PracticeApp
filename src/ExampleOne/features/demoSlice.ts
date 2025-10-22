import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DemoItem {
  id: number;
  title: string;
}

interface DemoState {
  items: DemoItem[];
  selectedItem: DemoItem | null;
}

const initialState: DemoState = {
  items: [],
  selectedItem: null,
};

const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<DemoItem[]>) {
      state.items = action.payload;
    },
    setSelectedItem(state, action: PayloadAction<DemoItem | null>) {
      state.selectedItem = action.payload;
    },
    clearItems(state) {
      state.items = [];
      state.selectedItem = null;
    },
  },
});

export const { setItems, setSelectedItem, clearItems } = demoSlice.actions;
export default demoSlice.reducer;
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface DashboardState {
  foodList: string[];
}
const initialState: DashboardState = {
  foodList: [],
};
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setFoodList: (state, action: PayloadAction<string[]>) => {
      state.foodList = action.payload;
    },
    removeFoodItem: (state, action: PayloadAction<string>) => {
      state.foodList = state.foodList.filter(item => item !== action.payload);
    },
  },
});
export const {setFoodList, removeFoodItem} = dashboardSlice.actions;
export default dashboardSlice.reducer;
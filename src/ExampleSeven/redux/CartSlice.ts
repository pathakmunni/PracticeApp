// src/ExampleSeven/redux/CartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity?: number;
}

interface CartState {
  items: FoodItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<FoodItem>) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface CartItem {
//   id: string;
//   name: string;
//   category?: string;
//   price: number;
//   image?: string;
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     // payload is an item (without quantity) added from FoodList
//     addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
//       const payload = action.payload;
//       const existing = state.items.find(i => i.id === payload.id);
//       if (existing) {
//         existing.quantity += 1;
//       } else {
//         state.items.push({ ...payload, quantity: 1 });
//       }
//     },
//     incrementQty: (state, action: PayloadAction<string>) => {
//       const id = action.payload;
//       const item = state.items.find(i => i.id === id);
//       if (item) item.quantity += 1;
//     },
//     decrementQty: (state, action: PayloadAction<string>) => {
//       const id = action.payload;
//       const item = state.items.find(i => i.id === id);
//       if (item) {
//         item.quantity -= 1;
//         if (item.quantity <= 0) {
//           state.items = state.items.filter(i => i.id !== id);
//         }
//       }
//     },
//     removeFromCart: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter(i => i.id !== action.payload);
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const { addToCart, incrementQty, decrementQty, removeFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;



// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface FoodItem {
//   id: string;
//   name: string;
//   price: number;
// }

// interface CartState {
//   items: FoodItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<FoodItem>) => {
//       state.items.push(action.payload);
//     },
//     removeFromCart: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter(item => item.id !== action.payload);
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;


// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<CartItem>) => {
//       const item = state.items.find(i => i.id === action.payload.id);
//       if (item) {
//         item.quantity += 1;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 });
//       }
//     },
//     removeFromCart: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter(i => i.id !== action.payload);
//     },
//     clearCart: state => {
//       state.items = [];
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

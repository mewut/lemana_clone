import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICart, ICartItem } from '../types';

interface CartState {
  cart: ICart | null;
}

const initialState: CartState = {
  cart: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICart>) {
      state.cart = action.payload;
    },
    removeFromCart(state) {
      state.cart = null;
    },
    updateCartItem(state, action: PayloadAction<ICartItem>) {
      if (state.cart) {
        const itemIndex = state.cart.items.findIndex(item => item.id === action.payload.id);
        if (itemIndex !== -1) {
          state.cart.items[itemIndex] = action.payload;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;

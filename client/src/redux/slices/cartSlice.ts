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
    /**
     * Добавляет корзину в состояние.
     * @param state - Текущее состояние.
     * @param action - Действие с payload типа ICart.
     */
    addToCart(state, action: PayloadAction<ICart>) {
      state.cart = action.payload;
    },

    /**
     * Очищает корзину в состоянии.
     * @param state - Текущее состояние.
     */
    removeFromCart(state) {
      state.cart = null;
    },

    /**
     * Обновляет элемент в корзине.
     * @param state - Текущее состояние.
     * @param action - Действие с payload типа ICartItem.
     */
    updateCartItem(state, action: PayloadAction<ICartItem>) {
      if (state.cart) {
        const itemIndex = state.cart.items.findIndex(item => item.id === action.payload.id);
        if (itemIndex !== -1) {
          state.cart.items[itemIndex] = action.payload;
        } else {
          console.warn(`Item with id ${action.payload.id} not found in the cart.`);
        }
      } else {
        console.warn('Cart is not initialized.');
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;

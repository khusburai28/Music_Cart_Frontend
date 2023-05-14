import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer(
  {},
  {
    AddToCartRequest: (state, action) => {
      state.loading = true;
    },
    AddToCartSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    AddToCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    ViewCartItemRequest: (state, action) => {
      state.loading = true;
    },
    ViewCartItemSuccess: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.cartItems;
      state.bill = action.payload.bill;
    },
    ViewCartItemFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    PlaceOrderRequest: (state, action) => {
      state.loading = true;
    },
    PlaceOrderSuccess: (state, action) => {
      state.loading = false;
      state.cartItems = [];
      state.bill = {};
      state.message = action.payload;
    },
    PlaceOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);

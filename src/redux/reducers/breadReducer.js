import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  bread: [
    {
      name: "Home",
      path: "/home",
    },
  ],
};

export const breadReducer = createReducer(initialState, {
  PushBread: (state, action) => {
    state.bread = [...state.bread, action.payload];
  },
  GotoIndexBread: (state, action) => {
    state.bread = state.bread.slice(0, action.payload);
  },
  ResetBread: (state, action) => {
    state.bread = initialState.bread;
  },
});
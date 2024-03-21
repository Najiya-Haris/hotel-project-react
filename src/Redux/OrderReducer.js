import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  orderDetails: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState: INITIAL_STATE,
  reducers: {
    getOrderDetails: (state, action) => {
      console.log("action payload", action.payload);
      const orderDetails = action.payload;
      return { ...state, orderDetails: orderDetails };
    },
  },
});

export const { getOrderDetails } = orderSlice.actions;

export default orderSlice.reducer;

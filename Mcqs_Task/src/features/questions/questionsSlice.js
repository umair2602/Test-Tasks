import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../db";

const initialState = {
  qs: db.data,
  pageCount: 0,
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setNextPage: (state) => {
      state.pageCount++;
    },
    setPreviousPage: (state) => {
      state.pageCount--;
    },
    continuePageCountTo: (state, action) => {
      state.pageCount = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNextPage, setPreviousPage, continuePageCountTo } =
  questionsSlice.actions;
export default questionsSlice.reducer;

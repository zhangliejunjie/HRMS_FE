import { createSlice } from "@reduxjs/toolkit";
// axios
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";

const initialState = {
  message: "",
  error: null,
  success: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    success: (state, action) => {
      state.message = action.payload;
      state.error = true;
      state.success = false;
    },
    error: (state, action) => {
      state.message = action.payload;
      state.error = false;
      state.success = true;
    },
  },
});
export const { reducer: notificationReducer } = notificationSlice;
export const { success, error } = notificationSlice.actions;

export default notificationReducer;

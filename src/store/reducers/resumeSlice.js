import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resumeList: [],
};

export const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    addResume: (state, action) => {
      state.resumeList.push(action.payload);
    },
  },
});

export const { reducer: resumeReducer } = resumeSlice;
export const { addResume } = resumeSlice.actions;

export default resumeReducer;

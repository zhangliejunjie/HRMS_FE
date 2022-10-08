import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";
const initialState = {
  candidates: {},
  loading: null,
  error: null,
};

export const createCandidate = createAsyncThunk(
  "candidate/create",
  async (params, thunkAPI) => {}
);
export const getAllCandidate = createAsyncThunk(
  "candidate/getAllCandidate",
  async (params, thunkAPI) => {
    console.log(params);
    const res = await axios.post(
      "http://localhost:8000/api/candidate/memberID",
      {
        id: params.id,
      }
    );
    console.log(res.data);
    return res.data;
  }
);
export const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllCandidate.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllCandidate.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [getAllCandidate.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.candidates = action.payload;
    },
  },
});
export const { reducer: candidateReducer } = candidateSlice;

export default candidateReducer;

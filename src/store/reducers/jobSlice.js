import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  jobs: [
    {
      name: null,
      description: null,
      salary: null,
      quantity: null,
      start_date: null,
      end_date: null,
      status: null,
      isRemote: null,
      Category_id: null,
      Campaign_id: null,
    },
  ],
  error: null,
  loading: null,
};

export const getJobList = createAsyncThunk(
  "job/job-list",
  async (params, thunkAPI) => {
    const res = await axios.get("http://localhost:8000/api/job");
    return res.data;
  }
);

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: {
    [getJobList.pending]: (state) => {
      state.loading = true;
    },
    [getJobList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getJobList.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.jobs = action.payload.jobs;
    },
  },
});

const { reducer: jobReducer } = jobSlice;

export default jobReducer;

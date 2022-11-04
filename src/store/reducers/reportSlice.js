import { createAsyncThunk, createSlice } from "@reduxjs/toolkit/dist";
import { error } from "./notificationSlice";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";
const initialState = {
  loading: null,
  report: null,
  error: null,
};

export const getReport = createAsyncThunk(
  "report/getReport",
  async (params, thunkAPI) => {
    try {
      console.log(params);
      const { data } = await axios.post(
        "http://localhost:8000/api/report/member",
        {
          member_id: params,
        }
      );
      console.log(params);
      return data;
    } catch (err) {
      // thunkAPI.dispatch(error(err.response.data.message));
    }
  }
);

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: {
    [getReport.pending]: (state) => {
      state.loading = true;
      state.report = null;
    },
    [getReport.rejected]: (state, action) => {
      state.loading = false;
      state.report = null;
      state.error = action.payload;
    },
    [getReport.fulfilled]: (state, action) => {
      state.loading = false;
      state.report = action.payload;
      state.error = null;
    },
  },
});

export const { reducer: reportReducer } = reportSlice;

export default reportReducer;

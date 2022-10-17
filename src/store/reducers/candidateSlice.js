import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getJobList } from "./jobSlice";
import { success, error } from "./notificationSlice";
axios.defaults.headers.post["Content-Type"] = "application/json";
const initialState = {
  candidates: [],
  candidateByUser: [],
  loading: null,
  error: null,
};

export const createCandidate = createAsyncThunk(
  "candidate/create",
  async (params, thunkAPI) => {
    const res = await axios
      .post("http://localhost:8000/api/candidate", {
        member: params.member,
        my_resume_url: params.my_resume_url,
        job_id: params.job_id,
      })
      .then(() => {
        thunkAPI.dispatch(success("Apply successfully"));
        thunkAPI.dispatch(getJobList());
      })
      .catch((err) => {
        thunkAPI.dispatch(error(err.response.data.message));
      });

    return res.data;
  }
);
// export const getAllCandidateByUser = createAsyncThunk(
//   "candidate/getAllCandidateByUser",
//   async (params, thunkAPI) => {
//     const res = await axios.post(
//       "http://localhost:8000/api/candidate/memberID",
//       {
//         id: params.id,
//       }
//     );
//     return res.data;
//   }
// );
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
    // phan nay bi lap lai
    // [getAllCandidateByUser.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [getAllCandidateByUser.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    //   state.candidateByUser = null;
    // },
    // [getAllCandidateByUser.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.candidateByUser = action.payload;
    // },
  },
});
export const { reducer: candidateReducer } = candidateSlice;

export default candidateReducer;

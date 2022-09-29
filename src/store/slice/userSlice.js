import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// axios
import axios from "axios";
import { getTokenCookie, getAuthHeader } from "../../utils/tool";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const login = createAsyncThunk(
  "user/login",
  async (params, thunkAPI) => {
    const res = await axios.post(
      "http://localhost:8000/api/member-auth/login",
      {
        email: params.email,
        password: params.password,
      }
    );
    const { member } = res.data;
    console.log(member);
    return member;
  }
);
export const userIsAuth = createAsyncThunk("user/auth", async () => {
  if (!getTokenCookie()) {
    console.log("dont have cookie");
    throw new Error();
  }
  const user = await axios.get(
    "http://localhost:8000/api/member-auth/isauth",
    getAuthHeader()
  );
  return user.data.member;
});
const initialState = {
  member: {
    id: null,
    email: null,
    fullname: null,
    password: null,
    avatar: null,
    current_resume_url: null,
    status: "Inactive",
  },
  auth: false,
  loading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // auth: (state, action) => {
    //   state.member = action.payload.member;
    //   state.auth = action.payload.auth;
    // },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.auth = false;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.member = action.payload;
      state.auth = true;
    },
    [userIsAuth.pending]: (state) => {
      state.loading = true;
    },
    [userIsAuth.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.auth = false;
    },
    [userIsAuth.fulfilled]: (state, action) => {
      state.loading = false;
      state.member = action.payload;
      state.auth = true;
    },
  },
});

const { reducer: userReducer } = userSlice;
export default userReducer;

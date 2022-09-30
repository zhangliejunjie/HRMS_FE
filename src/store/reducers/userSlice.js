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
    console.log(res.data);
    const { member, token } = res.data;

    return { member, token };
  }
);
export const userIsAuth = createAsyncThunk("user/auth", async () => {
  if (!getTokenCookie()) {
    // console.log("dont have cookie");
    throw new Error();
  }
  const user = await axios.get(
    "http://localhost:8000/api/member-auth/isauth",
    getAuthHeader()
  );
  return user.data.member;
});

export const register = createAsyncThunk(
  "user/register",
  async (params, thunkAPI) => {
    const res = await axios.post(
      "http://localhost:8000/api/member-auth/register",
      {
        email: params.email,
        password: params.password,
        fullname: params.fullname,
      }
    );
    console.log(res.data);
    const { member, token } = res.data;

    return { member, token };
  }
);
export const update = createAsyncThunk(
  "user/update",
  async (params, thunkAPI) => {
    const res = await axios.patch(
      "http://localhost:8000/api/member/profile",
      params.data,
      { headers: { Authorization: `Bearer ${params.token}` } }
    );
    return res.data;
  }
);
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
  token: null,
  auth: false,
  loading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    auth: (state, action) => {
      state.member = action.payload.member;
      state.auth = action.payload.auth;
    },
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
      state.member = action.payload.member;
      state.token = action.payload.token;
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
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.auth = false;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.member = action.payload.member;
      state.token = action.payload.token;
      state.auth = true;
    },
    [update.pending]: (state) => {
      state.loading = true;
    },
    [update.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [update.fulfilled]: (state, action) => {
      state.loading = false;
      state.member = action.payload;
      state.auth = true;
    },
  },
});

const { reducer: userReducer } = userSlice;

export const { auth } = userSlice.actions;

export default userReducer;

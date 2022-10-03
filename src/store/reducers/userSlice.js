import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// axios
import axios from "axios";
import storage from "redux-persist/lib/storage";
import {
  getTokenCookie,
  getAuthHeader,
  removeTokenCookie,
} from "../../utils/tool";
axios.defaults.headers.post["Content-Type"] = "application/json";
import { success, error } from "./notificationSlice";

export const logout = createAsyncThunk(
  "user/logout",
  async (params, thunkAPI) => {
    try {
      removeTokenCookie();
      // localStorage.removeItem('')
      storage.removeItem("persist:root");

      await thunkAPI.dispatch(success("Good bye"));
    } catch (error) {
      await thunkAPI.dispatch(error(error.message));
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (params, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/member-auth/login",
        {
          email: params.email,
          password: params.password,
        }
      );

      const { member, token } = res.data;
      if (token) {
        await thunkAPI.dispatch(success("Đăng nhập thành công"));
      }

      return { member, token };
    } catch (err) {
      console.log(err);
      await thunkAPI.dispatch(error(err.response.data.message));
      // reject("Error with user login");
    }
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
    [logout.pending]: (state) => {
      state.loading = true;
    },
    [logout.rejected]: (state) => {
      state.loading = false;
      state.auth = true;
    },
    [logout.fulfilled]: (state) => {
      state.loading = false;
      state.member = initialState.member;
      state.auth = false;
    },
  },
});

const { reducer: userReducer } = userSlice;

export const { auth } = userSlice.actions;

export default userReducer;

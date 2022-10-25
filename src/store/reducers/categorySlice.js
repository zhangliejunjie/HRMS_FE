import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  categories: [],
  error: null,
  loading: null,
};

export const getCategories = createAsyncThunk(
  "category/get-categories",
  async (params, thunkAPI) => {
    const res = await axios.get("http://localhost:8000/api/category");
    return res.data;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: {
    [getCategories.pending]: (state) => {
      state.loading = true;
    },
    [getCategories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.categories = action.payload.categories;
    },
  },
});

const { reducer: categoryReducer } = categorySlice;

export default categoryReducer;

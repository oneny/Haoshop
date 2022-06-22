import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  lookbooks: [],
  lookbook: {},
  relatedProducts: [],
  isLoading: false,
  error: null,
};

export const getLookbooks = createAsyncThunk(
  "lookbook/getLookbooks",
  async (dummny, thunkAPI) => {
    try {
      const res = await axios.get("/lookbooks");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getLookbook = createAsyncThunk(
  "lookbook/getLookbook",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/lookbooks/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getNewLookbook = createAsyncThunk(
  "lookbook/getNewLookbook",
  async (thunkAPI) => {
    try {
      const res = await axios.get("/lookbooks/new");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
)

const lookbookSlice = createSlice({
  name: "lookbook",
  initialState,
  reducers: {},
  extraReducers: {
    // lookbook/getLookbooks
    [getLookbooks.pending]: (state) => {
      state.isLoading = true;
    },
    [getLookbooks.fulfilled]: (state, action) => {
      state.lookbooks = action.payload.lookbooks;
      state.isLoading = false;
    },
    [getLookbooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    // lookbook/getLookbook
    [getLookbook.pending]: (state) => {
      state.isLoading = true;
    },
    [getLookbook.fulfilled]: (state, action) => {
      state.lookbook = action.payload.lookbook;
      state.relatedProducts = action.payload.relatedProducts;
      state.isLoading = false;
    },
    [getLookbook.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },
    // lookbook/getNewLookbook
    [getNewLookbook.pending]: (state) => {
      state.isLoading = true;
    },
    [getNewLookbook.fulfilled]: (state, action) => {
      state.lookbooks = action.payload.lookbooks;
      state.isLoading = false;
    },
    [getNewLookbook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    }
  }
});

export default lookbookSlice.reducer;
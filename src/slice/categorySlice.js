import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";

const initialState = {
  categories: [], // 계층화된 카테고리
  linearCategories: [], // 일자형 카테고리
  isLoading: false,
  // currentCategory: [], // 현재 카테고리
  // currentPath: "", // 부모에서 자식 카테고리까지 경로
  categoryOpen: false,
};

// 계층화된 카테고리(categories) -> 일자형으로 linearCategories에 저장
export const createLinearCategory = (categories, linearCategories = []) => {
  for (let category of categories) {
    linearCategories.push(category);
    if (category.children.length > 0)
      // 자식 카테고리가 있는 경우 자식들 전부 linearCategories에 저장
      createLinearCategory(category.children, linearCategories);
  }
  return linearCategories;
};

// 계층화된 카테고리 get
export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (thunkAPI) => {
    try {
      const res = await axios.get("/categories");
      return res.data; // 계층화된 카테고리 반환
    } catch (err) {
      thunkAPI.rejectedWithValue(err.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // setCurrentStatus: (state, action) => {
    //   state.currentPath = action.payload.key;
    //   state.currentCategory = action.payload.category;
    // },
    categoryToggle: (state) => {
      state.categoryOpen = !state.categoryOpen;
    },
  },
  extraReducers: {
    [getCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.linearCategories = createLinearCategory(action.payload);
      state.isLoading = false;
    },
    [getCategories.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {
  setCurrentStatus,
  categoryToggle,
  categoryClose,
} = categorySlice.actions;

export default categorySlice.reducer;

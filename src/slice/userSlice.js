import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance";
import { clearCart } from "./cartSlice";

const initialState = {
  addresses: [],
  orders: [],
  // latestOrder: {},
  // orderDetails: {},
  isLoading: false,
};

export const getAddress = createAsyncThunk( // 사용자 주소록 가져오기
  "user/getAddress",
  async (uid, thunkAPI) => {
    try {
      const res = await axios.get(`/address/${uid}`);
      return res.data; // userAddress 반환
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const upsertAddress = createAsyncThunk( // 사용자 주소록 업데이트
  "user/upsertAddress",
  async (address, thunkAPI) => {
    try {
      const user = JSON.parser(localStorage.getItem("user")); // 로컬 스토리지로부터 파싱
      const res = await axios.patch(`/address`, { user, address });
      return res.data; // 업데이트한 userAddress 값 반환
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addOrder = createAsyncThunk(
  "user/addOrder",
  async (order, thunkAPI) => {
    try {
      const res = await axios.post(`/orders`, order);
      if (res.status === 201) thunkAPI.dispatch(clearCart()); // 주문 성공하면 카트 비우기
      return res.data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getOrders = createAsyncThunk(
  "user/getOrders",
  async (uid, thunkAPI) => {
    try {
      const res = await axios.get(`/orders/user/${uid}`);
      // orders의 _id, paymentStatus, paymentType, orderStatus, items의 _id, name, productImg
      return res.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // user/getAddress
    [getAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [getAddress.fulfilled]: (state, action) => {
      state.addresses = action.payload.userAddress.address;
      state.isLoading = false;
    },
    [getAddress.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // user/upsertAddress
    [upsertAddress.pending]: (state) => {
      state.isLoading = true;
    },
    [upsertAddress.fulfilled]: (state, action) => {
      state.address = action.payload.userAddress.address;
      state.isLoading = false;
    },
    [upsertAddress.rejected]: (state) => {
      state.isLoading = false;
    },
    // user/addOrder
    [addOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [addOrder.fulfilled]: (state) => {

    },
    // user/getOrders
    [getOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrders.fulfilled]: (state, action) => {
      state.orders = action.payload.orders;
      state.isLoading = false;
    },
    [getOrders.rejected]: (state) => {
      state.isLoading = false;
    },
  }
});

export default userSlice.reducer;

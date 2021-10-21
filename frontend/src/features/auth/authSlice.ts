import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface authState {
  value: number;
  status: "idle" | "loading" | "failed";
}

const initialState = {};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},

  extraReducers: (builder) => {},
});

export default authSlice.reducer;

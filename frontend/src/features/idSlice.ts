import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

const initialState = {
  id: 0,
};

export const idSlice = createSlice({
  name: "id",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    resetId: (state, action: PayloadAction<number>) => {
      state.id = initialState.id;
    },
  },
});

export const { setId, resetId } = idSlice.actions;

export const selectId = (state: RootState) => state.id;

export default idSlice.reducer;

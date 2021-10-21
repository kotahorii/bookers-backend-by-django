import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BookState } from "../../types/bookTypes";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState: BookState = {
  editedBook: {
    id: "",
    title: "",
    body: "",
    book_image: null,
  },
  selectedBook: {
    id: "",
    title: "",
    body: "",
    book_image: null,
    created_at: "",
    updated_at: "",
    reader: 0,
    reader_username: "",
  },
};

export const bookSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    
  },

  extraReducers: (builder) => {},
});

export default bookSlice.reducer;

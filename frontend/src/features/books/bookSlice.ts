import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { BookState, PostBook, ReadBook } from "../../types/bookTypes";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchAsyncNewBook = createAsyncThunk(
  "book/post",
  async (newBook: PostBook) => {
    const uploadData = new FormData();
    uploadData.append("title", newBook.title);
    newBook.body && uploadData.append("body", newBook.body);
    newBook.book_image &&
      uploadData.append(
        "book_image",
        newBook.book_image,
        newBook.book_image.name
      );
    const res = await axios.post<ReadBook[]>(`${apiUrl}api/book/`, uploadData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);
export const fetchAsyncUpdateBook = createAsyncThunk(
  "book/put",
  async (editBook: PostBook) => {
    const uploadData = new FormData();
    uploadData.append("title", editBook.id);
    editBook.body && uploadData.append("body", editBook.body);
    editBook.book_image &&
      uploadData.append(
        "book_image",
        editBook.book_image,
        editBook.book_image.name
      );
    const res = await axios.put(
      `${apiUrl}api/book/${editBook.id}`,
      uploadData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

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
  name: "book",
  initialState,
  reducers: {
    setEditedBook: (state, action: PayloadAction<PostBook>) => {
      state.editedBook = action.payload;
    },
    setSelectedBook: (state, action: PayloadAction<ReadBook>) => {
      state.selectedBook = action.payload;
    },
    resetEditedBook: (state) => {
      state.editedBook = initialState.editedBook;
    },
    resetSelectBook: (state) => {
      state.selectedBook = initialState.selectedBook;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAsyncNewBook.rejected, (state) => {
      window.location.href = "login/";
    });
    builder.addCase(fetchAsyncUpdateBook.rejected, (state) => {
      window.location.href = "login/";
    });
  },
});

export const {
  setEditedBook,
  setSelectedBook,
  resetEditedBook,
  resetSelectBook,
} = bookSlice.actions;
export const selectEditedBook = (state: RootState) => state.book.editedBook;
export const selectSelectedBook = (state: RootState) => state.book.selectedBook;
export default bookSlice.reducer;

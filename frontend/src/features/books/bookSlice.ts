import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { BookState, PostBook, ReadBook } from "../../types/bookTypes";
import { apiUrl } from "../../url";

export const fetchAsyncNewBook = createAsyncThunk(
  "book/post",
  async (newBook: Omit<PostBook, "id">) => {
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
    uploadData.append("title", editBook.title);
    uploadData.append("body", editBook.body);
    editBook.book_image &&
      uploadData.append(
        "book_image",
        editBook.book_image,
        editBook.book_image.name
      );
    const res = await axios.put(
      `${apiUrl}api/book/${editBook.id}/`,
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
  isOpenEditedModal: false,
  isOpenSelectedModal: false,
  editedBook: {
    id: "",
    title: "",
    body: "",
    book_image: null,
  },
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setEditedBook: (state, action: PayloadAction<PostBook>) => {
      state.editedBook = action.payload;
    },
    resetEditedBook: (state) => {
      state.editedBook = initialState.editedBook;
    },
    openEditedModal: (state) => {
      state.isOpenEditedModal = true;
    },
    closeEditedModal: (state) => {
      state.isOpenEditedModal = false;
    },
    openSelectedModal: (state) => {
      state.isOpenSelectedModal = true;
    },
    closeSelectedModal: (state) => {
      state.isOpenSelectedModal = false;
    },
  },
});

export const {
  setEditedBook,
  resetEditedBook,
  openEditedModal,
  openSelectedModal,
  closeEditedModal,
  closeSelectedModal,
} = bookSlice.actions;

export const selectEditedBook = (state: RootState) => state.book.editedBook;
export const selectIsOpenEditedModal = (state: RootState) =>
  state.book.isOpenEditedModal;
export const selectIsOpenSelectedModal = (state: RootState) =>
  state.book.isOpenSelectedModal;
export default bookSlice.reducer;

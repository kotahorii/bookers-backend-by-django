export type FormInputBook = {
  title: string;
  body: string;
};
export type PostBook = {
  id: string;
  title: string;
  body: string;
  book_image: File | null;
};
export type ReadBook = {
  id: string;
  title: string;
  body: string;
  book_image: string | undefined;
  created_at: string;
  updated_at: string;
  reader: number;
  reader_username: string;
};
export type BookState = {
  isOpenEditedModal: boolean;
  isOpenSelectedModal: boolean;
  editedBook: PostBook;
};

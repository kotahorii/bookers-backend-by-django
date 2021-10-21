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

import { memo } from "react";
import { useQueryBooks } from "../../hooks/book/useQueryBooks";
import { BookCard } from "../molecules/BookCard";

export const AllBook = memo(() => {
  const { data: books } = useQueryBooks();
  return (
    <>
      {books?.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </>
  );
});

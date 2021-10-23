import { VFC, memo } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectId } from "../../../features/idSlice";
import { useQueryBooks } from "../../../hooks/book/useQueryBooks";
import { BookCard } from "../../molecules/BookCard";

export const SelectedUsersBook: VFC = memo(() => {
  const { data: books } = useQueryBooks();
  const id = useAppSelector(selectId);
  const usersBooks = books?.filter((book) => book.reader === id);
  return (
    <>
      {usersBooks?.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </>
  );
});

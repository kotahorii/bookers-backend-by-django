import { Flex, Heading, Stack } from "@chakra-ui/layout";
import { VFC, memo } from "react";
import { useQueryBooks } from "../../../hooks/book/useQueryBooks";
import { BookCard } from "../../organisms/BookCard";
import { SideBar } from "../../organisms/SideBar";

export const BookList: VFC = memo(() => {
  const { data: books } = useQueryBooks();
  return (
    <>
      <SideBar />
      <Stack spacing="5" align="center" w="full" direction="column">
        <Heading textAlign="center" color="gray.600">
          BookList
        </Heading>
        {books?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </Stack>
    </>
  );
});

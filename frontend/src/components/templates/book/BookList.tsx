import { Heading } from "@chakra-ui/layout";
import { VFC, memo } from "react";

export const BookList: VFC = memo(() => {
  return (
    <>
      <Heading textAlign="center" color="gray.600">
        BookList
      </Heading>
    </>
  );
});

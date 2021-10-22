import { Box } from "@chakra-ui/layout";
import { VFC } from "react";
import { ReadBook } from "../../types/bookTypes";

type Props = {
  book: ReadBook;
};
export const BookCard: VFC<Props> = ({ book }) => {
  return (
    <>
      <Box w="60%" h="200px" bg="white" borderRadius="lg" boxShadow="md">
        
      </Box>
    </>
  );
};

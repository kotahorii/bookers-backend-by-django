import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { VFC } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { setId } from "../../features/idSlice";
import { useQueryMyProf } from "../../hooks/auth/useQueryMyProf";
import { useMutationBooks } from "../../hooks/book/useMutateBooks";
import { ReadBook } from "../../types/bookTypes";

type Props = {
  book: ReadBook;
};
export const BookCard: VFC<Props> = ({ book }) => {
  const { deleteBookMutation } = useMutationBooks();
  const { data: myprof } = useQueryMyProf();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClickUsername = () => {
    dispatch(setId(book.reader));
    navigate(`/books/${book.reader}`);
  };
  const deleteBook = () => {
    deleteBookMutation.mutate(book.id);
  };
  return (
    <>
      <Box
        w={{ md: "60%", base: "80%" }}
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        p="3"
      >
        <Stack>
          <Text
            color="gray.600"
            fontWeight="bold"
            fontSize="20px"
            textAlign="center"
          >
            Title: {book.title}
          </Text>
          <Stack direction="row" justify="center">
            <Stack justify="space-between" maxW="50%" minW="50%">
              <Text>Body: {book.body}</Text>
              {myprof?.user_profile === book.reader && (
                <Flex direction="row">
                  <Button bg="transparent" _hover={{ bg: "gray.50" }}>
                    Edit
                  </Button>
                  <Button
                    bg="transparent"
                    _hover={{ bg: "gray.50" }}
                    onClick={deleteBook}
                  >
                    Delete
                  </Button>
                </Flex>
              )}
            </Stack>

            <Stack spacing="0.5">
              <Image
                src={book.book_image}
                fit="cover"
                maxH="100px"
                borderRadius="lg"
              />
              <Text fontSize="14px" color="gray.500">
                Created At: {book.created_at}
              </Text>
              <Button
                fontSize="14px"
                color="gray.600"
                bg="transparent"
                _hover={{ bg: "gray.50" }}
                _focus={{ boxShadow: "none" }}
                size="xs"
                onClick={onClickUsername}
              >
                Username: {book.reader_username}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

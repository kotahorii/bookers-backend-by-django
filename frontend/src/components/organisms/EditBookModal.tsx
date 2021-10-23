import { memo, VFC, ChangeEvent, useState, FormEvent } from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import Icon from "@chakra-ui/icon";
import { Input } from "@chakra-ui/input";
import { Stack, Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectEditedProf } from "../../features/auth/authSlice";
import {
  closeEditedModal,
  selectEditedBook,
  selectIsOpenEditedModal,
} from "../../features/books/bookSlice";
import { BsCardImage, BsFillImageFill } from "react-icons/bs";

export const EditBookModal = memo(() => {
  const [bookImg, setBookImg] = useState<File | null>(null);

  const isOpenEditModal = useAppSelector(selectIsOpenEditedModal);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const editedBook = useAppSelector(selectEditedBook);

  const handlerInputBook = () => {
    const fileInput = document.getElementById("bookImage");
    fileInput?.click();
  };

  const clickInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    setBookImg(e.target.files![0]);
    console.log("input");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Modal
        isOpen={isOpenEditModal}
        onClose={() => dispatch(closeEditedModal())}
      >
        <ModalOverlay />
        <ModalContent px="8" pb="8" bg="gray.50">
          <ModalHeader textAlign="center">Edit Book</ModalHeader>
          <ModalBody>
            <form onSubmit={onSubmit}>
              <Stack spacing="4">
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    variant="flushed"
                    type="text"
                    value={editedBook.title}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Body</FormLabel>
                  <Input
                    variant="flushed"
                    type="text"
                    value={editedBook.body}
                  />
                </FormControl>
                <Stack spacing="5">
                  <Stack direction="row" mb="3" align="center" spacing="5">
                    <Stack direction="row" mb="3" align="center" spacing="5">
                      <input
                        accept=".png, .jpg, 'jpeg"
                        type="file"
                        id="bookImage"
                        hidden={true}
                        onChange={clickInputFile}
                      />
                      <Icon
                        onClick={handlerInputBook}
                        as={bookImg ? BsFillImageFill : BsCardImage}
                        fontSize="22px"
                        cursor="pointer"
                        color="gray.500"
                        _hover={{ color: "gray.600" }}
                      />
                      <Text textAlign="center">{bookImg?.name}</Text>
                    </Stack>
                  </Stack>
                  <Button
                    type="submit"
                    bg="blue.400"
                    color="white"
                    _hover={{ bg: "blue.500" }}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});

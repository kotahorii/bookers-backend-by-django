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
import {
  closeEditedModal,
  fetchAsyncUpdateBook,
  resetEditedBook,
  selectEditedBook,
  selectIsOpenEditedModal,
  setEditedBook,
} from "../../features/books/bookSlice";
import { BsCardImage, BsFillImageFill } from "react-icons/bs";
import { useQueryBooks } from "../../hooks/book/useQueryBooks";
import { useNavigate } from "react-router";

export const EditBookModal: VFC = memo(() => {
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const { refetch } = useQueryBooks();

  const isOpenEditModal = useAppSelector(selectIsOpenEditedModal);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const editedBook = useAppSelector(selectEditedBook);

  const handlerEditPicture = () => {
    const fileInput = document.getElementById("imageBook");
    fileInput?.click();
    console.log(image);
  };

  const clickInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files![0]);
    console.log(image);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await dispatch(
      fetchAsyncUpdateBook({
        id: editedBook.id,
        book_image: image,
        title: editedBook.title,
        body: editedBook.body,
      })
    );
    if (fetchAsyncUpdateBook.fulfilled.match(res)) {
      dispatch(resetEditedBook());
      setImage(null);
      dispatch(closeEditedModal());
      refetch();
      toast({
        title: "Book Updated.",
        description: "Success to update your book",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      navigate("login/");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value: string = e.target.value;
    const name = e.target.name;
    dispatch(setEditedBook({ ...editedBook, [name]: value }));
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
            <input
              accept=".png, .jpg, 'jpeg"
              type="file"
              id="imageBook"
              hidden={true}
              onChange={clickInputFile}
            />
            <form onSubmit={onSubmit}>
              <Stack spacing="4">
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    variant="flushed"
                    type="text"
                    value={editedBook.title}
                    onChange={handleInputChange}
                    name="title"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Body</FormLabel>
                  <Input
                    variant="flushed"
                    type="text"
                    value={editedBook.body}
                    onChange={handleInputChange}
                    name="body"
                  />
                </FormControl>
                <Stack spacing="5">
                  <Stack direction="row" mb="3" align="center" spacing="5">
                    <Stack direction="row" mb="3" align="center" spacing="5">
                      <Icon
                        onClick={handlerEditPicture}
                        as={image ? BsFillImageFill : BsCardImage}
                        fontSize="22px"
                        cursor="pointer"
                        color="gray.500"
                        _hover={{ color: "gray.600" }}
                      />
                      <Text textAlign="center">{image?.name}</Text>
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

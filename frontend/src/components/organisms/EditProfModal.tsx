import { VFC, memo, useState, ChangeEvent } from "react";
import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Stack, Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  resetIsOpenEditModal,
  selectIsOpenProfEditModal,
} from "../../features/auth/authSlice";
import Icon from "@chakra-ui/icon";
import { BsCardImage } from "react-icons/bs";
import { BsFillImageFill } from "react-icons/bs";

export const EditProfModal: VFC = memo(() => {
  const dispatch = useAppDispatch();
  const isOpenProfEditModal = useAppSelector(selectIsOpenProfEditModal);
  const [file, setFile] = useState<File | null>(null);

  const handlerInputPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput?.click();
  };

  const clickInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  };

  return (
    <>
      <Modal
        isOpen={isOpenProfEditModal}
        onClose={() => dispatch(resetIsOpenEditModal())}
      >
        <ModalOverlay />
        <ModalContent px="8" pb="8" bg="gray.50">
          <ModalHeader textAlign="center">Edit Prof</ModalHeader>
          <ModalBody>
            <form>
              <Stack spacing="4">
                <FormControl>
                  <Input
                    placeholder="Introduction"
                    variant="flushed"
                    type="text"
                  />
                </FormControl>
                <Stack spacing="5">
                  <Stack direction="row" mb="3" align="center">
                    <input
                      accept=".png, .jpg, 'jpeg"
                      type="file"
                      id="imageInput"
                      hidden={true}
                      onChange={clickInputFile}
                    />
                    <Icon
                      onClick={handlerInputPicture}
                      as={file ? BsFillImageFill : BsCardImage}
                      fontSize="22px"
                      cursor="pointer"
                      color="gray.500"
                      _hover={{ color: "gray.600" }}
                    />
                    <Text textAlign="center">{file?.name}</Text>
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

import { VFC, memo, useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
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
  fetchAsyncUpdateProf,
  resetEditProf,
  resetIsOpenEditModal,
  selectEditedProf,
  selectIsOpenProfEditModal,
  setEditProf,
} from "../../features/auth/authSlice";
import Icon from "@chakra-ui/icon";
import { BsCardImage } from "react-icons/bs";
import { BsFillImageFill } from "react-icons/bs";
import { useToast } from "@chakra-ui/react";
import { useQueryMyProf } from "../../hooks/auth/useQueryMyProf";
import { useNavigate } from "react-router";

export const EditProfModal: VFC = memo(() => {
  const { refetch } = useQueryMyProf();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const editedProf = useAppSelector(selectEditedProf);
  const isOpenProfEditModal = useAppSelector(selectIsOpenProfEditModal);
  const [profImg, setProfImg] = useState<File | null>(null);
  const toast = useToast();

  const handlerInputProf = () => {
    const fileInput = document.getElementById("profImgInput");
    fileInput?.click();
  };

  const clickInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    setProfImg(e.target.files![0]);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await dispatch(
      fetchAsyncUpdateProf({
        id: editedProf.id,
        img: profImg,
        introduction: editedProf.introduction,
      })
    );
    if (fetchAsyncUpdateProf.fulfilled.match(res)) {
      dispatch(resetEditProf());
      setProfImg(null);
      dispatch(resetIsOpenEditModal());
      refetch();
      toast({
        title: "Profile Updated.",
        description: "Success to Create your prof",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      navigate("login/");
    }
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setEditProf({
        ...editedProf,
        introduction: e.target.value,
      })
    );
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
            <form onSubmit={onSubmit}>
              <Stack spacing="4">
                <FormControl>
                  <FormLabel>Introduction</FormLabel>
                  <Input
                    variant="flushed"
                    type="text"
                    value={editedProf.introduction}
                    onChange={handleChangeInput}
                  />
                </FormControl>
                <Stack spacing="5">
                  <Stack direction="row" mb="3" align="center" spacing="5">
                    <input
                      accept=".png, .jpg, 'jpeg"
                      type="file"
                      id="profImgInput"
                      hidden={true}
                      onChange={clickInputFile}
                    />
                    <Icon
                      onClick={handlerInputProf}
                      as={profImg ? BsFillImageFill : BsCardImage}
                      fontSize="22px"
                      cursor="pointer"
                      color="gray.500"
                      _hover={{ color: "gray.600" }}
                    />
                    <Text textAlign="center">{profImg?.name}</Text>
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

import { VFC, useState, ChangeEvent, memo } from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Input } from "@chakra-ui/input";
import { Heading, Stack, Text } from "@chakra-ui/layout";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsCardImage } from "react-icons/bs";
import { BsFillImageFill } from "react-icons/bs";
import * as yup from "yup";
import { FormInputBook } from "../../../types/bookTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../../app/hooks";
import {
  setEditProf,
  setIsOpenEditModal,
} from "../../../features/auth/authSlice";
import { EditProfModal } from "../auth/EditProfModal";
import { useQueryMyProf } from "../../../hooks/auth/useQueryMyProf";
import { fetchAsyncNewBook } from "../../../features/books/bookSlice";
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router";
import { useQueryBooks } from "../../../hooks/book/useQueryBooks";
import { EditBookModal } from "./EditBookModal";
import { useQueryProfs } from "../../../hooks/auth/useQueryProfs";
import { setId } from "../../../features/idSlice";
import { AiTwotoneSetting } from "react-icons/ai";
import { IoMdCreate } from "react-icons/io";

export const SideBar: VFC = memo(() => {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { data: profs } = useQueryProfs();
  const { data: myprof } = useQueryMyProf();
  const { refetch: refetchBooks } = useQueryBooks();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const handlerInputPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput?.click();
  };
  /* eslint-disable */
  const num = location.pathname.split("/").slice(-1)[0];
  const path = location.pathname.split("/")[1];
  /* eslint-enable */
  const selectedProf =
    num === "" || path === "users"
      ? myprof
      : profs?.filter((prof) => prof.user_profile === Number(num))[0];

  const clickInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  };

  const schema = yup.object({
    title: yup.string().required().min(2).max(30),
    text: yup.string().max(140),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<FormInputBook>({ resolver: yupResolver(schema) });

  const openEditProfModal = () => {
    dispatch(setIsOpenEditModal());
    if (myprof) {
      dispatch(
        setEditProf({
          id: myprof.id,
          img: null,
          introduction: myprof.introduction,
        })
      );
    }
  };

  const onSubmit: SubmitHandler<FormInputBook> = async (data) => {
    const res = await dispatch(
      fetchAsyncNewBook({
        title: data.title,
        body: data.body,
        book_image: file,
      })
    );
    if (fetchAsyncNewBook.fulfilled.match(res)) {
      toast({
        title: "NewBook created.",
        description: "Success to create new book",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setValue("title", "");
      setValue("body", "");
      setFile(null);
      navigate("books");
      refetchBooks();
    } else {
      navigate("login/");
    }
  };

  const searchMyBook = () => {
    if (selectedProf === myprof && myprof) {
      dispatch(setId(myprof.user_profile));
      navigate(`/books/${myprof.user_profile}`);
    }
  };

  return (
    <>
      <Stack flex="1" spacing={{ base: 5, md: 10 }} h="100vh">
        <Heading color="gray.600" as="h6" size="lg" textAlign="center">
          User
        </Heading>
        <Stack px="5">
          <Stack
            cursor="pointer"
            onClick={searchMyBook}
            _hover={{ bg: "gray.100" }}
            direction="row"
            align="center"
            spacing="5"
            maxW="300px"
            borderRadius="lg"
            p="2"
          >
            <Avatar src={selectedProf?.img} />
            <Text
              fontSize="20px"
              fontWeight="bold"
              color="gray.600"
              maxW="300px"
            >
              {selectedProf?.user_profile_username}
            </Text>
          </Stack>
          <Stack spacing="3">
            <Text fontSize="18px">Introduction:</Text>
            <Text maxW="300px" fontSize="18px">
              {selectedProf?.introduction}
            </Text>
            <Button
              boxShadow="md"
              _focus={{ boxShadow: "none" }}
              onClick={openEditProfModal}
              color="white"
              bg="gray.300"
              _hover={{ bg: "gray.400" }}
            >
              <Icon as={AiTwotoneSetting} mr="1" />
              Edit Prof
            </Button>
          </Stack>
          <Stack spacing="5" py="5">
            <Input
              variant="flushed"
              placeholder="Title"
              {...register("title")}
            />
            <Text color="pink.400">{errors.title?.message}</Text>
            <Input variant="flushed" placeholder="Body" {...register("body")} />
            <Text color="pink.400">{errors.body?.message}</Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack>
                <Stack direction="row" mb="3">
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
                  boxShadow="lg"
                  type="submit"
                  isLoading={isSubmitting}
                  color="white"
                  bg="teal.400"
                  _hover={{ bg: "teal.500" }}
                >
                  <Icon as={IoMdCreate} mr="1" />
                  Create
                </Button>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Stack>
      <EditProfModal />
      <EditBookModal />
    </>
  );
});

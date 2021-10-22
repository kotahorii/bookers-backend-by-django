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
import { FormInputBook } from "../../types/bookTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../app/hooks";
import { setEditProf, setIsOpenEditModal } from "../../features/auth/authSlice";
import { EditProfModal } from "./EditProfModal";
import { useQueryMyProf } from "../../hooks/auth/useQueryMyProf";
import { fetchAsyncNewBook } from "../../features/books/bookSlice";
import { useToast } from "@chakra-ui/toast";

export const SideBar: VFC = memo(() => {
  const [file, setFile] = useState<File | null>(null);
  const { data: myprof, refetch } = useQueryMyProf();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const handlerInputPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput?.click();
  };

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

  const onSubmit: SubmitHandler<FormInputBook> = (data) => {
    dispatch(
      fetchAsyncNewBook({
        title: data.title,
        body: data.body,
        book_image: file,
      })
    );
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
            _hover={{ bg: "gray.100" }}
            direction="row"
            align="center"
            spacing="5"
            maxW="300px"
            borderRadius="lg"
            p="2"
          >
            <Avatar src={myprof?.img} />
            <Text
              fontSize="20px"
              fontWeight="bold"
              color="gray.600"
              maxW="300px"
            >
              {myprof?.user_profile_username}
            </Text>
          </Stack>
          <Stack spacing="3">
            <Text fontSize="18px">Introduction:</Text>
            <Text maxW="300px" fontSize="18px">
              {myprof?.introduction}
            </Text>
            <Button
              boxShadow="md"
              onClick={openEditProfModal}
              color="white"
              bg="gray.300"
              _hover={{ bg: "gray.400" }}
            >
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
                  bg="blue.400"
                  _hover={{ bg: "blue.500" }}
                >
                  Create
                </Button>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Stack>
      <EditProfModal refetch={refetch} />
    </>
  );
});

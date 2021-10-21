import { VFC, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "../../types/loginTypes";
import { useNavigate } from "react-router";
import { Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useAppDispatch } from "../../app/hooks";
import {
  fetchAsyncCreateProf,
  fetchAsyncLogin,
  fetchAsyncRegister,
} from "../../features/auth/authSlice";

export const Auth: VFC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (isLogin) {
      await dispatch(fetchAsyncLogin(data));
      await navigate("books/");
    } else {
      const res = await dispatch(fetchAsyncRegister(data));
      if (fetchAsyncRegister.fulfilled.match(res)) {
        await dispatch(fetchAsyncLogin(data));
        await dispatch(fetchAsyncCreateProf());
        await navigate("books/");
      }
    }
  };
  const toggleIsLogin = () => setIsLogin(!isLogin);

  return (
    <>
      <Flex minH="100vh" align="center" justify="center" bg="gray.50">
        <Stack
          spacing="4"
          w="full"
          maxW="md"
          bg="white"
          rounded="xl"
          boxShadow="lg"
          p="6"
          my="12"
        >
          <Heading lineHeight="1.1" fontSize={{ base: "2xl", md: "3xl" }}>
            Enter new password
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input variant="flushed" {...register("username")} />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  variant="flushed"
                  type="password"
                  {...register("password")}
                />
              </FormControl>
              <Stack spacing="5" py="5">
                <Text
                  cursor="pointer"
                  textAlign="center"
                  color="blue.500"
                  onClick={toggleIsLogin}
                >
                  {isLogin ? "Login" : "SignUp"}
                </Text>
                <Button
                  isLoading={isSubmitting}
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
        </Stack>
      </Flex>
    </>
  );
};

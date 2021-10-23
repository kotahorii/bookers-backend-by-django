import { VFC, memo, useEffect } from "react";
import { Header } from "../organisms/Header";
import { Container, Flex } from "@chakra-ui/layout";
import { Outlet, useNavigate } from "react-router";
import { SideBar } from "../organisms/SideBar";
import { useQueryMyProf } from "../../hooks/auth/useQueryMyProf";
import { useQueryProfs } from "../../hooks/auth/useQueryProfs";
import { useQueryBooks } from "../../hooks/book/useQueryBooks";
import { Spinner } from "@chakra-ui/spinner";

export const MainPage: VFC = memo(() => {
  const navigate = useNavigate();
  const { isLoading: isLoadingMyProf, isError: isErrorMyProf } =
    useQueryMyProf();
  const { isLoading: isLoadingProfs, isError: isErrorProfs } = useQueryProfs();
  const { isLoading: isLoadingBooks, isError: isErrorBooks } = useQueryBooks();

  useEffect(() => {
    const token = localStorage.getItem("localJWT");
    !token && navigate("login/");
  }, [navigate]);

  if (isLoadingMyProf || isLoadingProfs || isLoadingBooks) {
    return (
      <Flex justify="center" align="center" minH="100vh" color="gray.50">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }
  if (isErrorBooks || isErrorMyProf || isErrorProfs) {
    navigate("login");
  }

  return (
    <>
      <Flex minH="100vh" bg="gray.50" direction="column">
        <Header />
        <Container maxW="7xl" p="0">
          <Flex direction={{ base: "column", md: "row" }} pt="5">
            <SideBar />
            <Flex flex={2} w="full" justify="center">
              <Outlet />
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </>
  );
});

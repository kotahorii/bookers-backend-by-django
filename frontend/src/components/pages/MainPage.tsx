import { VFC, memo, useEffect } from "react";
import { Header } from "../organisms/Header";
import { Container, Flex } from "@chakra-ui/layout";
import { Outlet, useNavigate } from "react-router";
import { SideBar } from "../organisms/SideBar";

export const MainPage: VFC = memo(() => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("localJWT");
    !token && navigate("login/");
  }, [navigate]);

  return (
    <>
      <Flex minH="100vh" bg="gray.50" direction="column">
        <Header />
        <Container maxW="7xl" p="0">
          <Flex direction={{ base: "column", md: "row" }} pt="5">
            <Flex flex={2} w="full" justify="center">
              <Outlet />
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </>
  );
});

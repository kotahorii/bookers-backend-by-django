import { VFC } from "react";
import { Header } from "../organisms/Header";
import { Container, Flex } from "@chakra-ui/layout";
import { Outlet } from "react-router";
import { SideBar } from "../organisms/SideBar";

export const MainPage: VFC = () => {
  return (
    <>
      <Flex minH="100vh" bg="gray.50" direction="column">
        <Header />
        <Container maxW="7xl" p="0">
          <Flex direction={{ base: "column", md: "row" }} pt="5">
            <SideBar />
            <Flex flex={2} w="full" bg="blue.50" justify="center">
              <Outlet />
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

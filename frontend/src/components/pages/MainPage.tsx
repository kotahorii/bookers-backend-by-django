import { VFC } from "react";
import { Header } from "../organisms/Header";
import { Flex } from "@chakra-ui/layout";
import { Outlet } from "react-router";

export const MainPage: VFC = () => {
  return (
    <>
      <Flex minH="100vh" bg="gray.50" direction="column">
        <Header />
        <Outlet />
      </Flex>
    </>
  );
};

import { Heading } from "@chakra-ui/layout";
import { VFC } from "react";
import { Outlet } from "react-router";

export const Books: VFC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

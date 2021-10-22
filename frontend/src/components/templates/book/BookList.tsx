import { Heading, Stack } from "@chakra-ui/layout";
import { VFC, memo } from "react";
import { Outlet } from "react-router";

import { SideBar } from "../../organisms/SideBar";

export const BookList: VFC = memo(() => {
  return (
    <>
      <SideBar />
      <Stack spacing="5" align="center" w="full" direction="column">
        <Heading textAlign="center" color="gray.600">
          BookList
        </Heading>
        <Outlet />
      </Stack>
    </>
  );
});

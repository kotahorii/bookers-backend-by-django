import { Heading, Stack } from "@chakra-ui/layout";
import { VFC, memo } from "react";
import { Outlet } from "react-router";
import { SideBar } from "../../organisms/SideBar";

export const UserList: VFC = memo(() => {
  return (
    <>
      <SideBar />
      <Stack spacing="5" align="center" w="full" direction="column">
        <Heading textAlign="center" color="gray.600">
          UserList
        </Heading>
        <Outlet />
      </Stack>
    </>
  );
});

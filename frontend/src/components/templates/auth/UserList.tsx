import { Heading } from "@chakra-ui/layout";
import { VFC, memo } from "react";

export const UserList: VFC = memo(() => {
  return (
    <>
      <Heading textAlign="center" color="gray.600">
        UsersList
      </Heading>
    </>
  );
});

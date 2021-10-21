import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Box, Heading, Stack, Text } from "@chakra-ui/layout";
import { VFC } from "react";
import styles from "./SideBar.module.css";
export const SideBar: VFC = () => {
  return (
    <>
      <Stack flex="1" spacing={{ base: 5, md: 10 }} h="100vh">
        <Heading color="gray.600" as="h6" size="lg" textAlign="center">
          User
        </Heading>
        <Stack px="5">
          <Stack direction="row" justify="center" align="center" spacing="5">
            <Avatar src="https://pbs.twimg.com/media/FBGkAjGUUAscwPU?format=jpg&name=4096x4096" />
            <Text fontSize="20px" fontWeight="bold" color="gray.600">
              takashi
            </Text>
          </Stack>
          <Text fontSize="18px">Introduction:</Text>
          <Text maxW="300px" fontSize="18px">
            aaa
          </Text>
          <Button></Button>
        </Stack>
      </Stack>
    </>
  );
};

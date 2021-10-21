import { Heading, Stack, Text } from "@chakra-ui/layout";
import { VFC } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

export const Header: VFC = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("localJWT");
    navigate("login/");
  };

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <Stack
        direction="row"
        w="full"
        h="100px"
        align="center"
        justify={{ md: "space-between", base: "center" }}
        borderBottom="solid 0.1px"
        borderColor="gray.400"
        color="gray.600"
        className={styles.sticky}
        bg="gray.50"
        zIndex={2}
      >
        <Heading mx="10" cursor="pointer" onClick={returnTop}>
          Bookers
        </Heading>
        <Stack
          direction="row"
          justify="row"
          display={{ md: "flex", base: "none" }}
          pr="10"
          spacing="8"
        >
          <Text fontWeight="bold" color="gray.500">
            <Link to="books/">Books</Link>
          </Text>
          <Text fontWeight="bold" color="gray.500">
            <Link to="users/">Users</Link>
          </Text>
          <Text
            fontWeight="bold"
            color="gray.500"
            cursor="pointer"
            onClick={logout}
          >
            Logout
          </Text>
        </Stack>
      </Stack>
    </>
  );
};

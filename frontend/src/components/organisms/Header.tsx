import { VFC, memo } from "react";
import { Button } from "@chakra-ui/button";
import { Heading, Stack } from "@chakra-ui/layout";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

export const Header: VFC = memo(() => {
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
        <Heading
          mx="10"
          cursor="pointer"
          onClick={returnTop}
          color="gray.600"
          _hover={{ color: "gray.700" }}
        >
          Bookers
        </Heading>
        <Stack
          direction="row"
          justify="row"
          display={{ md: "flex", base: "none" }}
          pr="10"
        >
          <Button
            fontWeight="bold"
            color="gray.500"
            bg="transparent"
            _hover={{ bg: "gray.100" }}
          >
            <Link to="books/">Books</Link>
          </Button>
          <Button
            fontWeight="bold"
            color="gray.500"
            bg="transparent"
            _hover={{ bg: "gray.100" }}
          >
            <Link to="users/">Users</Link>
          </Button>
          <Button
            fontWeight="bold"
            color="gray.500"
            cursor="pointer"
            bg="transparent"
            _hover={{ bg: "gray.100" }}
            onClick={logout}
          >
            Logout
          </Button>
        </Stack>
      </Stack>
    </>
  );
});

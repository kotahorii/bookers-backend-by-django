import { VFC, memo } from "react";
import { Button, IconButton } from "@chakra-ui/button";
import { Flex, Heading, Stack } from "@chakra-ui/layout";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useDisclosure } from "@chakra-ui/hooks";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Collapse } from "@chakra-ui/transition";
import { MobileNav } from "../../molecules/MobileNav";
export const Header: VFC = memo(() => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("localJWT");
    navigate("login/");
  };
  const { isOpen, onToggle } = useDisclosure();

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
        px="3"
        justify={{ md: "space-between", base: "flex-start" }}
        borderBottom="solid 0.1px"
        borderColor="gray.300"
        color="gray.600"
        className={styles.sticky}
        bg="gray.50"
        zIndex={2}
      >
        <Flex display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            ml={{ base: 2 }}
            bg="gray.50"
            aria-label="toggle Navigation"
            variant="ghost"
            _focus={{ boxShadow: "none" }}
            icon={
              isOpen ? <CloseIcon w="3" h="3" /> : <HamburgerIcon w="5" h="5" />
            }
          />
        </Flex>
        <Flex w="full" justify={{ base: "center", md: "flex-start" }}>
          <Heading
            mx="10"
            cursor="pointer"
            onClick={returnTop}
            color="gray.600"
            _hover={{ color: "gray.700" }}
          >
            Bookers
          </Heading>
        </Flex>
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
            _focus={{ boxShadow: "none" }}
          >
            <Link to="books/">Books</Link>
          </Button>
          <Button
            fontWeight="bold"
            color="gray.500"
            bg="transparent"
            _hover={{ bg: "gray.100" }}
            _focus={{ boxShadow: "none" }}
          >
            <Link to="users/">Users</Link>
          </Button>
          <Button
            fontWeight="bold"
            color="gray.500"
            cursor="pointer"
            bg="transparent"
            _hover={{ bg: "gray.100" }}
            _focus={{ boxShadow: "none" }}
            onClick={logout}
          >
            Logout
          </Button>
        </Stack>
      </Stack>
      <Collapse animateOpacity in={isOpen}>
        <MobileNav />
      </Collapse>
    </>
  );
});

import { Stack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { VFC, memo } from "react";
import { useNavigate } from "react-router";

export const MobileNav: VFC = memo(() => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("localJWT");
    navigate("login/");
  };
  return (
    <>
      <Stack direction="column" bg="transparent" p="4" display={{ md: "none" }}>
        <Text fontWeight="bold" color="gray.500" _hover={{ color: "gray.600" }}>
          <Link to="books/">Books</Link>
        </Text>
        <Text fontWeight="bold" color="gray.500" _hover={{ color: "gray.600" }}>
          <Link to="users/">Users</Link>
        </Text>
        <Text
          fontWeight="bold"
          color="gray.500"
          _hover={{ color: "gray.600" }}
          onClick={logout}
        >
          Logout
        </Text>
      </Stack>
    </>
  );
});

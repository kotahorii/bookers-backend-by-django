import { Avatar } from "@chakra-ui/avatar";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { VFC, memo } from "react";
import { Profile } from "../../types/loginTypes";

type Props = {
  prof: Profile;
};

export const ProfCard: VFC<Props> = memo(({ prof }) => {
  return (
    <>
      <Box
        cursor="pointer"
        _hover={{ boxShadow: "lg" }}
        w={{ md: "60%", base: "80%" }}
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        p="3"
      >
        <Stack>
          <Stack direction="row" align="center">
            <Avatar src={prof.img} boxShadow="sm" />
            <Text
              color="gray.600"
              fontWeight="bold"
              fontSize="20px"
              textAlign="center"
            >
              Username: {prof.user_profile_username}
            </Text>
          </Stack>

          <Stack direction="row">
            <Text>Introduction: {prof.introduction}</Text>
            <Stack spacing="0.5"></Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
});

import { Heading, Stack } from "@chakra-ui/layout";
import { VFC, memo } from "react";
import { useQueryProfs } from "../../../hooks/auth/useQueryProfs";
import { ProfCard } from "../../molecules/ProfCard";
import { SideBar } from "../../organisms/SideBar";

export const UserList: VFC = memo(() => {
  const { data: profs } = useQueryProfs();
  return (
    <>
      <SideBar />
      <Stack spacing="5" align="center" w="full" direction="column">
        <Heading textAlign="center" color="gray.600">
          UserList
        </Heading>
        {profs?.map((prof) => (
          <ProfCard key={prof.id} prof={prof} />
        ))}
      </Stack>
    </>
  );
});

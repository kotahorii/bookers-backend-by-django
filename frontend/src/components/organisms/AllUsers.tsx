import React from "react";
import { useQueryProfs } from "../../hooks/auth/useQueryProfs";
import { ProfCard } from "./ProfCard";

export const AllUsers = () => {
  const { data: profs } = useQueryProfs();
  return (
    <>
      {profs?.map((prof) => (
        <ProfCard key={prof.id} prof={prof} />
      ))}
    </>
  );
};

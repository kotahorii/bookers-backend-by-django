import { VFC, memo } from "react";
import { Outlet } from "react-router";

export const Books: VFC = memo(() => {
  return (
    <>
      <Outlet />
    </>
  );
});

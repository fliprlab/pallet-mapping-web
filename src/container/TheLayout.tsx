import { AppShell, Box } from "@mantine/core";
import { Outlet, ScrollRestoration } from "react-router-dom";
import TheHeader from "./TheHeader";

const TheLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        maxHeight: "-webkit-fill-available",
        background: "#fff",
      }}
    >
      <TheHeader />

      <Outlet />

      <ScrollRestoration />
    </Box>
  );
};

export default TheLayout;

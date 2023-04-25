import { AppShell, Box } from "@mantine/core";
import { Outlet } from "react-router-dom";
import TheHeader from "./TheHeader";
import TheSidebar from "./TheSidebar";

const TheLayout = () => {
  return (
    <AppShell
      styles={{
        main: {
          background: "#F5F5F5",
          padding: 0,
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<TheSidebar />}
    >
      <Box sx={{ height: "100%" }}>
        <TheHeader />
        <Outlet />
      </Box>
    </AppShell>
  );
};

export default TheLayout;

import { AppShell, Box } from "@mantine/core";
import { Outlet, ScrollRestoration } from "react-router-dom";
import TheHeader from "./TheHeader";

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
      // navbar={<TheSidebar />}
      header={<TheHeader />}
      fixed={true}
    >
      <Box sx={{ height: "100%" }}>
        <Outlet />
        <ScrollRestoration />
      </Box>
    </AppShell>
  );
};

export default TheLayout;

import { AppShell, Box } from "@mantine/core";
import { Outlet, ScrollRestoration } from "react-router-dom";
import TheHeader from "./TheHeader";

const TheLayout = () => {
  return (
    <AppShell
      styles={{
        main: {
          background: "#fff",
          padding: 0,
          "@media(max-width:767px)": {
            paddingRight: 0,
          },
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      // navbar={<TheSidebar />}
      header={<TheHeader />}
      fixed={true}
    >
      <Box
        sx={{
          height: "100%",
        }}
      >
        <Outlet />
        <ScrollRestoration />
      </Box>
    </AppShell>
  );
};

export default TheLayout;

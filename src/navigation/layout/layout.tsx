import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Box, CssBaseline } from "@mui/material";

import { AppBar, Drawer } from "./components";
import { Copyright } from "../../shared/components";

const AppNavigation = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar toggleDrawer={toggleDrawer} />
      <Drawer open={open} toggleDrawer={toggleDrawer} />
    </>
  );
};

export const Layout = () => (
  <Box sx={{ display: "flex" }}>
    <CssBaseline />
    <AppNavigation />
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        pt: 6,
        height: "100vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: 4,
        }}
      >
        {/** Screens in the Outlet */}
        <Outlet />
      </Container>
      <Copyright
        sx={{
          mt: 4,
          mb: 4,
        }}
      />
    </Box>
  </Box>
);

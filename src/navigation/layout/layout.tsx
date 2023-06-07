import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Toolbar, Box, CssBaseline } from "@mui/material";

import { AppBar, Copyright, Drawer } from "./components";

const AppNavigation = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar open={open} toggleDrawer={toggleDrawer} />
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
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/** Screens in the Outlet */}
        <Outlet />
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  </Box>
);

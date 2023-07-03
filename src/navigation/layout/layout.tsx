import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Box, CssBaseline, Grid } from "@mui/material";

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
        overflowX: "hidden",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          mt: 2,
          mb: 2,
        }}
      >
        <Grid container spacing={3} sx={{ justifyContent: "center", pt: 4 }}>
          {/** Screens in the Outlet */}
          <Outlet />
        </Grid>
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

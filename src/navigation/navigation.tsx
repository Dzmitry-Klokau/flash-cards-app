import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";

import { Box, CircularProgress, Container, CssBaseline } from "@mui/material";
import {
  HomeScreen,
  SettingsScreen,
  ProfileScreen,
  GameScreen,
  AdminScreen,
  AdminGameDetails,
  SignIn,
} from "../screens";

import { Layout } from "./layout";
import routes from "./routes";
import { useEffect, useState } from "react";
import { auth } from "../service/firebase";
import { User } from "firebase/auth";
import { isNull, isUndefined } from "lodash";

// only hash routes works in the Github Pages
const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      {
        path: routes.home.path,
        Component: HomeScreen,
      },
      {
        path: routes.settings.path,
        Component: SettingsScreen,
      },
      {
        path: routes.profile.path,
        Component: ProfileScreen,
      },
      {
        path: routes.game.path,
        Component: GameScreen,
      },
      {
        path: routes.admin.path,
        children: [
          {
            path: "",
            Component: AdminScreen,
          },
          {
            path: `${routes["admin-game-details"].path}/:id`,
            Component: AdminGameDetails,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={routes.home.path} replace />,
  },
]);

export const Navigation = () => {
  const [user, setUser] = useState<User | null | undefined>();

  useEffect(() => {
    auth.onAuthStateChanged((state) => {
      setUser(state);
    });
  }, []);

  if (isUndefined(user)) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (isNull(user)) {
    return <SignIn />;
  }

  return <RouterProvider router={router} />;
};

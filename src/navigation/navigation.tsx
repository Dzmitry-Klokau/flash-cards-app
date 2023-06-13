import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";

import {
  HomeScreen,
  SettingsScreen,
  ProfileScreen,
  GameScreen,
  RatingScreen,
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
        path: routes.rating.path,
        Component: RatingScreen,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={routes.home.path} replace />,
  },
]);

export const Navigation = () => {
  const [user, setUser] = useState<User | null | undefined>(null);

  useEffect(() => {
    auth.onAuthStateChanged((state) => {
      console.log({ state });
      setUser(state);
    });
  }, []);

  if (isUndefined(user)) {
    return null; // todo loader
  }

  if (isNull(user)) {
    return <SignIn />;
  }

  return <RouterProvider router={router} />;
};

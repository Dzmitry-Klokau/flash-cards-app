import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";

import {
  HomeScreen,
  SettingsScreen,
  ProfileScreen,
  GameScreen,
  RatingScreen,
} from "../screens";

import { Layout } from "./layout";
import routes from "./routes";

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

export const Navigation = () => <RouterProvider router={router} />;

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  HomeScreen,
  SettingsScreen,
  ProfileScreen,
  GameScreen,
  RatingScreen,
} from "../screens";

import { Layout } from "./layout";
import routes from "./routes";

const router = createBrowserRouter(
  [
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
  ],
  { basename: "/" }
);

export const Navigation = () => <RouterProvider router={router} />;

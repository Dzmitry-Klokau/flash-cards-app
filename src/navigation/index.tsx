import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import {
  HomeScreen,
  SettingsScreen,
  ProfileScreen,
  GameScreen,
  RatingScreen,
} from "../screens";

import { Layout } from "./layout";
import routes, { basename } from "./routes";

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
    {
      path: "*",
      element: <Navigate to={routes.home.path} replace />,
    },
  ],
  { basename }
);

export const Navigation = () => <RouterProvider router={router} />;

import {
  Badge,
  IconButton,
  Typography,
  Toolbar,
  AppBar as MuiAppBar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { matchRoutes, useLocation } from "react-router-dom";
import { capitalize } from "lodash";

import routes from "../../routes";

type Props = {
  toggleDrawer: VoidFunction;
};

export const AppBar = ({ toggleDrawer }: Props) => (
  <MuiAppBar
    position="absolute"
    sx={{
      // zIndex: theme.zIndex.drawer + 1,
      zIndex: 9999,
    }}
  >
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        sx={{
          marginRight: "36px",
        }}
      >
        <MenuIcon />
      </IconButton>
      <RouteLabel />
      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Toolbar>
  </MuiAppBar>
);

const routesArr = Object.entries(routes).map(([name, value]) => ({
  name,
  ...value,
}));

const RouteLabel = () => {
  const location = useLocation();
  const matchedRoute = matchRoutes(routesArr, location);

  return (
    <Typography
      component="h1"
      variant="h6"
      color="inherit"
      noWrap
      sx={{ flexGrow: 1 }}
    >
      {matchedRoute ? capitalize(matchedRoute[0].route.name.toString()) : ""}
    </Typography>
  );
};

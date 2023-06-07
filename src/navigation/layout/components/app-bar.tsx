import { styled } from "@mui/material/styles";
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

import { shouldForwardProp } from "../../../shared/utils";
import { drawerWidth } from "../../../shared/constants";
import routes from "../../routes";

type AppBarProps = {
  open: boolean;
};

const WrappedAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => shouldForwardProp<AppBarProps>(["open"], prop),
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type Props = {
  toggleDrawer: VoidFunction;
  open: boolean;
};

export const AppBar = ({ open, toggleDrawer }: Props) => {
  return (
    <WrappedAppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
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
    </WrappedAppBar>
  );
};

const routesArr = Object.entries(routes).map(([name, value]) => ({
  name,
  ...value,
}));

export const RouteLabel = () => {
  const location = useLocation();
  const matchedRoute = matchRoutes(routesArr, location);

  if (matchedRoute === null) {
    return null;
  }

  return (
    <Typography
      component="h1"
      variant="h6"
      color="inherit"
      noWrap
      sx={{ flexGrow: 1 }}
    >
      {capitalize(matchedRoute[0].route.name.toString())}
    </Typography>
  );
};

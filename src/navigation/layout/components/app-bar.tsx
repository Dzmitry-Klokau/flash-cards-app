import {
  IconButton,
  Typography,
  Toolbar,
  AppBar as MuiAppBar,
  Box,
  Theme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  DarkMode as DarkModeIcon,
  ArrowCircleLeftOutlined as BackIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { capitalize } from "lodash";

import routes from "../../routes";
import { makeStyles } from "@mui/styles";
import { useColorModeContext } from "../../../shared/context";

type Props = {
  toggleDrawer: VoidFunction;
};

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  iconBtn: {
    marginRight: "36px",
  },
  placeholder: { flexGrow: 1 },
}));

const routesArr = Object.entries(routes).map(([name, value]) => ({
  name,
  ...value,
}));

export const AppBar = ({ toggleDrawer }: Props) => {
  const classes = useStyles();
  const { mode, toggleColorMode } = useColorModeContext();

  return (
    <MuiAppBar position="absolute" className={classes.appBar}>
      <Toolbar>
        <LeftIcon toggleDrawer={toggleDrawer} />
        <IconButton color="inherit" onClick={toggleColorMode}>
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
};

const LeftIcon = ({ toggleDrawer }: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const matchedRoute = matchRoutes(routesArr, location);

  if (matchedRoute) {
    return (
      <>
        <IconButton
          className={classes.iconBtn}
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          className={classes.placeholder}
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
        >
          {capitalize(matchedRoute[0].route.name.toString())}
        </Typography>
      </>
    );
  }

  return (
    <>
      <IconButton
        className={classes.iconBtn}
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={() => navigate(-1)}
      >
        <BackIcon />
      </IconButton>
      <Box className={classes.placeholder} />
    </>
  );
};

import { styled } from "@mui/material/styles";
import {
  IconButton,
  Divider,
  List,
  Toolbar,
  Drawer as MuiDrawer,
} from "@mui/material";
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";

import { shouldForwardProp } from "../../../shared/utils";
import { drawerWidth } from "../../../shared/constants";
import { NavButton } from "./nav-button";
import routes from "../../routes";
import { auth } from "../../../service/firebase";

type AppBarProps = {
  open: boolean;
};

const WrappedDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => shouldForwardProp<AppBarProps>(["open"], prop),
})<AppBarProps>(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "absolute",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
    }),
  },
}));

type Props = {
  toggleDrawer: VoidFunction;
  open: boolean;
};

const firstLevelRoutes: RouteItemObjList = [
  { name: "home", ...routes.home },
  { name: "games", ...routes.games },
];

const secondLevelRoutes: RouteItemObjList = [
  { name: "profile", ...routes.profile },
  { name: "admin", ...routes.admin },
  // { name: "settings", ...routes.settings },
];

export const Drawer = ({ open, toggleDrawer }: Props) => (
  <WrappedDrawer variant="permanent" open={open}>
    <Toolbar
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: [1],
      }}
    >
      <IconButton onClick={toggleDrawer}>
        <ChevronLeftIcon />
      </IconButton>
    </Toolbar>
    <List component="nav">
      {firstLevelRoutes.map((route) => (
        <NavButton
          key={`first_level_nav_${route.name}`}
          onClick={toggleDrawer}
          {...route}
        />
      ))}
      <Divider sx={{ my: 1 }} />
      {secondLevelRoutes
        .filter(
          (r) =>
            r.name !== "admin" ||
            auth.currentUser?.uid === "mLZ1KEJTBDdQgPmS7NzP4tf9vH82"
        )
        .map((route) => (
          <NavButton
            key={`second_level_nav_${route.name}`}
            onClick={toggleDrawer}
            {...route}
          />
        ))}
    </List>
  </WrappedDrawer>
);

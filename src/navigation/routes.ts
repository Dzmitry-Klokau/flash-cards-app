import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  VerifiedUserRounded as ProfileIcon,
  Games as GameIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";

export const routes: Routes = {
  home: { path: "home", Icon: HomeIcon },
  profile: { path: "profile", Icon: ProfileIcon },
  settings: { path: "settings", Icon: SettingsIcon },
  games: { path: "games", Icon: GameIcon },
  admin: { path: "admin", Icon: AdminIcon },
  "admin-game-details": { path: "admin-game-details" },
  player: { path: "player" },
};

export default routes;

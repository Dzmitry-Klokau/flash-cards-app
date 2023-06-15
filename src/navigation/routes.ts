import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  VerifiedUserRounded as ProfileIcon,
  Leaderboard as RatingIcon,
  Games as GameIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";

export const routes: Routes = {
  home: { path: "home", Icon: HomeIcon },
  profile: { path: "profile", Icon: ProfileIcon },
  settings: { path: "settings", Icon: SettingsIcon },
  game: { path: "game", Icon: GameIcon },
  admin: { path: "admin", Icon: AdminIcon },
};

export default routes;

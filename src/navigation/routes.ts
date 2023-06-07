import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  VerifiedUserRounded as ProfileIcon,
  Leaderboard as RatingIcon,
  Games as GameIcon,
} from "@mui/icons-material";

export const routes: Routes = {
  home: { path: "/", Icon: HomeIcon },
  rating: { path: "rating", Icon: RatingIcon },
  profile: { path: "profile", Icon: ProfileIcon },
  settings: { path: "settings", Icon: SettingsIcon },
  game: { path: "game", Icon: GameIcon },
};

export default routes;

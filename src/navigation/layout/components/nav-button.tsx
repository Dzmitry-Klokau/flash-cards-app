import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { capitalize } from "lodash";

export const NavButton = ({ path, name, Icon }: RouteItemObj) => (
  <ListItemButton href={`#/${path}`}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={capitalize(name)} />
  </ListItemButton>
);

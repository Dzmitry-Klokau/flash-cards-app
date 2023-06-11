import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { capitalize } from "lodash";

type Props = RouteItemObj & { onClick: VoidFunction };

export const NavButton = ({ path, name, Icon, onClick }: Props) => (
  <ListItemButton href={`#/${path}`} onClick={onClick}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={capitalize(name)} />
  </ListItemButton>
);

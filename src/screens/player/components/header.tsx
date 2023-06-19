import { Typography, Box, Theme, IconButton } from "@mui/material";

import { Settings as SettingsIcon } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    gridArea: "title",
    marginTop: theme.spacing(4),
    textAlign: "center",
  },
  settings: {
    gridArea: "settings",
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2),
  },
  titleRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateAreas: `". title settings"`,
    alignItems: "center",
  },
}));

type Props = {
  title: string;
  onSettingsPress: VoidFunction;
};

export const Header = ({ title, onSettingsPress }: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.titleRow}>
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>
      <Box className={classes.settings}>
        <IconButton onClick={onSettingsPress}>
          <SettingsIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

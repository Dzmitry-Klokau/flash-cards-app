import { Typography, Box, Theme, IconButton } from "@mui/material";

import {
  Settings as SettingsIcon,
  ArrowBack as BackBtn,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  titleRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateAreas: `"back title settings"`,
    alignItems: "center",
  },
  title: {
    gridArea: "title",
    textAlign: "center",
  },
  back: {
    gridArea: "back",
    display: "flex",
    justifyContent: "flex-start",
  },
  settings: {
    gridArea: "settings",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

type Props = {
  title: string;
  onBackPress?: VoidFunction;
  onSettingsPress: VoidFunction;
};

export const Header = ({ title, onBackPress, onSettingsPress }: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.titleRow}>
      {onBackPress && (
        <Box className={classes.back}>
          <IconButton onClick={onBackPress}>
            <BackBtn />
          </IconButton>
        </Box>
      )}
      <Typography className={classes.title}>{title}</Typography>
      <Box className={classes.settings}>
        <IconButton onClick={onSettingsPress}>
          <SettingsIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

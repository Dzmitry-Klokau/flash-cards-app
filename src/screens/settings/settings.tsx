import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export const SettingsScreen = () => {
  return (
    <Grid item xs={12} md={8} lg={9}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 240,
        }}
      >
        <Typography variant="h1" component="h2">
          Settings
        </Typography>
      </Paper>
    </Grid>
  );
};

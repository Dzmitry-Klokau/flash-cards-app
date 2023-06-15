import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export const HomeScreen = () => {
  return (
    <Grid item xs={12} md={8} lg={9}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h2" component="h4">
          Home
        </Typography>
      </Paper>
    </Grid>
  );
};

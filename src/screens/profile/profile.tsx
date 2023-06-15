import { Avatar, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { auth } from "../../service/firebase";

export const ProfileScreen = () => {
  if (!auth.currentUser) {
    return null;
  }

  const { displayName, photoURL, email } = auth.currentUser;

  return (
    <Grid item xs={12} md={8} lg={9}>
      <Paper
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
        }}
      >
        <Grid container spacing={5}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Avatar
              alt="profile picture"
              src={photoURL ?? (displayName || "Profile picture")}
              sx={{ width: 116, height: 116 }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>{displayName}</Typography>
            <Typography>{email}</Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, maxWidth: 200 }}
              onClick={() => {
                auth.signOut();
              }}
            >
              Sign Out
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

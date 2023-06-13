import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { auth } from "../../service/firebase";

export const ProfileScreen = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {/* xs={12} md={8} lg={9}> */}
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              marginTop: 8,
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                auth.signOut();
              }}
            >
              Sign Out
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

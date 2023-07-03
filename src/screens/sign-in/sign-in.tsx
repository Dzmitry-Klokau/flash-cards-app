import * as React from "react";
import { Box, Button, CssBaseline, Container } from "@mui/material";

import { Copyright } from "../../shared/components";
import { signInWithGoogle } from "../../service/firebase";

export const SignIn = () => (
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        height: "80vh",
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
          signInWithGoogle();
        }}
      >
        Sign In
      </Button>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Box>
  </Container>
);

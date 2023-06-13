import { Link, Typography, TypographyProps } from "@mui/material";

export const Copyright = (props: TypographyProps) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {"Copyright © "}
    <Link
      color="inherit"
      href="https://dzmitry-klokau.github.io/flash-cards-app"
    >
      Dzmitry Klokau
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

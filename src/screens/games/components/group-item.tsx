import { Card, Typography, Grid, CardActionArea } from "@mui/material";

type Props = {
  data: GroupType;
  onClick: VoidFunction;
};

export const GroupItem = ({ data, onClick }: Props) => (
  <Grid item md={6} xs={12} sx={{ alignContent: "center" }}>
    <Card variant="outlined">
      <CardActionArea onClick={onClick}>
        <Typography
          variant="h1"
          component="h2"
          sx={{ textAlign: "center", mt: 2 }}
        >
          {data.title}
        </Typography>
        <Typography sx={{ textAlign: "center", mb: 2 }}>{data.desc}</Typography>
      </CardActionArea>
    </Card>
  </Grid>
);

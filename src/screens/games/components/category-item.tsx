import { Card, Typography, Grid, CardActionArea } from "@mui/material";

type Props = { data: GroupCategoryNode; onClick: VoidFunction };

export const CategoryItem = ({ data, onClick }: Props) => (
  <>
    <Grid item md={6} xs={12} sx={{ alignContent: "center" }}>
      <Card variant="outlined">
        <CardActionArea onClick={onClick}>
          <Typography variant="h2" sx={{ textAlign: "center", mt: 2 }}>
            {data.name}
          </Typography>
          <Typography sx={{ textAlign: "center", mb: 2 }}>
            {data.games.length} games
          </Typography>
        </CardActionArea>
      </Card>
    </Grid>
  </>
);

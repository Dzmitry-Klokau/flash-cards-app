import { Card, Typography, Grid, CardActionArea } from "@mui/material";

type Props = { data: GroupCategoryNode; onClick: VoidFunction };

export const CategoryItem = ({ data, onClick }: Props) => (
  <>
    <Grid item md={6} xs={12} sx={{ alignContent: "center" }}>
      <Card variant="outlined">
        <CardActionArea onClick={onClick}>
          <Typography
            variant="h1"
            component="h2"
            sx={{ textAlign: "center", mt: 2 }}
          >
            {data.name}
          </Typography>
        </CardActionArea>
      </Card>
    </Grid>
  </>
);

import { Card, Typography, Grid, CardActionArea, Button } from "@mui/material";

// import { readGroupCollection } from "../../service/firebase";
// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../navigation";

export const GamesScreen = () => {
  const navigate = useNavigate();
  // const [data, setData] = useState<GroupType[]>([]);

  // useEffect(() => {
  //   const loadGroups = async () => {
  //     const res = await readGroupCollection();
  //     setData(res);
  //   };
  //   loadGroups();
  // }, []);

  return (
    <>
      {/* {data.map((item) => (
        <Item data={item} />
      ))} */}
      <Button
        sx={{ mt: 6 }}
        onClick={() => {
          navigate(`${routes.player.path}/d32scd34cds43ed4332e`, {
            relative: "route",
          });
        }}
      >
        test - Общие фразы
      </Button>
      <Button
        sx={{ mt: 6 }}
        onClick={() => {
          navigate(`${routes.player.path}/2`, {
            relative: "route",
          });
        }}
      >
        test - Ориентация в городе
      </Button>
      <Button
        sx={{ mt: 6 }}
        onClick={() => {
          navigate(`${routes.player.path}/3`, {
            relative: "route",
          });
        }}
      >
        test - В ресторане
      </Button>
    </>
  );
};

export const Item = ({ data }: any) => {
  return (
    <Grid item md={6} xs={12} sx={{ alignContent: "center" }}>
      <Card variant="outlined">
        <CardActionArea
          onClick={() => {
            //
          }}
        >
          <Typography
            variant="h1"
            component="h2"
            sx={{ textAlign: "center", mt: 2 }}
          >
            {data.title}
          </Typography>
          <Typography sx={{ textAlign: "center", mb: 2 }}>
            {data.desc}
          </Typography>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

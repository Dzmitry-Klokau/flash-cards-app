import { Card, Typography, Grid, CardActionArea } from "@mui/material";

import { readGroupCollection } from "../../service/firebase";
import { useEffect, useState } from "react";

export const GameScreen = () => {
  const [data, setData] = useState<GroupType[]>([]);

  useEffect(() => {
    const loadGroups = async () => {
      const res = await readGroupCollection();
      setData(res);
    };
    loadGroups();
  }, []);

  return (
    <>
      {data.map((item) => (
        <Item data={item} />
      ))}
    </>
  );
};

const Item = ({ data }: any) => {
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

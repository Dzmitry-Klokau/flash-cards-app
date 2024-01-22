import { Grid, Card, CardActionArea, Typography } from "@mui/material";

import { PlayerMode } from "../../../shared/enums";

type Props = {
  onSelect: (mode: PlayerMode) => void;
};

export const SelectMode = ({ onSelect }: Props) => {
  return (
    <Grid container spacing={3} sx={{ p: 4 }}>
      {Object.entries(PlayerMode).map(([key, value]) => {
        return (
          <Grid item md={6} xs={12} sx={{ alignContent: "center" }}>
            <Card variant="outlined">
              <CardActionArea
                onClick={() => {
                  onSelect(key as unknown as PlayerMode);
                }}
              >
                <Typography variant="h6" sx={{ textAlign: "center", m: 2 }}>
                  {value}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

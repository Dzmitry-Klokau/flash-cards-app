import { CardActionArea, Paper, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { memo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Grid,
} from "@mui/material";

type Props = {
  visible: boolean;
  data: Array<GameType>;
};

export const GameTable = memo(({ data, visible }: Props) => {
  const [selected, setSelected] = useState<GameType>();

  if (isEmpty(data) || !visible) return null;

  return (
    <>
      <TableContainer component={Paper} sx={{ ph: 1 }}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              const isSelected = row.uid === selected?.uid;
              return (
                <>
                  <TableRow
                    key={row.uid}
                    role="button"
                    onClick={() => {
                      setSelected(row);
                    }}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                      backgroundColor: (theme) =>
                        isSelected ? theme.palette.grey[300] : undefined,
                    }}
                  >
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.desc}</TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {selected && (
        <TableContainer component={Paper} sx={{ ph: 1, mt: 6 }}>
          <Typography variant="h5" component="h5" sx={{ p: 2 }}>
            Selected item:
          </Typography>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography>UID</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{selected.uid}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>Title</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{selected.title}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>Description</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{selected.desc}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <Grid container spacing={2}>
                    {selected.cards.map((card, index) => (
                      <Grid
                        key={`${selected.uid}-${index}`}
                        item
                        md={4}
                        xs={12}
                        sx={{ alignContent: "center" }}
                      >
                        <Card variant="outlined">
                          <CardActionArea
                            onClick={() => {
                              //
                            }}
                            sx={{ p: 2 }}
                          >
                            <Typography>
                              <strong>P:</strong> {card.primary}
                            </Typography>
                            <Typography>
                              <strong>S:</strong> {card.secondary}
                            </Typography>
                            <Typography>
                              <strong>O:</strong> {card.optional}
                            </Typography>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
});

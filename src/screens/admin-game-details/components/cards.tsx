import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Theme,
} from "@mui/material";
import { useFormikContext } from "formik";
import { makeStyles } from "@mui/styles";
import { AddCardRow } from "./add-card-row";
import { CardRow } from "./card-row";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(6),
    paddingHorizontal: theme.spacing(1),
  },
  table: {
    minWidth: 200,
  },
}));

export const Cards = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Box} className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Primary</TableCell>
            <TableCell>Secondary</TableCell>
            <TableCell>Optional</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <Body />
      </Table>
    </TableContainer>
  );
};

const Body = () => {
  const { values } = useFormikContext<GameType>();

  return (
    <TableBody>
      {values.cards.map((card) => (
        <CardRow card={card} key={card.uuid} />
      ))}
      <AddCardRow />
    </TableBody>
  );
};

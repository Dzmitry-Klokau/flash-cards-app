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
import { FieldArray, useFormikContext, ArrayHelpers } from "formik";
import { makeStyles } from "@mui/styles";
import { AddCardRow } from "./add-card-row";
import { CardRow } from "./card-row";
import { useCallback, useEffect, useMemo, useRef } from "react";

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
        <TableBody>
          <FieldArray
            name="cards"
            render={(arrayHelpers: ArrayHelpers) => (
              <Body arrayHelpers={arrayHelpers} />
            )}
          ></FieldArray>
          <AddCardRow />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Body = ({ arrayHelpers }: { arrayHelpers: ArrayHelpers }) => {
  const { values, errors, setErrors } = useFormikContext<GameType>();
  const highlight = useRef<number>();

  const uuidS = useMemo(() => {
    return values.cards.map((v) => v.uuid);
  }, [values.cards]);

  const doHighlight = (index: number) => {
    highlight.current = index;
    setTimeout(() => (highlight.current = undefined), 500);
  };

  const handleRemove = useCallback(
    (index: number) => arrayHelpers.remove(index),
    [arrayHelpers]
  );

  const handleUp = useCallback(
    (index: number) => {
      arrayHelpers.swap(index - 1, index);
      doHighlight(index);
    },
    [arrayHelpers]
  );

  const handleDown = useCallback(
    (index: number) => {
      arrayHelpers.swap(index + 1, index);
      doHighlight(index);
    },
    [arrayHelpers]
  );

  useEffect(() => {
    setErrors({});
  }, [values, setErrors]);

  return (
    <>
      {uuidS.map((uuid, index) => (
        <CardRow
          key={uuid}
          index={index}
          hasError={!!errors.cards?.[index]}
          onRemove={handleRemove}
          showUp={index !== 0}
          onUp={handleUp}
          showDown={index !== uuidS.length - 1}
          onDown={handleDown}
        />
      ))}
    </>
  );
};

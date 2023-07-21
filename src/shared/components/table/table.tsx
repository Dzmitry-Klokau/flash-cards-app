import {
  Table as MuiTable,
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
import { AddRow } from "./add-row";
import { Row } from "./row";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { get } from "lodash";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(6),
    paddingHorizontal: theme.spacing(1),
  },
  table: {
    minWidth: 200,
  },
}));

type Props = {
  tableName: string;
  titles: string[];
  valueNames: string[];
  createNewItem: () => any;
  renderCell: RenderCellFunc;
};

export const Table = ({
  titles,
  tableName,
  valueNames,
  createNewItem,
  renderCell,
}: Props) => {
  const classes = useStyles();

  return (
    <TableContainer component={Box} className={classes.root}>
      <MuiTable className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {titles.map((t) => (
              <TableCell>{t}</TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <FieldArray
            name={tableName}
            render={(arrayHelpers: ArrayHelpers) => (
              <Body
                arrayHelpers={arrayHelpers}
                tableName={tableName}
                valueNames={valueNames}
                renderCell={renderCell}
              />
            )}
          ></FieldArray>
          <AddRow tableName={tableName} createNewItem={createNewItem} />
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

const Body = ({
  arrayHelpers,
  tableName,
  valueNames,
  renderCell,
}: {
  arrayHelpers: ArrayHelpers;
  tableName: string;
  valueNames: string[];
  renderCell: RenderCellFunc;
}) => {
  const { values, errors, setErrors } = useFormikContext();
  const highlight = useRef<number>();

  const uuidS = useMemo(() => {
    return get(values, tableName)?.map((v: { uuid: string }) => v.uuid);
  }, [values, tableName]);

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
      {uuidS.map((uuid: string, index: number) => (
        <Row
          key={uuid}
          index={index}
          hasError={!!get(errors, tableName)?.[index]}
          onRemove={handleRemove}
          showUp={index !== 0}
          onUp={handleUp}
          showDown={index !== uuidS.length - 1}
          onDown={handleDown}
          tableName={tableName}
          valueNames={valueNames}
          renderCell={renderCell}
        />
      ))}
    </>
  );
};

import { TableCell, TableRow, Box, TextField, IconButton } from "@mui/material";
import {
  Delete as DeleteIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";
import { connect, FormikValues, FormikProps } from "formik";
import { Component } from "react";

type Props = {
  formik: FormikProps<FormikValues>;
  index: number;
  hasError: boolean;
  onRemove: (index: number) => void;
  showUp: boolean;
  onUp: (index: number) => void;
  showDown: boolean;
  onDown: (index: number) => void;
};

class Row extends Component<Props> {
  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    const { formik, index } = this.props;
    const { formik: nextFormik, index: nextIndex } = nextProps;

    const card = formik.values.cards[index];
    const nextCard = nextFormik.values.cards[nextIndex];

    const { showDown, showUp, hasError } = this.props;
    const {
      showDown: nextShowDown,
      showUp: nextShowUp,
      hasError: nextHasError,
    } = nextProps;

    if (
      card !== nextCard ||
      hasError !== nextHasError ||
      showUp !== nextShowUp ||
      showDown !== nextShowDown
    ) {
      return true;
    }

    return false;
  }

  render() {
    const {
      formik,
      index,
      hasError,
      onRemove,
      showUp,
      onUp,
      showDown,
      onDown,
    } = this.props;

    const { primary, secondary, optional } = formik.values.cards[index];

    return (
      <TableRow>
        <TableCell padding="none">
          <TextField
            // className={classes.cellInput}
            autoComplete="off"
            variant="outlined"
            value={primary}
            error={hasError}
            onChange={(e) => {
              formik.setFieldValue(`cards[${index}].primary`, e.target.value);
            }}
          />
        </TableCell>
        <TableCell padding="none">
          <TextField
            // className={classes.cellInput}
            autoComplete="off"
            variant="outlined"
            value={secondary}
            error={hasError}
            onChange={(e) => {
              formik.setFieldValue(`cards[${index}].secondary`, e.target.value);
            }}
          />
        </TableCell>
        <TableCell padding="none">
          <TextField
            // className={classes.cellInput}
            autoComplete="off"
            variant="outlined"
            value={optional}
            error={hasError}
            onChange={(e) => {
              formik.setFieldValue(`cards[${index}].optional`, e.target.value);
            }}
          />
        </TableCell>
        <TableCell padding="none">
          {/* <Box className={classes.actions}> */}
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <IconButton
              onClick={() => {
                console.log(this.props.index);
                onRemove(this.props.index);
              }}
            >
              <DeleteIcon />
            </IconButton>
            {showUp && (
              <IconButton
                onClick={() => {
                  onUp(this.props.index);
                }}
              >
                <ArrowUpwardIcon />
              </IconButton>
            )}
            {showDown && (
              <IconButton
                onClick={() => {
                  onDown(this.props.index);
                }}
              >
                <ArrowDownwardIcon />
              </IconButton>
            )}
          </Box>
        </TableCell>
      </TableRow>
    );
  }
}

export const CardRow = connect(Row);

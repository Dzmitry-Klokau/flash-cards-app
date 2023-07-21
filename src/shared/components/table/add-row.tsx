import { TableCell, TableRow, IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { connect } from "formik";
import { withStyles, WithStyles } from "@mui/styles";
import React, { Component } from "react";

const styles = () => ({
  button: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
});

type Props = {
  tableName: string;
  createNewItem: () => any;
} & Partial<WithStyles<typeof styles>>;

class Row extends Component<Props & FormikProp> {
  render() {
    const { classes, formik, tableName, createNewItem } = this.props;

    return (
      <TableRow>
        <TableCell colSpan={4}>
          <IconButton
            className={classes?.button}
            onClick={() => {
              const newValue = [...formik.values[tableName], createNewItem()];
              console.log({ newValue, tableName });
              formik.setFieldValue(tableName, newValue);
            }}
          >
            <AddIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

// @ts-ignore
export const AddRow: React.FC<Props> = withStyles(styles)(connect<Props>(Row));

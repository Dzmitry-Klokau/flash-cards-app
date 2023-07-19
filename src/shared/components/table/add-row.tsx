import { TableCell, TableRow, IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { FormikProps, FormikValues, connect } from "formik";
import { withStyles, WithStyles } from "@mui/styles";
import { Component } from "react";

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
  formik: FormikProps<FormikValues>;
} & WithStyles<typeof styles>;

class Row extends Component<Props> {
  render() {
    const { classes, formik, tableName, createNewItem } = this.props;

    return (
      <TableRow>
        <TableCell colSpan={4}>
          <IconButton
            className={classes.button}
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

export const AddRow = withStyles(styles)(connect(Row));

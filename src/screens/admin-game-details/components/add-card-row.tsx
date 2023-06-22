import { TableCell, TableRow, IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { FormikProps, FormikValues, connect } from "formik";
import { withStyles, WithStyles } from "@mui/styles";
import { v4 as uuidv4 } from "uuid";
import { Component } from "react";

const styles = () => ({
  button: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
});

const emptyCard = (): CardType => ({
  primary: "",
  secondary: "",
  optional: "",
  uuid: uuidv4(),
});

type Props = {
  formik: FormikProps<FormikValues>;
} & WithStyles<typeof styles>;

class Row extends Component<Props> {
  render() {
    const { classes, formik } = this.props;

    return (
      <TableRow>
        <TableCell colSpan={4}>
          <IconButton
            className={classes.button}
            onClick={() => {
              formik.setFieldValue("cards", [
                ...formik.values.cards,
                emptyCard(),
              ]);
            }}
          >
            <AddIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

export const AddCardRow = withStyles(styles)(connect(Row));

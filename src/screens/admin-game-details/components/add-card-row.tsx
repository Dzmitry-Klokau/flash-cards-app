import { TableCell, TableRow, IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { connect } from "formik";
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
  index: 0,
  primary: "",
  secondary: "",
  optional: "",
  uuid: uuidv4(),
});

type Props = Partial<WithStyles<typeof styles>>;

class Row extends Component<Props & FormikProp> {
  render() {
    const { classes, formik } = this.props;

    return (
      <TableRow>
        <TableCell colSpan={4}>
          <IconButton
            className={classes?.button}
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

// @ts-ignore
export const AddCardRow: React.FC<Props> = withStyles(styles)(connect(Row));

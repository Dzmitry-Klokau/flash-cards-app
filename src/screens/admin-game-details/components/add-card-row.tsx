import { TableCell, TableRow, IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useFormikContext } from "formik";
import { makeStyles } from "@mui/styles";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles(() => ({
  button: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

const emptyCard = (): CardType => ({
  primary: "",
  secondary: "",
  optional: "",
  uuid: uuidv4(),
});

export const AddCardRow = () => {
  const { setFieldValue, values } = useFormikContext<GameType>();
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell colSpan={4}>
        <IconButton
          className={classes.button}
          onClick={() => {
            setFieldValue("cards", [...values.cards, emptyCard()]);
          }}
        >
          <AddIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

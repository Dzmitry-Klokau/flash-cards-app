import {
  TableCell,
  TableRow,
  Box,
  TextField,
  IconButton,
  Theme,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";
import { useFormikContext } from "formik";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  cellInput: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: "98%",
    minHeight: 50,
  },
}));

type Props = {
  card: CardType;
};

export const CardRow = ({ card }: Props) => {
  const { errors, values, handleBlur, setFieldValue } =
    useFormikContext<GameType>();
  const classes = useStyles();

  const index = values.cards.findIndex((c) => c.uuid === card.uuid);

  console.log(`render ${index}`);
  return (
    <TableRow>
      <TableCell padding="none">
        <TextField
          className={classes.cellInput}
          variant="outlined"
          value={card.primary}
          error={!!errors.cards?.[index]}
          onBlur={handleBlur(`cards[${index}].primary`)}
          onChange={(e) => {
            const newCards = values.cards.map((c, i) =>
              i === index ? { ...c, primary: e.target.value } : c
            );
            setFieldValue("cards", newCards);
          }}
        />
      </TableCell>
      <TableCell padding="none">
        <TextField
          className={classes.cellInput}
          variant="outlined"
          value={card.secondary}
          error={!!errors.cards?.[index]}
          onBlur={handleBlur(`cards[${index}].secondary`)}
          onChange={(e) => {
            const newCards = values.cards.map((c, i) =>
              i === index ? { ...c, secondary: e.target.value } : c
            );
            setFieldValue("cards", newCards);
          }}
        />
      </TableCell>
      <TableCell padding="none">
        <TextField
          className={classes.cellInput}
          variant="outlined"
          value={card.optional}
          error={!!errors.cards?.[index]}
          onBlur={handleBlur(`cards[${index}].optional`)}
          onChange={(e) => {
            const newCards = values.cards.map((c, i) =>
              i === index ? { ...c, optional: e.target.value } : c
            );
            setFieldValue("cards", newCards);
          }}
        />
      </TableCell>
      <TableCell padding="none">
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            onClick={() => {
              setFieldValue(
                "cards",
                values.cards.filter((_, i) => i !== index)
              );
            }}
          >
            <DeleteIcon />
          </IconButton>
          {index !== 0 && (
            <IconButton
              onClick={() => {
                let data = [...values.cards];
                let temp = data[index];
                data[index] = data[index - 1];
                data[index - 1] = temp;

                setFieldValue("cards", data);
              }}
            >
              <ArrowUpwardIcon />
            </IconButton>
          )}
          {index !== values.cards.length - 1 && (
            <IconButton
              onClick={() => {
                let data = [...values.cards];
                let temp = data[index];
                data[index] = data[index + 1];
                data[index + 1] = temp;

                setFieldValue("cards", data);
              }}
            >
              <ArrowDownwardIcon />
            </IconButton>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
};

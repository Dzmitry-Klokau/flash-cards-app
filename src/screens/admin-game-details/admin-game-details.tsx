import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Paper,
  Box,
  Divider,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import { isUndefined } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";

import { readGameById, writeGame } from "../../service/firebase";
import { object, string, array } from "yup";

const validationSchema = object({
  title: string().required(),
  desc: string().required(),
  cards: array()
    .required()
    .of(
      object({
        primary: string().required(),
        secondary: string().required(),
        optional: string().required(),
      })
    ),
});

export const AdminGameDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<GameType>();
  const params = useParams();

  useEffect(() => {
    const loadData = async (id: string) => {
      const res = await readGameById(id);
      setData(res);
    };
    if (params.id) {
      // esiting game
      loadData(params.id);
    } else {
      // new game
      const emptyGame: GameType = {
        title: "",
        desc: "",
        cards: [],
      };
      setData(emptyGame);
    }
  }, [params.id]);

  if (isUndefined(data)) {
    return null;
  }

  return (
    <Grid item xs={12} md={8} lg={9}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Formik
          initialValues={data}
          validationSchema={validationSchema}
          validateOnBlur={true}
          validateOnChange={false}
          onSubmit={async (data) => {
            const res = await writeGame(data);
            if (res?.id) {
              navigate(res.id, {
                relative: "path",
              });
            } else {
              navigate(0);
            }
          }}
        >
          {({
            handleSubmit,
            handleBlur,
            handleChange,
            setFieldValue,
            setTouched,
            errors,
            values,
            dirty,
            isValid,
          }) => (
            <>
              {data.id && (
                <>
                  <TextField
                    sx={{ mt: 6 }}
                    label="ID"
                    variant="standard"
                    value={data.id}
                    disabled
                  />
                  <Divider />
                </>
              )}
              <TextField
                sx={{ mt: 2 }}
                label="Title"
                variant="standard"
                value={values.title}
                error={!!errors.title}
                onBlur={handleBlur("title")}
                onChange={handleChange("title")}
              />
              <Divider />
              <TextField
                sx={{ mt: 2 }}
                label="Description"
                variant="standard"
                value={values.desc}
                error={!!errors.desc}
                onBlur={handleBlur("desc")}
                onChange={handleChange("desc")}
              />
              <Divider />
              <TableContainer component={Box} sx={{ ph: 1, mt: 6 }}>
                <Table sx={{ minWidth: 200 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Primary</TableCell>
                      <TableCell>Secondary</TableCell>
                      <TableCell>Optional</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {values.cards.map((card, index) => (
                      <TableRow key={`${data.cards.length}-${index}`}>
                        <TableCell padding="none">
                          <TextField
                            variant="outlined"
                            value={card.primary}
                            error={!!errors.cards?.[index]}
                            onBlur={handleBlur(`cards[${index}].primary`)}
                            onChange={(e) => {
                              const newCards = values.cards.map((c, i) =>
                                i === index
                                  ? { ...c, primary: e.target.value }
                                  : c
                              );
                              setFieldValue("cards", newCards);
                            }}
                            sx={styles.cellInput}
                          />
                        </TableCell>
                        <TableCell padding="none">
                          <TextField
                            variant="outlined"
                            value={card.secondary}
                            error={!!errors.cards?.[index]}
                            onBlur={handleBlur(`cards[${index}].secondary`)}
                            onChange={(e) => {
                              const newCards = values.cards.map((c, i) =>
                                i === index
                                  ? { ...c, secondary: e.target.value }
                                  : c
                              );
                              setFieldValue("cards", newCards);
                            }}
                            sx={styles.cellInput}
                          />
                        </TableCell>
                        <TableCell padding="none">
                          <TextField
                            variant="outlined"
                            value={card.optional}
                            error={!!errors.cards?.[index]}
                            onBlur={handleBlur(`cards[${index}].optional`)}
                            onChange={(e) => {
                              const newCards = values.cards.map((c, i) =>
                                i === index
                                  ? { ...c, optional: e.target.value }
                                  : c
                              );
                              setFieldValue("cards", newCards);
                            }}
                            sx={styles.cellInput}
                          />
                        </TableCell>
                        <TableCell padding="none">
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
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={4} onClick={() => {}}>
                        <IconButton
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                          }}
                          onClick={() => {
                            setFieldValue("cards", [
                              ...values.cards,
                              { primary: "", secondary: "", optional: "" },
                            ]);
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 6, mb: 2 }}
                onClick={() => {
                  setTouched(
                    {
                      title: true,
                      desc: true,
                      cards: values.cards.map((_) => ({
                        primary: true,
                        secondary: true,
                        optional: true,
                      })),
                    },
                    true
                  );
                  if (dirty && isValid) {
                    handleSubmit();
                  }
                }}
                disabled={!dirty}
              >
                Save
              </Button>
            </>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

const styles = {
  cellInput: {
    mt: 1,
    mb: 1,
    width: "98%",
    minHeight: 50,
  },
};

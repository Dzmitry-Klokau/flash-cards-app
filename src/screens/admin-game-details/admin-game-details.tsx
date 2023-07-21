import { useCallback, useEffect } from "react";
import { Grid, Paper, TextField, Theme } from "@mui/material";
import { isUndefined } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@mui/styles";
import { object, string, array } from "yup";

import { Info } from "./components";
import { FormikSubmitBtn, Table } from "../../shared/components";
import {
  useLazyGameByIdQuery,
  useUpdateGameCollectionMutation,
} from "../../api";

const emptyGame: GameType = {
  id: "",
  title: "",
  desc: "",
  cards: [],
};

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

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
  },
}));

export const AdminGameDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const classes = useStyles();

  const [fetchGameById, { data }] = useLazyGameByIdQuery();
  const [update] = useUpdateGameCollectionMutation();

  useEffect(() => {
    if (params.id) {
      // esiting game
      fetchGameById(params.id);
    }
  }, [params.id, fetchGameById]);

  const handleSubmit = async (data: GameType) => {
    // const res = await update(data);
    update({ gameId: data.id, newGame: data });
    // if (res?.id) {
    //   navigate(res.id, {
    //     relative: "path",
    //   });
    // } else {
    navigate(-1);
    // }
  };

  const renderCell: RenderCellFunc = useCallback(
    (name, rowIndex, formik, hasError, sx) => (
      <TextField
        sx={sx}
        autoComplete="off"
        variant="outlined"
        value={formik.values.cards[rowIndex][name]}
        error={hasError}
        onChange={(e) => {
          formik.setFieldValue(`cards[${rowIndex}].${name}`, e.target.value);
        }}
      />
    ),
    []
  );

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
          initialValues={data || emptyGame}
          enableReinitialize
          validationSchema={validationSchema}
          validateOnBlur={true}
          validateOnChange={false}
          onSubmit={handleSubmit}
        >
          <>
            <Info />
            <Table
              tableName="cards"
              titles={["Primary", "Secondary", "Optional"]}
              valueNames={["primary", "secondary", "optional"]}
              createNewItem={() => ({
                primary: "",
                secondary: "",
                optional: "",
                uuid: uuidv4(),
              })}
              renderCell={renderCell}
            />
            <FormikSubmitBtn className={classes.button} title={"Save"} />
          </>
        </Formik>
      </Paper>
    </Grid>
  );
};

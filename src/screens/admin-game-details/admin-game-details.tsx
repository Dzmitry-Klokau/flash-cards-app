import { useEffect, useState } from "react";

import { Grid, Paper, Button } from "@mui/material";
import { isUndefined } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";

import { readGameById, writeGame } from "../../service/firebase";
import { object, string, array } from "yup";
import { Cards, Info } from "./components";

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
          {({ handleSubmit, setTouched, values, dirty, isValid }) => (
            <>
              <Info />
              <Cards />
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

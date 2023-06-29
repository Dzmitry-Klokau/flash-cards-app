import { useEffect, useState } from "react";

import { Grid, Paper, Theme } from "@mui/material";
import { isUndefined } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";

import { readGroupById, writeGroup } from "../../service/firebase";
import { object, string } from "yup";
import { Info } from "./components";
import { FormikSubmitBtn } from "../../shared/components";
import { makeStyles } from "@mui/styles";

const emptyGroup: GroupType = {
  title: "",
  desc: "",
};

const validationSchema = object({
  title: string().required(),
  desc: string().required(),
});

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
  },
}));

export const AdminGroupDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<GroupType>();
  const params = useParams();
  const classes = useStyles();

  useEffect(() => {
    const loadData = async (id: string) => {
      const res = await readGroupById(id);
      setData(res);
    };
    if (params.id) {
      // esiting group
      loadData(params.id);
    } else {
      // new game
      setData(emptyGroup);
    }
  }, [params.id]);

  const handleSubmit = async (data: GroupType) => {
    const res = await writeGroup(data);
    if (res?.id) {
      navigate(res.id, {
        relative: "path",
      });
    } else {
      navigate(-1);
    }
  };

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
          onSubmit={handleSubmit}
        >
          <>
            <Info />
            <FormikSubmitBtn className={classes.button} title={"Save"} />
          </>
        </Formik>
      </Paper>
    </Grid>
  );
};

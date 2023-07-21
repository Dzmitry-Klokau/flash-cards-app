import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { FormikInput } from "../../../shared/components";

const useStyles = makeStyles((theme: Theme) => ({
  field: {
    marginTop: theme.spacing(2),
  },
}));

export const Info = () => {
  const classes = useStyles();

  return (
    <>
      <FormikInput
        className={classes.field}
        title="ID"
        fieldName="id"
        disabled
      />
      <FormikInput className={classes.field} title="Title" fieldName="title" />
      <FormikInput
        className={classes.field}
        title="Description"
        fieldName="desc"
      />
    </>
  );
};

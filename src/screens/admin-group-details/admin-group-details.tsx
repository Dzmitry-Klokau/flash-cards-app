import { useCallback, useEffect } from "react";

import {
  Autocomplete,
  Grid,
  Paper,
  Chip,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { isUndefined } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { array, object, string } from "yup";
import { makeStyles } from "@mui/styles";

import { Info } from "./components";
import { FormikSubmitBtn, Table } from "../../shared/components";
import {
  useGameIdsQuery,
  useLazyGroupByIdQuery,
  useUpdateGroupCollectionMutation,
} from "../../api";

const emptyGroup: GroupType = {
  id: "",
  title: "",
  desc: "",
  categories: [],
};

const validationSchema = object({
  title: string().required(),
  desc: string().required(),
  categories: array()
    .required()
    .of(
      object({
        name: string().required(),
        games: array().required().min(1),
      })
    ),
});

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
  },
}));

export const AdminGroupDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const classes = useStyles();

  const [fetchGroupById, { data }] = useLazyGroupByIdQuery();
  const { data: gameData } = useGameIdsQuery();
  const [update] = useUpdateGroupCollectionMutation();

  useEffect(() => {
    if (params.id) {
      // esiting group
      fetchGroupById(params.id);
    }
  }, [params.id, fetchGroupById]);

  const handleSubmit = async (data: GroupType) => {
    update({ groupId: data.id, newGroup: data });
    // if (res?.id) {
    //   navigate(res.id, {
    //     relative: "path",
    //   });
    // } else {
    navigate(-1);
    // }
  };

  const renderCell: RenderCellFunc = useCallback(
    (name, rowIndex, formik, hasError, sx) => {
      const row = formik.values.categories[rowIndex];

      if (name === "name") {
        return (
          <TextField
            sx={sx}
            autoComplete="off"
            variant="outlined"
            value={row[name]}
            error={hasError}
            onChange={(e) => {
              formik.setFieldValue(
                `categories[${rowIndex}].${name}`,
                e.target.value
              );
            }}
          />
        );
      }

      if (isUndefined(gameData)) return null;

      return (
        <Autocomplete
          multiple
          id="tags-standard"
          options={gameData}
          getOptionLabel={(option) => option?.title || ""}
          value={row.games}
          onChange={(_e, value) => {
            formik.setFieldValue(`categories[${rowIndex}].games`, value);
          }}
          renderTags={(value: Array<GameIdsType>) =>
            value.map((v) => {
              const exists = gameData.find(
                (e) => e.id === v.id && e.title === v.title
              );
              return (
                <Chip
                  key={`${v.id}-${v.title}`}
                  label={v.title}
                  onDelete={() => {
                    const filtered = row.games.filter(
                      (g: GameIdsType) =>
                        !(g.id === v.id && g.title === v.title)
                    );
                    formik.setFieldValue(
                      `categories[${rowIndex}].games`,
                      filtered
                    );
                  }}
                  {...(exists ? {} : { color: "error" })}
                />
              );
            })
          }
          renderOption={(props, option) => {
            const selected = row.games?.find(
              (e: GameIdsType) => e.id === option.id
            );
            if (selected) {
              return null;
            }
            return <Typography {...props}>{option.title}</Typography>;
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={sx}
              variant="outlined"
              value={row.games}
            />
          )}
        />
      );
    },
    [gameData]
  );

  if (isUndefined(emptyGroup)) {
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
          initialValues={data || emptyGroup}
          enableReinitialize
          validationSchema={validationSchema}
          validateOnBlur={true}
          validateOnChange={false}
          onSubmit={handleSubmit}
        >
          <>
            <Info />
            <Table
              tableName="categories"
              titles={["Name", "Games"]}
              valueNames={["name", "games"]}
              createNewItem={() => ({
                name: "",
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

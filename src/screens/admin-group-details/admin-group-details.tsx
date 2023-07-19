import { useCallback, useEffect, useState } from "react";

import {
  Autocomplete,
  Grid,
  Paper,
  Chip,
  TextField,
  Theme,
} from "@mui/material";
import { isUndefined } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { v4 as uuidv4 } from "uuid";

import {
  readAllGameIds,
  readGroupById,
  writeGroup,
} from "../../service/firebase";
import { array, object, string } from "yup";
import { Info } from "./components";
import { FormikSubmitBtn, Table } from "../../shared/components";
import { makeStyles } from "@mui/styles";

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
  const [data, setData] = useState<GroupType>();
  const [gameData, setGameData] = useState<Array<GameIdsType>>();
  const params = useParams();
  const classes = useStyles();

  useEffect(() => {
    const loadGamesData = async () => {
      const resGames = await readAllGameIds();
      setGameData(resGames);
    };

    const loadData = async (id: string) => {
      await loadGamesData();
      const res = await readGroupById(id);
      setData(res);
    };
    if (params.id) {
      // esiting group
      loadData(params.id);
    } else {
      // new game
      loadGamesData();
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
          defaultValue={[]}
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
          renderInput={(params) => (
            <TextField {...params} sx={sx} variant="outlined" />
          )}
        />
      );
    },
    [gameData]
  );

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

import {
  Typography,
  Grid,
  Breadcrumbs,
  Link,
  Paper,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { readGroupCollection } from "../../service/firebase";
import { useEffect, useState } from "react";
import { CategoryItem, GameItem, GroupItem } from "./components";

const useStyles = makeStyles((theme: Theme) => ({
  cardList: {
    marginTop: theme.spacing(2),
  },
}));

export const GamesScreen = () => {
  const classes = useStyles();

  const [data, setData] = useState<GroupType[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<GroupType>();
  const [selectedCategory, setSelectedCategory] = useState<GroupCategoryNode>();

  useEffect(() => {
    const loadGroups = async () => {
      const res = await readGroupCollection();
      setData(res);
    };
    loadGroups();
  }, []);

  return (
    <Grid item xs={12} md={8} lg={9}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          {selectedGroup ? (
            <Link
              underline="hover"
              color="inherit"
              onClick={() => {
                setSelectedGroup(undefined);
              }}
            >
              Groups
            </Link>
          ) : (
            <Typography color="text.primary">Groups</Typography>
          )}
          {selectedGroup && selectedCategory && (
            <Link
              underline="hover"
              color="inherit"
              onClick={() => {
                setSelectedCategory(undefined);
              }}
            >
              {selectedGroup.title}
            </Link>
          )}
          {selectedGroup && !selectedCategory && (
            <Typography color="text.primary">{selectedGroup.title}</Typography>
          )}
          {selectedCategory && (
            <Typography color="text.primary">
              {selectedCategory.name}
            </Typography>
          )}
        </Breadcrumbs>
        <Grid container spacing={3} className={classes.cardList}>
          {!selectedGroup && (
            <>
              {data.map((item) => (
                <GroupItem
                  data={item}
                  onClick={() => {
                    setSelectedGroup(item);
                  }}
                />
              ))}
            </>
          )}
          {selectedGroup && !selectedCategory && (
            <>
              {selectedGroup.categories.map((c) => (
                <CategoryItem
                  data={c}
                  onClick={() => {
                    setSelectedCategory(c);
                  }}
                />
              ))}
            </>
          )}
          {selectedCategory && (
            <>
              {selectedCategory.games.map((g) => (
                <GameItem data={g} />
              ))}
            </>
          )}
        </Grid>
      </Paper>
    </Grid>
  );
};

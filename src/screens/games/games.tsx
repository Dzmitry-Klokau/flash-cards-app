import { useEffect, useState } from "react";
import { Grid, Paper, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Breadcrumbs, CategoryItem, GameItem, GroupItem } from "./components";
import { useSearchParams } from "react-router-dom";
import { isEmpty, isNull } from "lodash";
import { useGroupCollectionQuery } from "../../api";

const useStyles = makeStyles((theme: Theme) => ({
  cardList: {
    marginTop: theme.spacing(2),
  },
}));

export const GamesScreen = () => {
  const classes = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading } = useGroupCollectionQuery();

  const [selectedGroup, setSelectedGroup] = useState<GroupType | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<
    GroupCategoryNode | undefined
  >();

  useEffect(() => {
    if (data) {
      let params: any = {};
      if (selectedGroup) {
        params.group = `${selectedGroup?.id}`;
      }
      if (selectedCategory) {
        params.category = `${selectedCategory?.name}`;
      }
      setSearchParams(params);
    }
  }, [setSearchParams, data, selectedCategory, selectedGroup]);

  useEffect(() => {
    if (data && !isNull(searchParams.get("group"))) {
      const group = data.find((g) => g.id === searchParams.get("group"));
      setSelectedGroup(group);

      if (group && !isNull(searchParams.get("category"))) {
        setSelectedCategory(
          group.categories.find((c) => c.name === searchParams.get("category"))
        );
      }
    }
  }, [data, searchParams]);

  if (isLoading) {
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
        <Breadcrumbs
          level1Label={"All"}
          level1OnPress={() => {
            setSelectedCategory(undefined);
            setSelectedGroup(undefined);
          }}
          level2Label={selectedGroup?.title}
          level2OnPress={() => {
            setSelectedCategory(undefined);
          }}
          level3Label={selectedCategory?.name}
        />
        <Grid container spacing={3} className={classes.cardList}>
          <Content
            groups={data}
            group={selectedGroup}
            onSelectGroup={(v) => setSelectedGroup(v)}
            category={selectedCategory}
            onSelectCategory={(v) => setSelectedCategory(v)}
          />
        </Grid>
      </Paper>
    </Grid>
  );
};

type ContentProps = {
  category: GroupCategoryNode | undefined;
  onSelectCategory: (value: GroupCategoryNode) => void;
  group: GroupType | undefined;
  onSelectGroup: (value: GroupType) => void;
  groups?: GroupType[];
};

const Content = ({
  category,
  onSelectCategory,
  group,
  onSelectGroup,
  groups,
}: ContentProps) => {
  if (category) {
    if (isEmpty(category.games)) {
      return <EmptyState />;
    }

    return (
      <>
        {category.games.map((g) => (
          <GameItem key={g.id} data={g} />
        ))}
      </>
    );
  }

  if (group) {
    if (isEmpty(group.categories)) {
      return <EmptyState />;
    }

    return (
      <>
        {group.categories.map((c) => (
          <CategoryItem
            key={c.name}
            data={c}
            onClick={() => {
              onSelectCategory(c);
            }}
          />
        ))}
      </>
    );
  }

  return (
    <>
      {groups?.map((item) => (
        <GroupItem
          key={item.id}
          data={item}
          onClick={() => {
            onSelectGroup(item);
          }}
        />
      ))}
    </>
  );
};

const EmptyState = () => (
  <Grid item xs={12} sx={{ alignContent: "center" }}>
    <Typography>No items</Typography>
  </Grid>
);

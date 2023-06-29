import { useEffect, useState } from "react";
import { Tabs, Box, Grid, Tab } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isNull } from "lodash";

import {
  readGameCollection,
  readGroupCollection,
} from "../../service/firebase";
import { Tab as AdminTab } from "./components";
import { routes } from "../../navigation";

export const AdminScreen = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState(
    isNull(searchParams.get("tab")) ? 0 : +searchParams.get("tab")!
  );
  const [groups, setGroups] = useState<Array<GroupType>>([]);
  const [games, setGames] = useState<Array<GameType>>([]);

  useEffect(() => {
    setSearchParams({ tab: `${activeTab}` });
  }, [setSearchParams, activeTab]);

  useEffect(() => {
    const loadGroups = async () => {
      const res = await readGroupCollection();
      setGroups(res);
    };
    const loadGames = async () => {
      const res = await readGameCollection();
      setGames(res);
    };
    loadGroups();
    loadGames();
  }, []);

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          aria-label="basic tabs example"
        >
          <Tab label="Groups" />
          <Tab label="Games" />
        </Tabs>
        <AdminTab
          data={groups}
          visible={activeTab === 0}
          onAddPress={() => {
            navigate(routes["admin-group-details"].path, {
              relative: "path",
            });
          }}
          onRowPress={(id) => {
            navigate(`${routes["admin-group-details"].path}/${id}`, {
              relative: "path",
            });
          }}
        />
        <AdminTab
          data={games}
          visible={activeTab === 1}
          onAddPress={() => {
            navigate(routes["admin-game-details"].path, {
              relative: "path",
            });
          }}
          onRowPress={(id) => {
            navigate(`${routes["admin-game-details"].path}/${id}`, {
              relative: "path",
            });
          }}
        />
      </Box>
    </Grid>
  );
};

import { Tabs, Box, Grid, Tab } from "@mui/material";
import { useEffect, useState } from "react";

import {
  readGameCollection,
  readGroupCollection,
} from "../../service/firebase";
import { GameTable, GroupTable } from "./components";

export const AdminScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [groups, setGroups] = useState<Array<GroupType>>([]);
  const [games, setGames] = useState<Array<GameType>>([]);

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
        {activeTab === 0 && <GroupTable data={groups} />}
        <GameTable data={games} visible={activeTab === 1} />
      </Box>
    </Grid>
  );
};

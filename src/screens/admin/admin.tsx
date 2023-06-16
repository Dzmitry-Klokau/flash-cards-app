import { useEffect, useState } from "react";
import { Tabs, Box, Grid, Tab } from "@mui/material";

import {
  readGameCollection,
  readGroupCollection,
} from "../../service/firebase";
import { GroupTab, GameTab } from "./tabs";

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
        <GroupTab data={groups} visible={activeTab === 0} />
        <GameTab data={games} visible={activeTab === 1} />
      </Box>
    </Grid>
  );
};

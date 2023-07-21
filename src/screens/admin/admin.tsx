import { useEffect, useState } from "react";
import { Tabs, Box, Grid, Tab } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isNull } from "lodash";

import { Tab as AdminTab } from "./components";
import { routes } from "../../navigation";
import { useGroupCollectionQuery, useGameCollectionQuery } from "../../redux";

export const AdminScreen = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: groups } = useGroupCollectionQuery();
  const { data: games } = useGameCollectionQuery();

  const [activeTab, setActiveTab] = useState(
    isNull(searchParams.get("tab")) ? 0 : +searchParams.get("tab")!
  );

  useEffect(() => {
    setSearchParams({ tab: `${activeTab}` });
  }, [setSearchParams, activeTab]);

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

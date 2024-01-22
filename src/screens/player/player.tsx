import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { isUndefined } from "lodash";

import { LearningView, SelectMode, PlayingView } from "./components";
import { useLazyGameByIdQuery } from "../../api";
import { LocalSettingsContextProvider } from "./context";
import { PlayerMode } from "../../shared/enums";

export const PlayerScreen = () => {
  const [playerMode, setPlayerMode] = useState<PlayerMode>();
  const params = useParams();
  const [fetchGameById, { data }] = useLazyGameByIdQuery();

  useEffect(() => {
    if (params.id) {
      fetchGameById(params.id);
    }
  }, [params.id, fetchGameById]);

  if (isUndefined(data)) {
    return null;
  }

  if (isUndefined(playerMode)) {
    return <SelectMode onSelect={setPlayerMode} />;
  }

  console.log({ playerMode });
  return (
    <Grid item xs={12} md={8} lg={9}>
      <LocalSettingsContextProvider size={data.cards.length}>
        {playerMode === PlayerMode.Learning && (
          <LearningView
            data={data}
            onModeExit={() => {
              setPlayerMode(undefined);
            }}
          />
        )}
        {playerMode === PlayerMode.Playing && (
          <PlayingView
            data={data}
            onModeExit={() => {
              setPlayerMode(undefined);
            }}
          />
        )}
      </LocalSettingsContextProvider>
    </Grid>
  );
};

import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  MobileStepper,
  Button,
  CardActionArea,
  Card,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { readGameById } from "../../service/firebase";
import { isUndefined } from "lodash";

export const PlayerScreen = () => {
  const params = useParams();
  const [data, setData] = useState<GameType>();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const loadData = async (id: string) => {
      const res = await readGameById(id);
      setData(res);
    };
    if (params.id) {
      loadData(params.id);
    }
  }, [params.id]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {data?.title}
        </Typography>
        <Item key={activeStep} item={data.cards[activeStep]} />
        <MobileStepper
          variant="text"
          steps={data.cards.length}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === data.cards.length - 1}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </Paper>
    </Grid>
  );
};

const Item = ({ item }: { item: CardType }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 4,
        mb: 4,
      }}
    >
      <Card variant="outlined">
        <CardActionArea
          onClick={() => {
            setOpen(true);
          }}
          sx={{
            p: 4,
            minWidth: 250,
            minHeight: 250,
          }}
        >
          {open ? (
            <>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                {item.secondary}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                [ {item.optional} ]
              </Typography>
            </>
          ) : (
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {item.primary}
            </Typography>
          )}
        </CardActionArea>
      </Card>
    </Box>
  );
};

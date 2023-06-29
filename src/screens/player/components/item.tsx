import { useEffect, useState } from "react";
import {
  Typography,
  CardActionArea,
  Card,
  Theme,
  Box,
  styled,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { shouldForwardProp } from "../../../shared/utils";

const useStyles = makeStyles((theme: Theme) => ({
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: theme.spacing(2),
    width: "100%",
  },
  cardContent: {
    padding: theme.spacing(4),
    [theme.breakpoints.down("md")]: {
      minHeight: 250,
    },
    [theme.breakpoints.up("md")]: {
      height: "50vh",
    },
  },
  text: { textAlign: "center" },
}));

type AnswerState = "visible" | "hidden" | "closed" | undefined;

type CardProps = {
  answerState: AnswerState;
};

const ANIMATION_DURATION = 1000;

const WrappedCard = styled(Card, {
  shouldForwardProp: (prop) =>
    shouldForwardProp<CardProps>(["answerState"], prop),
})<CardProps>(({ theme, answerState }) => ({
  margin: theme.spacing(2),
  width: "100%",
  marginLeft: 0,
  backgroundColor: theme.palette.secondary.main,
  transition: theme.transitions.create("all", {
    easing: theme.transitions.easing.easeInOut,
    duration: ANIMATION_DURATION,
  }),
  ...(answerState === undefined && {
    marginLeft: -4000,
  }),
  ...(answerState === "closed" && {
    marginRight: -4000,
  }),
  ...(answerState === "visible" && {
    transform: "rotateY(180deg)",
  }),
}));

type ContentProps = {
  visible: boolean;
  rotate?: boolean;
};

const WrappedContent = styled(Box, {
  shouldForwardProp: (prop) =>
    shouldForwardProp<ContentProps>(["visible", "rotate"], prop),
})<ContentProps>(({ theme, visible, rotate }) => ({
  height: 0,
  opacity: 0,
  ...(visible && {
    height: "auto",
    transform: rotate ? "rotateY(180deg)" : undefined,
    transition: theme.transitions.create("opacity", {
      easing: theme.transitions.easing.sharp,
      delay: ANIMATION_DURATION,
    }),
    opacity: 1,
  }),
}));

type Props = { item: CardType; className?: string; onNext: VoidFunction };

export const Item = ({ item, className, onNext }: Props) => {
  const classes = useStyles();
  const [answerState, setAnswerState] = useState<AnswerState>();

  useEffect(() => {
    setAnswerState("hidden");
  }, []);

  useEffect(() => {
    if (answerState === "closed") {
      setTimeout(() => {
        onNext();
      }, ANIMATION_DURATION / 2);
    }
  }, [answerState, onNext]);

  return (
    <Box className={clsx(classes.centered, className)}>
      <WrappedCard variant="outlined" answerState={answerState}>
        <CardActionArea
          onClick={() => {
            if (answerState === "visible") {
              setAnswerState("closed");
              return;
            }
            setAnswerState("visible");
          }}
          className={classes.cardContent}
        >
          <WrappedContent visible={answerState === "visible"} rotate>
            <Typography variant="h5" className={classes.text}>
              {item.secondary}
            </Typography>
            <Typography variant="h6" className={classes.text}>
              [ {item.optional} ]
            </Typography>
          </WrappedContent>
          <WrappedContent visible={answerState === "hidden"}>
            <Typography variant="h5" className={classes.text}>
              {item.primary}
            </Typography>
          </WrappedContent>
        </CardActionArea>
      </WrappedCard>
    </Box>
  );
};

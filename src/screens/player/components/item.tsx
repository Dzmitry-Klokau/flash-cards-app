import { useCallback, useEffect, useRef, useState } from "react";
import {
  Typography,
  CardActionArea,
  Card,
  Theme,
  Box,
  styled,
} from "@mui/material";
import { useSelector } from "react-redux";

import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { shouldForwardProp } from "../../../shared/utils";
import { RootState } from "../../../redux";

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
    minHeight: "50vh",
  },
  text: { textAlign: "center" },
  stepNumber: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

type AnswerState = "visible" | "hidden" | "closed" | undefined;

type CardProps = {
  answerState: AnswerState;
  animationDuration: number;
};

const WrappedCard = styled(Card, {
  shouldForwardProp: (prop) =>
    shouldForwardProp<CardProps>(["answerState", "animationDuration"], prop),
})<CardProps>(({ theme, answerState, animationDuration }) => ({
  margin: theme.spacing(2),
  width: "100%",
  transition: theme.transitions.create("all", {
    easing: theme.transitions.easing.easeInOut,
    duration: animationDuration,
  }),
  ...(answerState === undefined && {
    [theme.breakpoints.down("md")]: {
      marginLeft: -500,
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: -2000,
    },
  }),
  ...(answerState === "closed" && {
    [theme.breakpoints.down("md")]: {
      marginRight: -1000,
    },
    [theme.breakpoints.up("md")]: {
      marginRight: -4000,
    },
  }),
  ...(answerState === "visible" && {
    transform: "rotateY(180deg)",
  }),
}));

type ContentProps = {
  visible: boolean;
  animationDuration: number;
  rotate?: boolean;
};

const WrappedContent = styled(Box, {
  shouldForwardProp: (prop) =>
    shouldForwardProp<ContentProps>(
      ["visible", "rotate", "animationDuration"],
      prop
    ),
})<ContentProps>(({ theme, visible, rotate, animationDuration }) => ({
  height: 0,
  opacity: 0,
  ...(visible && {
    height: "auto",
    transform: rotate ? "rotateY(180deg)" : undefined,
    transition: theme.transitions.create("opacity", {
      easing: theme.transitions.easing.sharp,
      delay: animationDuration,
    }),
    opacity: 1,
  }),
}));

type Props = {
  item: CardType;
  className?: string;
  onNext: VoidFunction;
};

export const Item = ({ item, className, onNext }: Props) => {
  const classes = useStyles();
  const autoplayTimeout = useRef<NodeJS.Timeout | undefined>();

  const [answerState, setAnswerState] = useState<AnswerState>();

  const animation = useSelector((state: RootState) => state.player.animation);
  const alwaysShowPrimary = useSelector(
    (state: RootState) => state.player.alwaysShowPrimary
  );
  const autoplay = useSelector((state: RootState) => state.player.autoplay);
  const autoplaySpeed = useSelector(
    (state: RootState) => state.player.autoplaySpeed
  );

  const handleClick = useCallback(() => {
    if (answerState === "visible") {
      setAnswerState("closed");
      return;
    }
    setAnswerState("visible");
  }, [answerState]);

  useEffect(() => {
    if (autoplayTimeout.current) {
      clearTimeout(autoplayTimeout.current);
    }
    if (autoplay) {
      autoplayTimeout.current = setTimeout(() => {
        handleClick();
      }, autoplaySpeed);
    }
  }, [handleClick, autoplay, autoplaySpeed]);

  useEffect(() => {
    setTimeout(() => {
      setAnswerState("hidden");
    }, 0);
  }, []);

  useEffect(() => {
    if (answerState === "closed") {
      setTimeout(() => {
        onNext();
      }, animation);
    }
  }, [answerState, animation, onNext]);

  return (
    <Box className={clsx(classes.centered, className)}>
      <WrappedCard
        variant="outlined"
        answerState={answerState}
        animationDuration={animation}
      >
        <CardActionArea onClick={handleClick} className={classes.cardContent}>
          {answerState !== "visible" && (
            <Typography className={classes.stepNumber}>{item.index}</Typography>
          )}
          <WrappedContent
            visible={answerState === "visible"}
            rotate
            animationDuration={animation}
          >
            <Typography variant="h5" className={classes.text}>
              {item.secondary}
            </Typography>
            <Typography variant="h6" className={classes.text}>
              [ {item.optional} ]
            </Typography>
            {alwaysShowPrimary && (
              <Typography variant="h6" className={classes.text}>
                {item.primary}
              </Typography>
            )}
          </WrappedContent>
          <WrappedContent
            visible={answerState === "hidden"}
            animationDuration={animation}
          >
            <Typography variant="h5" className={classes.text}>
              {item.primary}
            </Typography>
          </WrappedContent>
        </CardActionArea>
      </WrappedCard>
    </Box>
  );
};

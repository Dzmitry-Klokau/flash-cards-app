import { Grid, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { routes } from "../../navigation";
import HomeBanner from "../../assets/images/home-banner.png";

export const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <Grid item xs={12} md={8} lg={9}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img src={HomeBanner} alt={"home-banner"} loading="lazy" />
        <br />
        <Typography>
          A flashcard or flash card (also known as an index card) is a card
          bearing information on both sides, which is intended to be used as an
          aid in memorization. Each flashcard bears a question on one side and
          an answer on the other. Flashcards are often used to memorize
          vocabulary, historical dates, formulae or any subject matter that can
          be learned via a question-and-answer format. Flashcards can be virtual
          (part of a flashcard software), or physical.
        </Typography>
        <br />
        <Typography>
          Flashcards are an application of the testing effect - the finding that
          long-term memory is increased when some of the learning period is
          devoted to retrieving the information through testing with proper
          feedback. Study habits affect the rate at which a flashcard-user
          learns, and proper spacing of flashcards has been proven to accelerate
          learning. A number of spaced repetition software programs exist which
          take advantage of this principle.
        </Typography>
        <br />
        <Button
          onClick={() => {
            navigate(`/${routes.games.path}`);
          }}
        >
          Start playing
        </Button>
      </Paper>
    </Grid>
  );
};

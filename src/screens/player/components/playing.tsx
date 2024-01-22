import { Header } from "./header";

type Props = {
  onModeExit: VoidFunction;
  data: GameType;
};

export const PlayingView = ({ data, onModeExit }: Props) => {
  return (
    <>
      <Header title={data.title} onExitPress={onModeExit} />
    </>
  );
};

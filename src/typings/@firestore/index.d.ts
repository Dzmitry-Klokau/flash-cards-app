declare type GroupType = {
  id: string;
  title: string;
  desc: string;
};

declare type CardType = {
  uuid: string;
  primary: string;
  secondary: string;
  optional: string;
};

declare type GameType = {
  id?: string;
  title: string;
  desc: string;
  cards: Array<CardType>;
};

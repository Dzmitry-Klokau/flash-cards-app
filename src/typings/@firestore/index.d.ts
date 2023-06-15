declare type GroupType = {
  uid: string;
  title: string;
  desc: string;
};

declare type GameType = {
  uid: string;
  title: string;
  desc: string;
  cards: Array<{
    primary: string;
    secondary: string;
    optional: string;
  }>;
};

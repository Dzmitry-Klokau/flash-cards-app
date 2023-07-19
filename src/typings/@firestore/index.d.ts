declare type GameIdsType = {
  id: string;
  title: string;
};

declare type GameType = GameIdsType & {
  desc: string;
  cards: Array<CardType>;
};

declare type GroupCategoryNode = {
  name: string;
  games: Array<GameIdsType>;
};

declare type GroupType = {
  id: string;
  title: string;
  desc: string;
  categories: Array<GroupCategoryNode>;
};

declare type CardType = {
  uuid: string;
  primary: string;
  secondary: string;
  optional: string;
};

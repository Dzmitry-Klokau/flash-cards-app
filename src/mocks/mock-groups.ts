import { mockGameList } from "./mock-games";

export const mockGroupList: Array<GroupType> = [
  {
    title: "LT",
    desc: "Learning lithuanian language ",
    id: "HPvf34QdAyvpxHT6C2VO",
    categories: [],
  },
  {
    desc: "Learning english language ",
    title: "EN",
    id: "aT3r3QYTPSh0WIH3Hb9z",
    categories: [
      {
        name: "test 1",
        games: [],
      },
      {
        name: "test 2",
        games: [
          { id: mockGameList[0].id, title: mockGameList[0].title },
          { id: mockGameList[1].id, title: mockGameList[1].title },
        ],
      },
    ],
  },
];

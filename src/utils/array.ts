import { clone } from "lodash";

export const shuffleArray = (array: Array<any>) => {
  const res = clone(array);
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = res[i];
    res[i] = res[j];
    res[j] = temp;
  }

  return res;
};

import __authors from "./jsons/__users.json";

import { PostAuthorType } from "./types";

let as: string[] = [];

const DEMO_AUTHORS: PostAuthorType[] = __authors.map((item, index) => ({
  ...item,
  // avatar: as[index],
}));
// console.log(DEMO_AUTHORS);

export { DEMO_AUTHORS };

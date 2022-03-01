import __category from "./jsons/__category.json";
import __country from "./jsons/__country.json";

import { CategoryType, CountryType } from "./types";

const CATEGORIES: CategoryType[] = __category.map((item) => ({
    ...item,
  }));

const COUNTRIES: CountryType[] = __country.map((item) => ({
    ...item,
  }));

export { CATEGORIES,COUNTRIES };
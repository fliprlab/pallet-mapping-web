import { authApis } from "./auth.api";
import { createBagApis } from "./createBag.api";
import { locationApis } from "./location.api";
import { pickUpApis } from "./pickUp.api";
import { putAwayApis } from "./putAway.api";

export const apiUrls = {
  ...authApis,
  ...locationApis,
  ...putAwayApis,
  ...pickUpApis,
  ...createBagApis,
};

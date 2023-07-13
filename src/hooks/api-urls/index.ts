import { authApis } from "./auth.api";
import { createBagApis } from "./createBag.api";
import { locationApis } from "./location.api";
import { palletApis } from "./pallet-mapping.api";
import { pickUpApis } from "./pickUp.api";
import { putAwayApis } from "./putAway.api";
import { scanItemsApis } from "./scanItems.api";

export const apiUrls = {
  ...authApis,
  ...locationApis,
  ...putAwayApis,
  ...pickUpApis,
  ...createBagApis,
  ...palletApis,
  ...scanItemsApis,
};

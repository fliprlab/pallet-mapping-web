import { userApiPrefix } from "../../constants";

export const dispatchApi = {
  SCAN_PALLET_FOR_DISPATCH: userApiPrefix + "/dispatch/scan-pallet",
  SCAN_LOCATION_FOR_DISPATCH: userApiPrefix + "/dispatch/scan-location",
};

import { userApiPrefix } from "../../constants";

export const palletApis = {
  SCAN_LOCATION: userApiPrefix + "/pallet/scan-location",
  SCAN_PALLET: userApiPrefix + "/pallet/scan",
  VIEW_LOCATION_PALLET: userApiPrefix + "/location-pallets",
  GET_PALLET_ITEMS: userApiPrefix + "/pallets/items",
  REMOVE_PALLET_ITEM: userApiPrefix + "/pallets/remove-item",
  GET_DISPATCH_ITEMS: userApiPrefix + "/dispatch-items/get",
};

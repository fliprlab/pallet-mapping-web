import { ICONS } from "../icons";

export const naves = [
  {
    icon: ICONS.home,
    activeIcon: ICONS.home_active,
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    icon: ICONS.putAway,
    activeIcon: ICONS.putAway_active,
    label: "Put Away",
    to: "/put-away/select-location",
    matchPath: "put-away",
  },
  {
    icon: ICONS.picking,
    activeIcon: ICONS.picking_active,
    label: "Pallet Picking",
    to: "/picking/select-location",
    matchPath: "picking",
  },
];

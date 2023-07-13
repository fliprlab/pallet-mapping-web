import { create } from "zustand";

interface IStore {
  shipments: string[];
  addShipment: (e: string) => void;
  removeShipment: (e: string) => void;
  clearStore: () => void;
}

const getRemainItem = (shipments: string[], rmItem: string) => {
  let remainItem: string[] = [];

  shipments.forEach((item) => {
    if (item !== rmItem) {
      remainItem.push(item);
    }
  });
  return remainItem;
};

export const useShipmentsStore = create<IStore>((set) => ({
  shipments: [],
  addShipment: (e) =>
    set((state) => ({
      shipments: [...state.shipments, e],
    })),
  removeShipment: (e) => {
    set((state) => ({
      shipments: getRemainItem(state.shipments, e),
    }));
  },
  clearStore: () => {
    set({ shipments: [] });
  },
}));

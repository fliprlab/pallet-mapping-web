import { create } from "zustand";
import { IMAGES } from "../images";

interface IHeaderParams {
  lebel: string;
  icon: string;
  iconClick: () => void;
}

interface IStore {
  header: IHeaderParams;
  setHeader: (header: IHeaderParams) => void;
}

export const useHeaderStore = create<IStore>((set) => ({
  header: {
    lebel: "Pallet Mapping",
    icon: IMAGES.logOutIcon,
    iconClick: () => {},
  },
  setHeader: (header) => set({ header: header }),
}));

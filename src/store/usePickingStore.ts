import { create } from "zustand";

interface IStore {
  locations: string[];
  setLocations: (e: string[]) => void;
  clearLocations: () => void;
}

export const usePickingStore = create<IStore>((set) => ({
  locations: [],
  setLocations: (e) => set({ locations: e }),
  clearLocations: () => set({ locations: [] }),
}));

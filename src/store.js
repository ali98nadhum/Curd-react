import { create } from "zustand";

export const useStore = create((set) => ({
  loadData: [],
  deleteData: [],
  setloadData: (loadData) => set({ loadData }),
  setdeleteData: (deleteData) => set({ deleteData }),
}));
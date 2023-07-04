import { create } from "zustand";

export const useExpDateStore = create((set) => ({
  expDate: [],
  setExpDate: (expDate: string[]) => set({ expDate }),
}));

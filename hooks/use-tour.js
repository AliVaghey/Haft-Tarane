import { create } from "zustand";

export const useTour = create((set) => ({
  currentTour: false,
  setCurrentTour: (data) => set({ currentTour: data }),
}));

import { create } from "zustand";

export const useTour = create((set) => ({
  currentTour: { certificate: {} },
  isEditPage: false,
  setCurrentTour: (data) => set({ currentTour: data }),
  setIsEditPage: (status) => set({ isEditPage: status }),
}));

import { create } from "zustand";

export const useTourPassengers = create((set, get) => ({
  tour: [],
  setTour: (data) => set({ tour: data }),
  passengers: [],
  setPassengers: (data) => set({ passengers: data }),
}));

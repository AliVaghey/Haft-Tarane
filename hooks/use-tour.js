import { CSRFToken, axios } from "@/lib/axios";
import { create } from "zustand";

export const useTour = create((set, get) => ({
  airports: [],
  setAirports: (data) => set({ airports: data }),

  currentTour: { certificate: {}, dates: [], transportations: [] },
  setCurrentTour: (data) => set({ currentTour: data }),

  isEditPage: false,
  setIsEditPage: (status) => set({ isEditPage: status }),

  flag: false,
  setFlag: (status) => set({ flag: status }),

  getCurrentTour: async (id) => {
    await axios
      .get(`api/agency/tour/${id}`)
      .then((response) => {
        get().setCurrentTour(response.data.data);
        get().setIsEditPage(true);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        set({ flag: false });
      });
  },

  getAirports: async () => {
    await axios
      .get(`api/airports`)
      .then((response) => {
        get().setAirports(response.data.data);
      })
      .catch((error) => {
        console.log("error-airports", error);
      })
      .finally(() => {});
  },
}));

import { CSRFToken, axios } from "@/lib/axios";
import { create } from "zustand";

export const useTour = create((set, get) => ({
  currentTour: { certificate: {} },
  isEditPage: false,
  setCurrentTour: (data) => set({ currentTour: data }),
  setIsEditPage: (status) => set({ isEditPage: status }),
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
      .finally(() => {});
  },
}));

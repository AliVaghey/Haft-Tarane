import { CSRFToken, axios } from "@/lib/axios";
import { create } from "zustand";

export const useTour = create((set, get) => ({
  currentTour: { certificate: {}, dates: [], transportations: [] },
  isEditPage: false,
  flag: false,
  setCurrentTour: (data) => set({ currentTour: data }),
  setIsEditPage: (status) => set({ isEditPage: status }),
  setFlag: (status) => set({ flag: status }),
  getCurrentTour: async (id) => {
    await axios
      .get(`api/agency/tour/${id}`)
      .then((response) => {
        console.log("responsehookkkkkk", response);
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
}));

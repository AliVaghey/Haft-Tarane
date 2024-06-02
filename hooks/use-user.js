import { create } from "zustand";

export const useUser = create((set) => ({
  banners: [],
  setBanners: (data) => set({ banners: data }),
  specialTours: [],
  setSpecialTours: (data) => set({ specialTours: data }),
  userData: false,
  isLogin: false,
  setUserData: (data) => set({ userData: data, isLogin: true }),
}));

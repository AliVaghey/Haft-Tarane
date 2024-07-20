import { create } from "zustand";

export const useUser = create((set) => ({
  superadminDashboard: {},
  setSuperadminDashboard: (data) => set({ superadminDashboard: data }),
  adminDashboard: {},
  setAdminDashboard: (data) => set({ adminDashboard: data }),
  agencyDashboard: {},
  setAgencyDashboard: (data) => set({ agencyDashboard: data }),

  siteViews: [],
  setSiteViews: (data) => set({ siteViews: data }),
  banners: [],
  setBanners: (data) => set({ banners: data }),
  specialTours: [],
  setSpecialTours: (data) => set({ specialTours: data }),

  userData: false,
  isLogin: false,
  setUserData: (data) => set({ userData: data, isLogin: true }),
}));

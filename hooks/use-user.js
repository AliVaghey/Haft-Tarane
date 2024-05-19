import { create } from "zustand";

export const useUser = create((set) => ({
  userData: false,
  isLogin: false,
  setUserData: (data) => set({ userData: data, isLogin: true }),
}));

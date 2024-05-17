import { axios } from "@/lib/axios";
import { create } from "zustand";

export const useUser = create((set, get) => ({
  user: null,
  setUser: (data) => {
    set({ user: data });
  },
  getUserInfo: async () => {
    await axios
      .get("/api/user/info")
      .then((response) => {
        console.log("getUserInfores", response);
        get().getUserInfo(response.data);

        if (res.status === 200) {
          redirect("/");
        }
      })
      .catch((err) => {
        console.log("getUserInfoError", err);
      });
  },
}));

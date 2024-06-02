"use client";

import LoadingPage from "@/components/loading-page";
import { useUser } from "@/hooks/use-user";
import { axios } from "@/lib/axios";
import { routes } from "@/routes/routes";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const userHook = useUser();

  const router = useRouter();

  const pathname = usePathname();

  const getSpecialTours = async () => {
    axios
      .get("/api/specials")
      .then((response) => {
        console.log("getSpecials", response?.data?.data);

        if (response.status === 200) {
          userHook.setSpecialTours(response?.data?.data);
        }
      })
      .catch((err) => {
        console.log("getSpecialsError", err);
      })
      .finally(() => {});
  };

  const getBanners = async () => {
    axios
      .get("/api/banners")
      .then((response) => {
        console.log("getBanners", response?.data);

        if (response.status === 200) {
          userHook.setBanners(response?.data);
        }
      })
      .catch((err) => {
        console.log("getBannersError", err);
      })
      .finally(() => {});
  };

  const userInfo = async () => {
    setIsLoading(true);

    await axios
      .get("/api/user/info")
      .then((response) => {
        console.log("getUserInfores", response?.data?.data);

        if (response.status === 200) {
          userHook.setUserData(response?.data?.data);

          if (pathname.endsWith(routes.auth.signIn)) {
            response.data.data.access_type === "superadmin" &&
              router.push(routes.superadmin.dashboard);
            response.data.data.access_type === "admin" &&
              router.push(routes.admin.dashboard);
            response.data.data.access_type === "agency" &&
              router.push(routes.agency.dashboard);
            response.data.data.access_type === "user" && router.push("/");
          }
        }
      })
      .catch((err) => {
        console.log("getUserInfoError", err);
        userHook.setUserData(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    userInfo();
    getBanners();
    getSpecialTours();
  }, []);

  return isLoading ? <LoadingPage /> : <main>{children}</main>;
};

export default AuthProvider;

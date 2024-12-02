"use client";

import LoadingPage from "@/components/loading-page";
import { useUser } from "@/hooks/use-user";
import { axios } from "@/lib/axios";
import { routes } from "@/routes/routes";
import Lottie from "lottie-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import groovyWalkAnimation from "@/animations/loading.json";

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const userHook = useUser();

  const router = useRouter();

  const pathname = usePathname();

  const getSpecialTours = async () => {
    axios
      .get("/api/specials")
      .then((response) => {
        if (response.status === 200) {
          userHook.setSpecialTours(response?.data?.data);
        }
      })
      .catch((err) => {})
      .finally(() => {});
  };

  const getBanners = async () => {
    axios
      .get("/api/banners")
      .then((response) => {
        if (response.status === 200) {
          userHook.setBanners(response?.data);
        }
      })
      .catch((err) => {})
      .finally(() => {});
  };

  const getSliderCards = async () => {
    axios
      .get("/api/slider-cards")
      .then((response) => {
        if (response.status === 200) {
          userHook.setSliderCards(response?.data?.data);
        }
      })
      .catch((err) => {})
      .finally(() => {});
  };

  const userInfo = async () => {
    await axios
      .get("/api/user/info")
      .then((response) => {
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
        userHook.setUserData(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getSiteViews = async () => {
    axios
      .get("/api/visits")
      .then((response) => {
        if (response.status === 200) {
          userHook.setSiteViews(response?.data);
        }
      })
      .catch((err) => {})
      .finally(() => {});
  };

  const increaseSiteViews = async () => {
    axios
      .post("/api/visit")
      .then((response) => {})
      .catch((err) => {})
      .finally(() => {});
  };

  useEffect(() => {
    getSliderCards();
    getBanners();
    getSpecialTours();
    getSiteViews();
    increaseSiteViews();
    userInfo();
  }, []);

  return isLoading ? (
    <div className="h-screen flex items-center justify-center">
      <Lottie
        animationData={groovyWalkAnimation}
        loop={true}
        className="h-[80px] w-full"
      />
    </div>
  ) : (
    <main>{children}</main>
  );
};

export default AuthProvider;

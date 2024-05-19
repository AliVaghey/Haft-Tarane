"use client";

import LoadingPage from "@/components/loading-page";
import { useUser } from "@/hooks/use-user";
import { axios } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const userHook = useUser();

  const router = useRouter();

  const userInfo = async () => {
    setIsLoading(true);

    await axios
      .get("/api/user/info")
      .then((response) => {
        console.log("getUserInfores", response?.data?.data);

        if (response.status === 200) {
          userHook.setUserData(response?.data?.data);
          // router.push("/");
        }
      })
      .catch((err) => {
        console.log("getUserInfoError", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // useEffect(() => {
  //   userInfo();
  // }, []);

  return isLoading ? <LoadingPage /> : <main>{children}</main>;
};

export default AuthProvider;

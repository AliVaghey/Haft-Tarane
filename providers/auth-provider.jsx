"use client";

import LoadingPage from "@/components/loading-page";
import { axios } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const userInfo = async () => {
    setIsLoading(true);

    await axios
      .get("/api/user/info")
      .then((response) => {
        console.log("getUserInfores", response);

        if (response.status === 200) {
          router.push("/");
        }
      })
      .catch((err) => {
        console.log("getUserInfoError", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    userInfo();
  }, []);

  return isLoading ? <LoadingPage /> : <main>{children}</main>;
};

export default AuthProvider;

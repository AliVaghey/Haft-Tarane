"use client";

import { useEffect, useState } from "react";
import Header from "./header/header";
import SideBar from "./sidebar/sidebar";
import { axios } from "@/lib/axios";
import { useUser } from "@/hooks/use-user";
import LoadingPage from "@/components/loading-page";
import { useRouter } from "next/navigation";
import { routes } from "@/routes/routes";

const UserLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const userHook = useUser();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setIsLoading(true);

    await axios
      .get("/api/user/info")
      .then((response) => {
        if (response.status === 200) {
          userHook.setUserData(response?.data?.data);
          if (response?.data?.data?.access_type === "user") {
            setIsUser(true);
          }
        }
      })
      .catch((err) => {
        console.log("getUserInfoError", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!isUser && !isLoading) {
    router.push(routes.auth.signIn);
  }

  if (!isUser && !isLoading) {
    return null;
  }

  return isLoading ? (
    <div className="flex h-screen items-center justify-center">
      <LoadingPage />
    </div>
  ) : (
    <div className="flex min-h-screen w-full flex-row">
      <SideBar />
      <div className="flex w-full flex-col lg:w-5/6">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-2 lg:gap-6 lg:p-3">
          <div className="min-h-full rounded-lg p-3 py-5 shadow-lg">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;

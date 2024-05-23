"use client";

import { useEffect, useState } from "react";
import Header from "./header/header";
import SideBar from "./sidebar/sidebar";
import { axios } from "@/lib/axios";
import { useUser } from "@/hooks/use-user";
import LoadingPage from "@/components/loading-page";
import { useRouter } from "next/navigation";
import { routes } from "@/routes/routes";

const AgencyLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAgency, setIsAgency] = useState(false);
  const userHook = useUser();
  const router = useRouter();

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    setIsLoading(true);

    await axios
      .get("/api/user/info")
      .then((response) => {
        if (response.status === 200) {
          userHook.setUserData(response?.data?.data);
          if (response?.data?.data?.access_type === "agency") {
            setIsAgency(true);
          }
        }
      })
      .catch((err) => {
        console.log("getAgencyInfoError", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!isAgency && !isLoading) {
    router.push(routes.auth.signIn);
  }

  if (!isAgency && !isLoading) {
    return null;
  }

  return isLoading ? (
    <div className="flex h-screen items-center justify-center">
      <LoadingPage />
    </div>
  ) : (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar />
      <div className="flex flex-col">
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

export default AgencyLayout;

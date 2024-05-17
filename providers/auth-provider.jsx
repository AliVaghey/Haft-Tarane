"use client";

import { useUser } from "@/actions/use-user";
import LoadingPage from "@/components/loading-page";
import { axios } from "@/lib/axios";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const user = useUser();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userInfo();
  }, []);

  const userInfo = async () => {
    await user.getUserInfo();
    setIsLoading(false);
  };

  return isLoading ? <LoadingPage /> : <main>{children}</main>;
};

export default AuthProvider;

"use client";

import ToastError from "@/components/toast/toast-error";
import LoadingPage from "@/components/loading-page";
import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";
import { toast } from "sonner";
import EditForm from "./components/edit-form";

const EditCityPage = ({ params }) => {
  const [data, setData] = useState({
    first_name_fa: "",
    last_name_fa: "",
    gender: "",
    email: "",
    phone: "",
    national_code: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const fetchDefaultData = async () => {
    setIsLoading(true);
    await axios
      .get("/api/user/info")
      .then((response) => {
        console.log("response", response);
        setData(response.data.data);
      })
      .catch((error) => {
        toast.error(
          <ToastError
            text={
              error?.response?.data?.message ||
              defaultMessages.errors.internalError
            }
          />,
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return <div>{isLoading ? <LoadingPage /> : <EditForm data={data} />}</div>;
};

export default EditCityPage;

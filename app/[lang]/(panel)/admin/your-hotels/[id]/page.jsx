"use client";

import ToastError from "@/components/toast/toast-error";
import LoadingPage from "@/components/loading-page";
import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";
import { toast } from "sonner";
import Details from "../components/details";

const EditCityPage = ({ params }) => {
  const [data, setData] = useState({
    gallery: ["a"],
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const fetchDefaultData = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/admin/hotel/${params.id}`)
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

  return (
    <div className="h-full">
      {isLoading ? <LoadingPage /> : <Details data={data} />}
    </div>
  );
};

export default EditCityPage;

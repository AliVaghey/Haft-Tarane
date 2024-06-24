"use client";

import ToastError from "@/components/toast/toast-error";
import LoadingPage from "@/components/loading-page";
import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";
import { toast } from "sonner";
import PassengersInfo from "@/components/booking-tour/passengers-info";

const EditCityPage = ({ params }) => {
  const [data, setData] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const fetchDefaultData = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/user/reservation/${params.id}`)
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
      {isLoading && !data.passengers ? (
        <LoadingPage />
      ) : (
        <PassengersInfo defaultData={data} />
      )}
    </div>
  );
};

export default EditCityPage;

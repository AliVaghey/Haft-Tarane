"use client";

import ToastError from "@/components/toast/toast-error";
import LoadingPage from "@/components/loading-page";
import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";
import { toast } from "sonner";
import PassengersInfo from "@/components/booking-tour/passengers-info";

const EditCityPage = ({ params }) => {
  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDefaultData();
  }, []);
  console.log("first");
  const fetchDefaultData = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/agency/reservation/${params.id}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
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
      {isLoading ? (
        <LoadingPage />
      ) : (
        data !== null && <PassengersInfo defaultData={data} />
      )}
    </div>
  );
};

export default EditCityPage;

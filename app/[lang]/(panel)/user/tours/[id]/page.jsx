"use client";

import ToastError from "@/components/toast/toast-error";
import LoadingPage from "@/components/loading-page";
import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";
import { toast } from "sonner";
import UserBookInfo from "@/components/booking-tour/user-book-info";

const EditCityPage = ({ params }) => {
  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const fetchDefaultData = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/user/reservation/${params.id}`)
      .then((response) => {
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
      {isLoading ? (
        <LoadingPage />
      ) : (
        data !== null && <UserBookInfo defaultData={data} />
      )}
    </div>
  );
};

export default EditCityPage;

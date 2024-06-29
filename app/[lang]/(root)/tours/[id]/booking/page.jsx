"use client";

import ToastError from "@/components/toast/toast-error";
import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";
import LoadingPage from "@/components/loading-page";
import { toast } from "sonner";
import SecondDetails from "@/components/booking-tour/second-details";

const TourDetailsPage = ({ searchParams }) => {
  const { cid, start, end } = searchParams;

  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const fetchDefaultData = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/cost/${cid || ""}?start=${start || ""}`)
      .then((response) => {
        console.log("responseqqqqqqqqqqqqq", response);
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
    <div className="relative min-h-[80vh] bg-primary pt-24">
      <div className="px-2 pb-5 md:px-28 lg:px-48 xl:px-60">
        {isLoading && <LoadingPage />}
        {data !== null && <SecondDetails data={data} />}
      </div>
    </div>
  );
};

export default TourDetailsPage;

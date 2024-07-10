"use client";

import ToastError from "@/components/toast/toast-error";
import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";
import LoadingPage from "@/components/loading-page";
import FirstCost from "@/components/booking-tour/first-cost";
import { toast } from "sonner";
import TourCard from "@/components/pages/tour-card";
import SpecialTourCard from "@/components/pages/special-tour-card";

const TourDetailsPage = ({ searchParams, params }) => {
  const { start } = searchParams;

  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDefaultData();
  }, [start]);

  const fetchDefaultData = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/special/${params.id}?start=${start || ""}`)
      .then((response) => {
        console.log("responseqqfffffffffffffff", response);
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

  console.log("cccccccccccccccc", data);
  return (
    <div className="relative min-h-[80vh] bg-yellow-primary pt-24">
      <div className="px-2 pb-5 md:px-28 lg:px-48 xl:px-60">
        <div className="mx-auto flex w-full flex-col gap-3">
          {isLoading ? (
            <LoadingPage />
          ) : (
            data.map((item, index) => (
              <>
                <SpecialTourCard data={item} key={index} />
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TourDetailsPage;

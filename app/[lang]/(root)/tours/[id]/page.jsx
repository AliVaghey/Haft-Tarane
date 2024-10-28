"use client";

import ToastError from "@/components/toast/toast-error";
import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";
import LoadingPage from "@/components/loading-page";
import FirstCost from "@/components/booking-tour/first-cost";
import { toast } from "sonner";

const TourDetailsPage = ({ searchParams }) => {
  const { cid, start, end } = searchParams;

  const [data, setData] = useState(null);
  const [similarData, setSimilarData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [similarIsLoading, setSimilarIsLoading] = useState(false);

  useEffect(() => {
    fetchDefaultData();
    fetchSimilarData();
  }, [cid, start]);

  const fetchDefaultData = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/cost/${cid || ""}?start=${start || ""}`)
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

  const fetchSimilarData = async () => {
    setSimilarIsLoading(true);
    await axios
      .get(`/api/similar-dates?cost_id=${cid}`)
      .then((response) => {
        setSimilarData(response.data.data);
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
        setSimilarIsLoading(false);
      });
  };

  return (
    <div className="relative min-h-[80vh] bg-primary pt-24">
      <div className="px-2 pb-5 md:px-28 lg:px-48 xl:px-60">
        {(isLoading || similarIsLoading) && <LoadingPage />}
        {data !== null && similarData !== null && (
          <FirstCost data={data} similarData={similarData} />
        )}
      </div>
    </div>
  );
};

export default TourDetailsPage;

"use client";

import LoadingPage from "@/components/loading-page";
import CreateTourLayout from "@/components/tours/create-tour-layout";
import { useTour } from "@/hooks/use-tour";
import { axios } from "@/lib/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditTour = ({ children }) => {
  const params = useParams();

  const tourHook = useTour();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    return () => {};
  }, [tourHook.flag]);

  const fetchData = async () => {
    setLoading(true);
    await axios
      .get(`api/agency/tour/${params.id}`)
      .then((response) => {
        tourHook.setCurrentTour(response.data.data);
        tourHook.setIsEditPage(true);
      })
      .catch((error) => {
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <CreateTourLayout>{loading ? <LoadingPage /> : children}</CreateTourLayout>
  );
};

export default EditTour;

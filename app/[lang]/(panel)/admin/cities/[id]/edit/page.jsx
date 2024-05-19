"use client";

import ToastError from "@/components/toast/toast-error";
import EditForm from "../../components/edit-form";
import LoadingPage from "@/components/loading-page";
import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";

const EditCityPage = ({ params }) => {
  const [city, setCity] = useState({
    id: "",
    name: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const fetchDefaultData = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/admin/city/${params.id}`)
      .then((response) => {
        console.log("response", response);
        setCity(response.data);
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

  return <div>{isLoading ? <LoadingPage /> : <EditForm data={city} />}</div>;
};

export default EditCityPage;

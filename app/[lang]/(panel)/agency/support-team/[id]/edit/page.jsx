"use client";

import ToastError from "@/components/toast/toast-error";
import EditForm from "../../components/edit-form";
import LoadingPage from "@/components/loading-page";
import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";
import { toast } from "sonner";

const EditPage = ({ params }) => {
  const [data, setData] = useState({
    id: "",
    name: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const fetchDefaultData = async () => {
    setIsLoading(true);
    await axios
      .get(`/api/agency/support/${params.id}`)
      .then((response) => {
        console.log("response", response);
        setData(response.data);
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

export default EditPage;
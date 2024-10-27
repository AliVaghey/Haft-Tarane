"use client";

import Link from "next/link";
import { useState } from "react";
import ToastError from "@/components/toast/toast-error";
import ToastSuccess from "@/components/toast/toast-success";
import { toast } from "sonner";
import { useTour } from "@/hooks/use-tour";
import { defaultMessages } from "@/lib/default-messages";
import { Loader, Trash2 } from "lucide-react";
import { axios } from "@/lib/axios";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/use-user";

const PassengersFiles = ({ data: defaultData }) => {
  const userHook = useUser();
  const tourHook = useTour();

  const [data, setData] = useState(defaultData.files);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (key) => {
    setIsLoading(true);

    

    await axios
      .delete(`api/agency/reservation/${defaultData.id}/files?name=${key}`)
      .then((response) => {
        toast.success(<ToastSuccess text="فایل مورد نظر با موفقیت حذف شد" />);
        tourHook.setFlag(!tourHook.flag);

        let newData = data;
        delete newData[key];
        setData(newData);
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
    <div>
      <h1 className="font-semibold">مدارک</h1>
      <div className="flex flex-col gap-2 text-muted-foreground">
        {data &&
          Object.keys(data).map((keyName, i) => (
            <div key={i} className="flex items-center gap-2">
              <span>{keyName} : </span>
              <Link
                href={data[keyName]}
                download
                target="_blank"
                className="w-fit border-b border-b-transparent text-blue-500 hover:border-b-blue-500"
              >
                دانلود فایل
              </Link>
              {userHook.userData.access_type === "agency" && (
                <Button
                  disabled={isLoading}
                  variant="ghost"
                  className="h-8 w-fit px-1 text-red-primary hover:bg-primary hover:text-red-dark"
                  onClick={() => handleDelete(keyName)}
                >
                  {isLoading ? (
                    <Loader
                      className="animate-spin"
                      size={18}
                      strokeWidth={1.5}
                    />
                  ) : (
                    <Trash2 size={18} strokeWidth={1.5} />
                  )}
                </Button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PassengersFiles;

"use client";


import { axios } from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import querystring from "querystring";
import ToastError from "@/components/toast/toast-error";
import ToastSuccess from "@/components/toast/toast-success";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Edit } from "lucide-react";
import { routes } from "@/routes/routes";
import { useUser } from "@/hooks/use-user";

const statuses = [
  {
    title: "فعال",
  },
  {
    title: "منقضی",
  },
];

const DateStatus = ({ date }) => {
  const userHook = useUser();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(
    date.expired === true ? "منقضی" : "فعال",
  );

  const changeStatus = async (s) => {
    setLoading(true);

    const newStatus = s === "منقضی" ? true : false;

    

    // const encodedFormData = querystring.stringify({
    //   expire: newStatus,
    // });

    await axios
      .post(
        `/api/agency/date/${date.id}/expiration?expire=${newStatus}`,
        // encodedFormData,
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            <ToastSuccess text={"وضعیت تور با موفقیت تغییر کرد"} />,
          );
          setStatus(s);
        }
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
        setLoading(false);
      });
  };
  //
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          disabled={userHook.userData.access_type !== "agency"}
        >
          <Button
            disabled={loading}
            variant="ghost"
            className="flex h-8 gap-1 rounded-3xl border-2 border-primary"
          >
            {loading ? (
              <LoaderIcon
                className="animate-spin text-primary"
                size={18}
                strokeWidth={2}
              />
            ) : (
              <>
                {status}
                <ChevronDown
                  size={18}
                  className="text-primary"
                  strokeWidth={3}
                />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-1">
          {statuses.map((item, index) => (
            <DropdownMenuItem
              onClick={() => {
                changeStatus(item.title);
              }}
              key={item.title}
              className={cn(
                "cursor-pointer rounded-3xl",

                status === item.title && "bg-yellow-light",
              )}
            >
              {item.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DateStatus;

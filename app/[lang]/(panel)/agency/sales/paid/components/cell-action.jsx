"use client";

import DeleteModal from "@/components/helpers/delete-dialog";
import { CSRFToken } from "@/lib/axios";
import { routes } from "@/routes/routes";
import { axios } from "@/lib/axios";
import { ChevronDown, LoaderIcon, Trash2 } from "lucide-react";
import { Edit, CircleCheckBig, CircleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import ToastSuccess from "@/components/toast/toast-success";
import ToastError from "@/components/toast/toast-error";
import querystring from "querystring";
import AddPassengerFile from "@/components/helpers/add-passenger-file";

const accessTypes = [
  {
    title: "پرداخت شده",
  },
  {
    title: "در انتظار پرداخت",
  },
];

const CellAction = ({ data }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState(
    data.status === "pending" ? "در انتظار پرداخت" : "پرداخت شده",
  );

  const changeAccess = async (newStatus) => {
    setLoading(true);

    const newAccessName = newStatus === "در انتظار پرداخت" ? "pending" : "paid";

    await CSRFToken();

    const encodedFormData = querystring.stringify({
      status: newAccessName,
    });

    await axios
      .post(`/api/agency/reservation/${data.id}/change-status`, encodedFormData)
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          toast.success(
            <ToastSuccess text={"وضعیت پرداخت با موفقیت تغییر کرد"} />,
          );
          setStatus(newStatus);
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

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Link href={routes.agency.sales.paid.details(data.id)}>
          <Button className="h-8 text-xs">مشاهده جزئیات</Button>
        </Link>

        <AddPassengerFile data={data} />

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              disabled={loading}
              variant="ghost"
              className="flex h-8 gap-2 rounded-lg border-2 border-primary"
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
            {accessTypes.map((item, index) => (
              <DropdownMenuItem
                onClick={() => {
                  changeAccess(item.title);
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
        </DropdownMenu> */}
      </div>
    </div>
  );
};

export default CellAction;

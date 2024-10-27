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

const accessTypes = [
  {
    title: "ادمین",
  },
  {
    title: "آژانس",
  },
  {
    title: "کاربر",
  },
];

const CellAction = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(
    data.access_type === "admin"
      ? "ادمین"
      : data.access_type === "agency"
        ? "آژانس"
        : "کاربر",
  );

  const changeAccess = async (accessName) => {
    setLoading(true);

    const newAccessName =
      accessName === "ادمین"
        ? "admin"
        : accessName === "آژانس"
          ? "agency"
          : "user";

    

    const encodedFormData = querystring.stringify({
      access_type: newAccessName,
    });

    await axios
      .patch(`/api/admin/user/${data.id}/access`, encodedFormData)
      .then((response) => {
        if (response.status === 204) {
          toast.success(<ToastSuccess text={"دسترسی با موفقیت تغییر کرد"} />);
          setRole(accessName);
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
    <div className="flex items-center justify-center gap-1">
      <Link href={routes.superadmin.admins.details(data.id)}>
        <div className="cursor-pointer rounded-md p-1 transition-all duration-200 hover:bg-muted">
          <Eye size={18} strokeWidth={1.5} className="text-primary" />
        </div>
      </Link>

      <Link href={routes.superadmin.admins.edit(data.id)}>
        <div className="cursor-pointer rounded-md p-1 transition-all duration-200 hover:bg-muted">
          <Edit size={18} strokeWidth={1.5} className="text-primary" />
        </div>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={loading}
            variant="ghost"
            className="flex gap-3 rounded-3xl border-2 border-primary"
          >
            {loading ? (
              <LoaderIcon
                className="animate-spin text-primary"
                size={18}
                strokeWidth={2}
              />
            ) : (
              <>
                {role}
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

                role === item.title && "bg-yellow-light",
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

export default CellAction;

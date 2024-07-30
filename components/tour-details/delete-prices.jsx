"use client";

import DeleteModal from "@/components/helpers/delete-dialog";
import { CSRFToken } from "@/lib/axios";
import { routes } from "@/routes/routes";
import { axios } from "@/lib/axios";
import { Trash2 } from "lucide-react";
import { CircleCheckBig, CircleAlert } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useTour } from "@/hooks/use-tour";
import { Button } from "../ui/button";

const DeletePrices = ({ data }) => {
  const tourHook = useTour();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);

      await CSRFToken();

      const response = await axios.delete(
        `api/agency/tour/${data.id}/price-change/all`,
      );

      if (response.status === 204) {
        toast.success(
          <div className="flex items-center gap-2">
            <span>
              <CircleCheckBig className="text-green-600" />
            </span>
            <span>{"تمامی تغییر نرخ ها با موفقیت حذف شدند"}</span>
          </div>,
        );
        tourHook.setFlag(!tourHook.flag);
      }
      if (response.status === 200) {
        toast.error(
          <div className="flex items-center gap-2">
            <span>
              <CircleAlert className="text-primary" />
            </span>
            <span>{response.message}</span>
          </div>,
        );
      }
    } catch (error) {
      toast.error("مشکلی پیش آمده است. لطفا مجددا تلاش فرمایید");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <DeleteModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <div className="flex items-center">
        <Button
          onClick={() => setOpen(true)}
          className="h-7 bg-red-primary px-2 text-xs text-white hover:bg-red-dark"
          disabled={data.price_changes && data.price_changes.length === 0}
        >
          <div className="flex items-center gap-1">
            <Trash2 size={16} strokeWidth={1.5} />
            <span>حذف تمامی تغییر نرخ ها</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default DeletePrices;

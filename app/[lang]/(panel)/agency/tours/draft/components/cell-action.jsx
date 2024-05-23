"use client";

import { routes } from "@/routes/routes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeleteModal from "@/components/helpers/delete-dialog";
import { CircleCheckBig } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CSRFToken, axios } from "@/lib/axios";

const CellAction = ({ data }) => {
  const searchParams = useSearchParams();

  const { page } = searchParams;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);

      await CSRFToken();

      const response = await axios.delete(`/api/agency/tour/${data.id}`);

      if (response.status === 204) {
        router.refresh();
        toast.success(
          <div className="flex items-center gap-2">
            <span>
              <CircleCheckBig className="text-green-600" />
            </span>
            <span>{"تور انتخاب شده حذف شد"}</span>
          </div>,
        );
      }
    } catch (error) {
      console.log("error", error);
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
      <div className="flex items-center gap-2">
        <Link href={routes.agency.tours.details(data.id)}>
          <Button
            variant="ghost"
            className="h-8 rounded-3xl border border-green-500 text-green-500"
          >
            جزئیات
          </Button>
        </Link>

        <Link href={routes.agency.tours.edit["basic-information"](data.id)}>
          <Button
            variant="ghost"
            className="h-8 rounded-3xl border border-blue-500 text-blue-500"
          >
            ویرایش
          </Button>
        </Link>

        <Button
          variant="ghost"
          className="h-8 rounded-3xl border border-red-500 text-red-500"
          onClick={() => setOpen(true)}
        >
          حذف
        </Button>
      </div>
    </div>
  );
};

export default CellAction;

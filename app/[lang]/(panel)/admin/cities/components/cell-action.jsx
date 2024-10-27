"use client";

import DeleteModal from "@/components/helpers/delete-dialog";
import { CSRFToken } from "@/lib/axios";
import { routes } from "@/routes/routes";
import { axios } from "@/lib/axios";
import { Trash2 } from "lucide-react";
import { Edit, CircleCheckBig, CircleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const CellAction = ({ data }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);

      await CSRFToken();

      const response = await axios.delete(`/api/admin/city/${data.id}`);

      if (response.status === 204) {
        router.refresh();
        toast.success(
          <div className="flex items-center gap-2">
            <span>
              <CircleCheckBig className="text-green-600" />
            </span>
            <span>{"شهر مورد نظر حذف شد"}</span>
          </div>,
        );
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
        <Link href={routes.admin.cities.edit(data.id)}>
          <div className="w-12 rounded-2xl border-2 border-l-0 py-2 pr-2">
            <Edit size={14} strokeWidth={1.5} className="text-black" />
          </div>
        </Link>

        <div
          className="flex translate-x-5 cursor-pointer items-center justify-center rounded-full bg-primary p-2.5"
          onClick={() => setOpen(true)}
        >
          <Trash2 size={16} strokeWidth={2} className="text-red-primary" />
        </div>
      </div>
    </div>
  );
};

export default CellAction;

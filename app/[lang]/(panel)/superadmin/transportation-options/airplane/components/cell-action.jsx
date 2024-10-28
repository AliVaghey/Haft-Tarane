"use client";

import DeleteModal from "@/components/helpers/delete-dialog";
import { useTour } from "@/hooks/use-tour";

import { axios } from "@/lib/axios";
import { Trash2 } from "lucide-react";
import { CircleCheckBig, CircleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const CellAction = ({ data }) => {
  const router = useRouter();

  const tourHook = useTour();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);

      

      const response = await axios.delete(`/api/admin/option/${data.id}`);

      if (response.status === 204) {
        tourHook.setFlag(!tourHook.flag);

        router.refresh();
        toast.success(
          <div className="flex items-center gap-2">
            <span>
              <CircleCheckBig className="text-green-600" />
            </span>
            <span>{"آیتم مورد نظر حذف شد"}</span>
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

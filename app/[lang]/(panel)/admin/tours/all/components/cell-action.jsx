"use client";

import { CSRFToken } from "@/lib/axios";
import { routes } from "@/routes/routes";
import { axios } from "@/lib/axios";
import { CircleCheckBig, CircleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import RejectModal from "@/components/helpers/reject-dialog";
import querystring from "querystring";
import ConfirmTourModal from "@/components/helpers/confirm-tour-dialog";

const CellAction = ({ data }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const onReject = async (message) => {
    console.log("message", message);
    try {
      setLoading(true);

      const encodedFormData = querystring.stringify({
        message,
      });

      await CSRFToken();

      const response = await axios.post(
        `/api/admin/tour/${data.id}/reject`,
        encodedFormData,
      );

      if (response.status === 204) {
        console.log("first");
        router.refresh();
        toast.success(
          <div className="flex items-center gap-2">
            <span>
              <CircleCheckBig className="text-green-600" />
            </span>
            <span>{"تور مورد نظر رد شد"}</span>
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

  const onConfirm = async () => {
    try {
      setLoading(true);

      await CSRFToken();

      const response = await axios.post(`/api/admin/tour/${data.id}/approve`);

      if (response.status === 204) {
        console.log("first");
        router.refresh();
        toast.success(
          <div className="flex items-center gap-2">
            <span>
              <CircleCheckBig className="text-green-600" />
            </span>
            <span>{"تور مورد نظر تایید شد"}</span>
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
      setOpen2(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <RejectModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onReject}
      />
      <ConfirmTourModal
        isOpen={open2}
        loading={loading}
        onClose={() => setOpen2(false)}
        onConfirm={onConfirm}
      />
      <div className="flex items-center gap-2">
        <Link href={routes.admin.tours.details(data.id)}>
          <Button
            variant="ghost"
            className="h-8 rounded-3xl bg-yellow-light hover:bg-yellow-dark"
          >
            جزئیات
          </Button>
        </Link>

        {/* <Button
          variant="ghost"
          className="h-8 rounded-3xl border border-red-primary text-red-primary"
          onClick={() => setOpen(true)}
        >
          رد کردن
        </Button> */}

        {/* <Button
          variant="ghost"
          className="h-8 rounded-3xl border border-green-500 text-green-500"
          onClick={() => setOpen2(true)}
        >
          تایید کردن
        </Button> */}
      </div>
    </div>
  );
};

export default CellAction;

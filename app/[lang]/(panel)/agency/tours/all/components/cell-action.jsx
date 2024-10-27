"use client";

import { routes } from "@/routes/routes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/submit-button";
import { useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { axios } from "@/lib/axios";
import { toast } from "sonner";
import { useTour } from "@/hooks/use-tour";

const CellAction = ({ data }) => {
  const tourHook = useTour();

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const onCopy = async () => {
    try {
      setLoading(true);

      

      const response = await axios.post(`/api/agency/tour/${data.id}/copy`);


      if (response.status === 201) {
        toast.success(
          <div className="flex items-center gap-2">
            <span>
              <CircleCheckBig className="text-green-600" />
            </span>
            <span>{"تور با موفقیت کپی شد"}</span>
          </div>,
        );
      }
    } catch (error) {
      toast.error("مشکلی پیش آمده است. لطفا مجددا تلاش فرمایید");
    } finally {
      setLoading(false);
    }
  };

  const onDraft = async () => {
    try {
      setLoading2(true);

      

      const response = await axios.put(`/api/agency/tour/${data.id}/draft`);


      if (response.status === 204) {
        toast.success(
          <div className="flex items-center gap-2">
            <span>
              <CircleCheckBig className="text-green-600" />
            </span>
            <span>{"تور به حالت پیش نویس تغییر یافت"}</span>
          </div>,
        );

        tourHook.setFlag(!tourHook.flag);
      }
    } catch (error) {
      toast.error("مشکلی پیش آمده است. لطفا مجددا تلاش فرمایید");
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Link href={routes.agency.tours.details(data.id)}>
          <Button
            variant="ghost"
            className="h-7 rounded-3xl border border-red-dark text-xs text-red-dark"
          >
            جزئیات تور
          </Button>
        </Link>

        <SubmitButton
          variant="ghost"
          className="h-7 rounded-3xl border border-green-500 text-xs text-green-500"
          loading={loading}
          onClick={onCopy}
        >
          کپی تور
        </SubmitButton>

        <SubmitButton
          variant="ghost"
          className="h-7 rounded-3xl border border-blue-500 text-xs text-blue-500"
          loading={loading2}
          onClick={onDraft}
        >
          پیش نویس
        </SubmitButton>
      </div>
    </div>
  );
};

export default CellAction;

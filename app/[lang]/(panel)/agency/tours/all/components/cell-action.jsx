"use client";

import { routes } from "@/routes/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/submit-button";
import { useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { CSRFToken, axios } from "@/lib/axios";
import { toast } from "sonner";

const CellAction = ({ data }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onCopy = async () => {
    try {
      setLoading(true);

      await CSRFToken();

      const response = await axios.post(`api/agency/tour/${data.id}/copy`);

      console.log("response", response.status);

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
      console.log("error", error);
      toast.error("مشکلی پیش آمده است. لطفا مجددا تلاش فرمایید");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Link href={routes.agency.tours.details(data.id)}>
          <Button
            variant="ghost"
            className="h-8 rounded-3xl border border-red-dark text-red-dark"
          >
            جزئیات تور
          </Button>
        </Link>

        <SubmitButton
          variant="ghost"
          className="h-8 rounded-3xl border border-blue-500 text-blue-500"
          loading={loading}
          onClick={onCopy}
        >
          کپی تور
        </SubmitButton>
      </div>
    </div>
  );
};

export default CellAction;

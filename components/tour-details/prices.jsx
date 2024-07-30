"use client";

import useMount from "@/hooks/use-mount";
import { useRouter } from "next/navigation";
import { CircleAlert, CircleCheckBig, Trash2 } from "lucide-react";
import SubmitButton from "@/components/submit-button";
import { toast } from "sonner";
import { CSRFToken, axios } from "@/lib/axios";
import { useDictionary } from "@/providers/dictionary-provider";
import { useTour } from "@/hooks/use-tour";
import { useUser } from "@/hooks/use-user";
import { useState } from "react";
import { farsiNumber } from "@/lib/farsi-number";
import { jaliliDate } from "@/lib/jalali-date";
import AddPrice from "./add-price";
import EditPrice from "./edit-price";
import DeletePrices from "./delete-prices";

const DetailsPrice = ({ data }) => {
  const dictionary = useDictionary();

  const [loading, setLoading] = useState(false);

  const userHook = useUser();

  const tourHook = useTour();

  const mount = useMount();

  const router = useRouter();

  const onDelete = async (id) => {
    try {
      setLoading(true);

      await CSRFToken();

      const response = await axios.delete(`/api/agency/price-change/${id}`);

      console.log("responsewwwwwwwww", response);

      if (response.status === 204) {
        console.log("first");
        router.refresh();
        toast.success(
          <div className="flex items-center gap-2">
            <span>
              <CircleCheckBig className="text-green-600" />
            </span>
            <span>{"نرخ مورد نظر حذف شد"}</span>
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
      console.log("error", error);
      toast.error("مشکلی پیش آمده است. لطفا مجددا تلاش فرمایید");
    } finally {
      setLoading(false);
    }
  };

  if (!mount) {
    return null;
  }

  return (
    <div className="mb-5 flex min-h-96 flex-col gap-5 rounded-lg bg-white p-3 lg:gap-2">
      <div className="flex flex-col gap-2">
        {data.price_changes.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-5">
              <span>هتل : {item.hotel_name}</span>
              <span>
                تاریخ : از {farsiNumber(jaliliDate(item.start))} تا
                {"  "}
                {farsiNumber(jaliliDate(item.end))}
              </span>
            </div>

            <div className="flex gap-2">
              <SubmitButton
                disabled={userHook.userData.access_type !== "agency"}
                loading={loading}
                variant="ghost"
                className="h-7 w-fit cursor-pointer px-3 text-red-primary hover:text-red-primary"
                onClick={() => onDelete(item.id)}
              >
                <Trash2 size={16} strokeWidth={2} />
              </SubmitButton>
              <EditPrice data={item} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <AddPrice data={data} />
        <DeletePrices data={data} />
      </div>
    </div>
  );
};

export default DetailsPrice;

"use client";

import { routes } from "@/routes/routes";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { redirectZP } from "@/actions/redirect-zp";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const CellAction = ({ data }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-1">
        {data.status === "pending" && (
          <Button
            onClick={() => {
              redirectZP(data.id);
              toast.info(
                <div className="flex items-center gap-2">
                  <LoaderCircle
                    className="animate-spin text-blue-500"
                    size={16}
                  />
                  <span> در حال انتقال به درگاه پرداخت</span>
                </div>,
              );
            }}
            variant="outline"
            className="h-7 border-green-500 text-xs text-green-500 hover:bg-green-500 hover:text-white"
          >
            پرداخت
          </Button>
        )}

        <Link href={routes.user.tours.details(data.id)}>
          <Button className="h-7 text-xs">مشاهده جزئیات</Button>
        </Link>
      </div>
    </div>
  );
};

export default CellAction;

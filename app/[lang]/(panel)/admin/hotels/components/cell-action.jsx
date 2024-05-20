"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/routes/routes";

const CellAction = ({ data }) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <Link href={routes.admin.hotels.details(data.id)}>
        <Button
          variant="ghost"
          className="flex gap-3 rounded-3xl border-2 border-red-primary text-xs"
        >
          مشاهده جزئیات
        </Button>
      </Link>
    </div>
  );
};

export default CellAction;

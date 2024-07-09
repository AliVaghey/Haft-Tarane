"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/routes/routes";

const CellAction = ({ data }) => {
  console.log("data", data);
  return (
    <div className="flex items-center justify-center gap-1">
      <Link href={routes.admin.accounting.paid["agency-paid"](data.agency.id)}>
        <Button
          variant="ghost"
          className="flex h-8 gap-3 rounded-3xl border-2 border-red-primary text-xs"
        >
          تسویه ها
        </Button>
      </Link>
    </div>
  );
};

export default CellAction;

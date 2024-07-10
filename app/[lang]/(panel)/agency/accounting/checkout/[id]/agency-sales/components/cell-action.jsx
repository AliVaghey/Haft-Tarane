"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/routes/routes";
import SubmitButton from "@/components/submit-button";
import { useState } from "react";

const CellAction = ({ data }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center justify-center gap-1">
      {/* <Link href={routes.admin.accounting.sales["agency-sales"](data.id)}> */}
      <SubmitButton
        loading={loading}
        variant="ghost"
        className="flex h-8 gap-3 rounded-3xl border-2 border-red-primary text-xs"
      >
        تسویه
      </SubmitButton>
      {/* </Link> */}
    </div>
  );
};

export default CellAction;

"use client";

import { routes } from "@/routes/routes";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CellAction = ({ data }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Link href={routes.superadmin["all-tours"].details(data.id)}>
          <Button
            variant="ghost"
            className="h-8 rounded-3xl bg-yellow-light hover:bg-yellow-dark"
          >
            جزئیات
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CellAction;

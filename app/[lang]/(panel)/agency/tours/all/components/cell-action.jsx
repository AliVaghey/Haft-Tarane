"use client";

import { routes } from "@/routes/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const CellAction = ({ data }) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Link href={routes.agency.tours.details(data.id)}>
          <Button
            variant="ghost"
            className="h-8 rounded-3xl border border-red-dark"
          >
            جزئیات تور
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CellAction;

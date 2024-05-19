import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { routes } from "@/routes/routes";

const DataTableHeader = ({ title, description }) => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between rounded-lg bg-gray-background p-2 px-3">
        <div className="flex flex-col gap-2">
          <span className="text-lg text-muted-foreground">{title}</span>
          <span className="text-sm text-muted-foreground">{description}</span>
        </div>
        <div>
          <Link href={routes.admin.cities.add}>
            <Button className="min-w-36 rounded-3xl border-2 border-red-primary bg-white hover:bg-white/60">
              افزودن شهر
            </Button>
          </Link>
        </div>
      </div>
      <Separator className="my-2 h-0.5 bg-gray-400" />
    </div>
  );
};

export default DataTableHeader;

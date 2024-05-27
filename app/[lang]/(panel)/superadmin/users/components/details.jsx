"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useMount from "@/hooks/use-mount";
import { routes } from "@/routes/routes";
import { usePathname, useRouter } from "next/navigation";
import { useDictionary } from "@/providers/dictionary-provider";

const Details = ({ data }) => {
  const dictionary = useDictionary();

  const mount = useMount();
  const pathname = usePathname();
  const router = useRouter();

  const isdetailsPage = pathname.endsWith(
    routes.superadmin.users.details(data.id),
  );

  if (!mount) {
    return null;
  }

  return (
    <Dialog
      open={isdetailsPage}
      onOpenChange={() => router.push(routes.superadmin.users.root)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mr-4 text-right">کاربر</DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col gap-3">
          <div className="flex">
            <span>نام کاربری :</span>
            <span className="text-primary">{data?.username}</span>
          </div>
          <div className="flex gap-2">
            <span>شماره تماس :</span>
            <span className="text-primary">{data?.phone}</span>
          </div>
          <div className="flex gap-2">
            <span>ایمیل :</span>
            <span className="text-primary">{data?.email}</span>
          </div>
          <div className="flex gap-2">
            <span>سطح دسترسی :</span>
            <span className="text-primary">{data?.access_type}</span>
          </div>
          <div className="flex gap-2">
            <span>کد ملی :</span>
            <span className="text-primary">{data?.national_code}</span>
          </div>
          <div className="flex gap-2">
            <span>نام به فارسی :</span>
            <span className="text-primary">{data?.first_name_fa}</span>
          </div>
          <div className="flex gap-2">
            <span>نام خانوادگی به فارسی :</span>
            <span className="text-primary">{data?.last_name_fa}</span>
          </div>
          <div className="flex gap-2">
            <span>نام به انگلیسی :</span>
            <span className="text-primary">{data?.first_name_en}</span>
          </div>
          <div className="flex gap-2">
            <span>نام خانوادگی به انگلیسی :</span>
            <span className="text-primary">{data?.last_name_en}</span>
          </div>
          <div className="flex gap-2">
            <span>جنسیت :</span>
            <span className="text-primary">
              {data?.gender === "male" ? "مرد" : "زن"}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Details;

"use client";

import { useUser } from "@/hooks/use-user";
import { List } from "lucide-react";
import { farsiNumber } from "@/lib/farsi-number";

const AdminDashboardPage = () => {
  const userHook = useUser();

  return (
    <div className="flex w-full justify-center">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center justify-between rounded-lg border-b-[3px] border-b-green-500 bg-white px-4 py-6">
          <div className="flex items-center gap-2">
            <List className="text-green-500" strokeWidth={1.5} size={36} />
            <span className="text-muted-foreground">تعداد بازدید امروز</span>
          </div>
          <span className="text-2xl">
            {farsiNumber(userHook?.siteViews?.today)}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg border-b-[3px] border-b-blue-500 bg-white px-4 py-6">
          <div className="flex items-center gap-2">
            <List className="text-blue-500" strokeWidth={1.5} size={36} />
            <span className="text-muted-foreground">تعداد بازدید کل</span>
          </div>
          <span className="text-2xl">
            {farsiNumber(userHook?.siteViews?.all)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

"use client";

import { useUser } from "@/hooks/use-user";
import {
  CreditCard,
  List,
  MessageSquareMore,
  Plane,
  Users,
} from "lucide-react";
import { farsiNumber } from "@/lib/farsi-number";
import { Separator } from "@/components/ui/separator";

const AdminDashboardPage = () => {
  const userHook = useUser();

  return (
    <div className="flex w-full flex-col justify-center gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-base text-muted-foreground">آمار فروش سایت</span>
        <Separator className="h-0.5 bg-primary" />
      </div>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center justify-between rounded-lg border-b-[3px] border-b-green-500 bg-white px-4 py-6">
          <div className="flex items-center gap-2">
            <Plane className="text-green-500" strokeWidth={1.5} size={36} />
            <span className="text-muted-foreground">تعداد تور های فعال</span>
          </div>
          <span className="text-2xl">
            {farsiNumber(userHook.superadminDashboard?.active_tours)}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg border-b-[3px] border-b-blue-500 bg-white px-4 py-6">
          <div className="flex items-center gap-2">
            <CreditCard className="text-blue-500" strokeWidth={1.5} size={36} />
            <span className="text-muted-foreground">کل فروش ها</span>
          </div>
          <span className="text-2xl">
            {farsiNumber(userHook.superadminDashboard?.all_sales)}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg border-b-[3px] border-b-yellow-500 bg-white px-4 py-6">
          <div className="flex items-center gap-2">
            <CreditCard
              className="text-yellow-500"
              strokeWidth={1.5}
              size={36}
            />
            <span className="text-muted-foreground">فروش های ماه</span>
          </div>
          <span className="text-2xl">
            {farsiNumber(userHook.superadminDashboard?.month_sales)}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg border-b-[3px] border-b-red-500 bg-white px-4 py-6">
          <div className="flex items-center gap-2">
            <CreditCard className="text-red-500" strokeWidth={1.5} size={36} />
            <span className="text-muted-foreground">فروش های امروز</span>
          </div>
          <span className="text-2xl">
            {farsiNumber(userHook.superadminDashboard?.today_sales)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-base text-muted-foreground">
          آمار کاربران سایت
        </span>
        <Separator className="h-0.5 bg-primary" />
      </div>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center justify-between rounded-lg border-b-[3px] border-b-green-500 bg-white px-4 py-6">
          <div className="flex items-center gap-2">
            <Users className="text-green-500" strokeWidth={1.5} size={36} />
            <span className="text-muted-foreground">تعداد کل کاربران</span>
          </div>
          <span className="text-2xl">
            {farsiNumber(userHook.superadminDashboard?.user_count)}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg border-b-[3px] border-b-blue-500 bg-white px-4 py-6">
          <div className="flex items-center gap-2">
            <Users className="text-blue-500" strokeWidth={1.5} size={36} />
            <span className="text-muted-foreground">تعداد ادمین های سایت</span>
          </div>
          <span className="text-2xl">
            {farsiNumber(userHook.superadminDashboard?.admin_count)}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg border-b-[3px] border-b-yellow-500 bg-white px-4 py-6">
          <div className="flex items-center gap-2">
            <Users className="text-yellow-500" strokeWidth={1.5} size={36} />
            <span className="text-muted-foreground">تعداد کل آژانس ها</span>
          </div>
          <span className="text-2xl">
            {farsiNumber(userHook.superadminDashboard?.agency_count)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-base text-muted-foreground">
          آمار بازدید سایت
        </span>
        <Separator className="h-0.5 bg-primary" />
      </div>

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

      <div className="flex flex-col gap-2">
        <span className="text-base text-muted-foreground">آمار پنل پیامکی</span>
        <Separator className="h-0.5 bg-primary" />
      </div>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center justify-between rounded-lg border-b-[3px] border-b-green-500 bg-white px-4 py-6">
          <div className="flex items-center gap-2">
            <MessageSquareMore
              className="text-green-500"
              strokeWidth={1.5}
              size={36}
            />
            <span className="text-muted-foreground">
              تعداد پیامک باقی مانده
            </span>
          </div>
          <span className="text-2xl">
            {farsiNumber(userHook.superadminDashboard?.sms_left)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

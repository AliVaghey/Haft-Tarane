import { routes } from "@/routes/routes";
import {
  ServerCog,
  ClipboardList,
  ShieldEllipsis,
  Plane,
  LayoutDashboard,
  SwatchBook,
  PencilLine,
  WalletMinimal,
  UserCog,
  Wallet,
  Edit,
} from "lucide-react";

export const navItems = [
  {
    title: "داشبورد",
    type: "text",
  },

  {
    title: "داشبورد",
    type: "link",
    href: routes.agency.dashboard,
    icon: (size, strokeWidth) => (
      <LayoutDashboard size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
  },

  {
    title: "پشتیبان ها",
    type: "link",
    href: routes.agency["support-team"].root,
    icon: (size, strokeWidth) => (
      <ServerCog size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
  },

  {
    title: "تور ها",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Plane size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه تور ها",
        href: routes.agency.tours.all,
        icon: (size, strokeWidth) => (
          <ClipboardList size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "پیش نویس ها",
        href: routes.agency.tours.draft,
        icon: (size, strokeWidth) => (
          <PencilLine size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "در انتظار تایید",
        href: routes.agency.tours.pending,
        icon: (size, strokeWidth) => (
          <ShieldEllipsis size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "نیازمند اصلاح",
        href: routes.agency.tours.rejected,
        icon: (size, strokeWidth) => (
          <Edit size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },

  {
    title: "فروش ها",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <WalletMinimal size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه فروش ها",
        href: routes.agency.sales.all,
        icon: (size, strokeWidth) => (
          <Wallet size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "در انتظار پرداخت",
        href: routes.agency.sales["pending-pay"],
        icon: (size, strokeWidth) => (
          <ShieldEllipsis size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "حسابداری",
        href: routes.agency.sales.accounting,
        icon: (size, strokeWidth) => (
          <SwatchBook size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "لید ها",
        href: routes.agency.sales.leads,
        icon: (size, strokeWidth) => (
          <UserCog size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },
];

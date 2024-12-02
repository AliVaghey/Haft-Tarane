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
  User,
  User2,
  Lock,
  Home,
} from "lucide-react";

export const navItems = [
  {
    title: "صفحه اصلی",
    type: "link",
    href: routes.landing.root,
    icon: (size, strokeWidth) => (
      <Home size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
  },

  {
    title: "داشبورد و اطلاعات کاربری",
    type: "text",
  },

  {
    title: "داشبورد",
    type: "link",
    href: routes.user.dashboard,
    icon: (size, strokeWidth) => (
      <LayoutDashboard size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
  },

  {
    title: "اطلاعات کاربری",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <User size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "مشخصات کاربر",
        href: routes.user.profile["user-info"],
        icon: (size, strokeWidth) => (
          <User2 size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "ویرایش رمز عبور",
        href: routes.user.profile["update-password"],
        icon: (size, strokeWidth) => (
          <Lock size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },

  // {
  //   title: "تور ها",
  //   type: "text",
  // },

  {
    title: "تور ها",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Plane size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "تور های رزرو شده",
        href: routes.user.tours.root,
        icon: (size, strokeWidth) => (
          <Plane size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },
  {
    title: "بلیط ها",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Plane size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "بلیط های هواییما",
        href: routes.user.ticket.root,
        icon: (size, strokeWidth) => (
          <Plane size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },
  {
    title: "تاریخچه افزایش موجودی",
    type: "link",
    href: routes.user.walletHistory,
    icon: (size, strokeWidth) => (
      <Wallet size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [],
  },
];

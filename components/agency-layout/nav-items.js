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
  SquareCheckBig,
  RefreshCcwDot,
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
    href: routes.agency.dashboard,
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
        href: routes.agency.profile["user-info"],
        icon: (size, strokeWidth) => (
          <User2 size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "مشخصات آژانس",
        href: routes.agency.profile["agency-info"],
        icon: (size, strokeWidth) => (
          <User2 size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "ویرایش رمز عبور",
        href: routes.agency.profile["update-password"],
        icon: (size, strokeWidth) => (
          <Lock size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },

  {
    title: "پشتیبان ها",
    type: "link",
    href: routes.agency["support-team"].root,
    icon: (size, strokeWidth) => (
      <UserCog size={size || 18} strokeWidth={strokeWidth || 1.5} />
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
        title: "ایجاد تور",
        href: routes.agency.tours.create,
        icon: (size, strokeWidth) => (
          <Plane size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
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
    title: "بلیط ها",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Plane size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "بلیط های هواییما",
        href: routes.agency.ticket.root,
        icon: (size, strokeWidth) => (
          <Plane size={size || 18} strokeWidth={strokeWidth || 1.5} />
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
        href: routes.agency.sales.paid.root,
        icon: (size, strokeWidth) => (
          <Wallet size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "در انتظار پرداخت",
        href: routes.agency.sales.pending.root,
        icon: (size, strokeWidth) => (
          <RefreshCcwDot size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },

  {
    title: "حسابداری",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <SwatchBook size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "تسویه ها",
        href: routes.agency.accounting.checkout.root,
        icon: (size, strokeWidth) => (
          <SquareCheckBig size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "در انتظار تسویه",
        href: routes.agency.accounting["awaiting-payment"].root,
        icon: (size, strokeWidth) => (
          <RefreshCcwDot size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },
];

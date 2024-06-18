import { routes } from "@/routes/routes";
import {
  AlertCircle,
  AlertCircleIcon,
  Building,
  Cog,
  Percent,
  PlusCircle,
  User,
  User2,
} from "lucide-react";
import {
  Hotel,
  ClipboardList,
  Pyramid,
  File,
  Bed,
  ShieldEllipsis,
  Plane,
  UserRoundCog,
  Building2,
  LayoutDashboard,
  LibraryBig,
  SwatchBook,
  UsersRound,
} from "lucide-react";

export const navItems = [
  {
    title: "داشبورد و اطلاعات کاربری",
    type: "text",
  },

  {
    title: "داشبورد",
    type: "link",
    href: routes.superadmin.dashboard,
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
        href: routes.superadmin.profile["user-info"],
        icon: (size, strokeWidth) => (
          <User2 size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },

  {
    title: "مدیریت امکانات اصلی سایت",
    type: "text",
  },

  {
    title: "مدیریت شهرها",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Building2 size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه شهر ها",
        href: routes.superadmin.cities.root,
        icon: (size, strokeWidth) => (
          <Building2 size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "افزودن شهر",
        href: routes.superadmin.cities.add,
        icon: (size, strokeWidth) => (
          <Building2 size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },

  {
    title: "مدیریت کاربران",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <LibraryBig size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه کاربران",
        href: routes.superadmin.users.root,
        icon: (size, strokeWidth) => (
          <UsersRound size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "ادمین ها",
        href: routes.superadmin.admins.root,
        icon: (size, strokeWidth) => (
          <UserRoundCog size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },

  {
    title: "مدیریت آژانس ها",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <SwatchBook size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه آژانس ها",
        href: routes.superadmin.agencies.root,
        icon: (size, strokeWidth) => (
          <File size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "آژانس های شما",
        href: routes.superadmin["your-agencies"].root,
        icon: (size, strokeWidth) => (
          <File size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },

  {
    title: "مدیریت هتل ها",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Hotel size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه هتل ها",
        href: routes.superadmin.hotels.root,
        icon: (size, strokeWidth) => (
          <Bed size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "افزودن هتل",
        href: routes.superadmin["your-hotels"].add,
        icon: (size, strokeWidth) => (
          <Bed size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "هتل های شما",
        href: routes.superadmin["your-hotels"].root,
        icon: (size, strokeWidth) => (
          <Bed size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },

  {
    title: "مدیریت تور ها",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Plane size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه تور های فعال",
        href: routes.superadmin.tours.all,
        icon: (size, strokeWidth) => (
          <ClipboardList size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "تور های فعال شما",
        href: routes.superadmin.tours.active,
        icon: (size, strokeWidth) => (
          <Pyramid size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "تور های در انتظار تایید",
        href: routes.superadmin.tours.pending,
        icon: (size, strokeWidth) => (
          <ShieldEllipsis size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },

  {
    title: "نرخ های کمیسیون",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Percent size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه نرخ ها",
        href: routes.superadmin["profit-rates"].root,
        icon: (size, strokeWidth) => (
          <Percent size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "افزودن",
        href: routes.superadmin["profit-rates"].add,
        icon: (size, strokeWidth) => (
          <PlusCircle size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },

  {
    title: "مدیریت بخش های صفحه اصلی",
    type: "text",
  },

  {
    title: "تور های ویژه",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Plane size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه تور های ویژه",
        href: routes.superadmin["special-tours"].root,
        icon: (size, strokeWidth) => (
          <ClipboardList size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "افزودن",
        href: routes.superadmin["special-tours"].add,
        icon: (size, strokeWidth) => (
          <Pyramid size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },

  {
    title: "بنر ها",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <AlertCircle size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه بنر ها",
        href: routes.superadmin.banners.root,
        icon: (size, strokeWidth) => (
          <AlertCircleIcon size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "افزودن",
        href: routes.superadmin.banners.add,
        icon: (size, strokeWidth) => (
          <PlusCircle size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },

  {
    title: "مدیریت API های حمل و نقل",
    type: "text",
  },

  {
    title: "مدیریت API پرواز ها",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Plane size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "تنظیمات اصلی",
        href: routes.superadmin["transportation-api"].flights.root,
        icon: (size, strokeWidth) => (
          <Cog size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },

  {
    title: "مدیریت گزینه ها",
    type: "text",
  },

  {
    title: "گزینه ها",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Cog size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "مدل های تور",
        href: routes.superadmin.options["tour-styles"].root,
        icon: (size, strokeWidth) => (
          <Cog size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "مدارک همراه",
        href: routes.superadmin.options.certificates.root,
        icon: (size, strokeWidth) => (
          <Cog size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "سرویس های رایگان",
        href: routes.superadmin.options["free-services"].root,
        icon: (size, strokeWidth) => (
          <Cog size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },
];

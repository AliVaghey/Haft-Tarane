import { routes } from "@/routes/routes";
import { Building, Home, Lock, User, User2 } from "lucide-react";
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
    href: routes.admin.dashboard,
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
        href: routes.admin.profile["user-info"],
        icon: (size, strokeWidth) => (
          <User2 size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "ویرایش رمز عبور",
        href: routes.admin.profile["update-password"],
        icon: (size, strokeWidth) => (
          <Lock size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },

  // {
  //   title: "مدیریت شهرها",
  //   type: "subMenu",
  //   icon: (size, strokeWidth) => (
  //     <Building2 size={size || 18} strokeWidth={strokeWidth || 1.5} />
  //   ),
  //   subMenu: [
  //     {
  //       title: "همه شهر ها",
  //       href: routes.admin.cities.root,
  //       icon: (size, strokeWidth) => (
  //         <Building2 size={size || 18} strokeWidth={strokeWidth || 1.5} />
  //       ),
  //     },
  //     {
  //       title: "افزودن شهر",
  //       href: routes.admin.cities.add,
  //       icon: (size, strokeWidth) => (
  //         <Building2 size={size || 18} strokeWidth={strokeWidth || 1.5} />
  //       ),
  //     },
  //   ],
  // },

  {
    title: "مدیریت کاربران",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <LibraryBig size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه کاربران",
        href: routes.admin.users.root,
        icon: (size, strokeWidth) => (
          <UsersRound size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      // {
      //   title: "ادمین ها",
      //   href: routes.admin.admins.root,
      //   icon: (size, strokeWidth) => (
      //     <UserRoundCog size={size || 18} strokeWidth={strokeWidth || 1.5} />
      //   ),
      // },
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
        href: routes.admin.agencies.root,
        icon: (size, strokeWidth) => (
          <File size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "آژانس های شما",
        href: routes.admin["your-agencies"].root,
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
        href: routes.admin.hotels.root,
        icon: (size, strokeWidth) => (
          <Bed size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "افزودن هتل",
        href: routes.admin["your-hotels"].add,
        icon: (size, strokeWidth) => (
          <Bed size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "هتل های شما",
        href: routes.admin["your-hotels"].root,
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
        href: routes.admin.tours.all,
        icon: (size, strokeWidth) => (
          <ClipboardList size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "تور های فعال شما",
        href: routes.admin.tours.active,
        icon: (size, strokeWidth) => (
          <Pyramid size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "تور های در انتظار تایید",
        href: routes.admin.tours.pending,
        icon: (size, strokeWidth) => (
          <ShieldEllipsis size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },
];

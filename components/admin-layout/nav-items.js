import { routes } from "@/routes/routes";
import { PackageSearch } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { PackagePlus } from "lucide-react";
import { Folders } from "lucide-react";
import { CopyPlus } from "lucide-react";
import {
  Bell,
  Folder,
  FolderPlus,
  LayoutDashboard,
  LibraryBig,
  List,
  PlusCircle,
  Settings,
  SwatchBook,
  UserCog,
  UserPlus,
  UserSearch,
  Users,
  UsersRound,
} from "lucide-react";

export const navItems = [
  {
    title: "داشبورد",
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
    title: "پروفایل",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <LibraryBig size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "مشاهده پروفایل",
        href: "",
        icon: (size, strokeWidth) => (
          <UserSearch size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "ویرایش پروفایل",
        href: "",
        icon: (size, strokeWidth) => (
          <UserCog size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "تنظیمات",
        href: "",
        icon: (size, strokeWidth) => (
          <Settings size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
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
    title: "پروفایل",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <LibraryBig size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "مشاهده پروفایل",
        href: "",
        icon: (size, strokeWidth) => (
          <UserSearch size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "ویرایش پروفایل",
        href: "",
        icon: (size, strokeWidth) => (
          <UserCog size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "تنظیمات",
        href: "",
        icon: (size, strokeWidth) => (
          <Settings size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
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
    title: "پروفایل",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <LibraryBig size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "مشاهده پروفایل",
        href: "",
        icon: (size, strokeWidth) => (
          <UserSearch size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "ویرایش پروفایل",
        href: "",
        icon: (size, strokeWidth) => (
          <UserCog size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "تنظیمات",
        href: "",
        icon: (size, strokeWidth) => (
          <Settings size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },
];

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
} from "lucide-react";

export const navItems = [
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
    ],
  },
];

import { routes } from "@/routes/routes";
import {
  AlertCircle,
  AlertCircleIcon,
  Bus,
  Cog,
  Home,
  Lock,
  Percent,
  PlusCircle,
  RotateCcwIcon,
  Route,
  Text,
  TicketCheck,
  Train,
  User,
  User2,
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
  Tags,
  Images,
  DollarSign,
  DollarSignIcon,
  Wallet,
  BarChart,
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
      {
        title: "ویرایش رمز عبور",
        href: routes.superadmin.profile["update-password"],
        icon: (size, strokeWidth) => (
          <Lock size={size || 18} strokeWidth={strokeWidth || 1.5} />
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
    title: "همه تور های سایت",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Plane size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه تور ها",
        href: routes.superadmin["all-tours"].all,
        icon: (size, strokeWidth) => (
          <ClipboardList size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "تور های فعال",
        href: routes.superadmin["all-tours"].active,
        icon: (size, strokeWidth) => (
          <ClipboardList size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "تور های در انتظار تایید",
        href: routes.superadmin["all-tours"].pending,
        icon: (size, strokeWidth) => (
          <ClipboardList size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "تور های رد شده",
        href: routes.superadmin["all-tours"].rejected,
        icon: (size, strokeWidth) => (
          <ClipboardList size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "تور های منقضی شده",
        href: routes.superadmin["all-tours"].expired,
        icon: (size, strokeWidth) => (
          <ClipboardList size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "تور های پیشنویس",
        href: routes.superadmin["all-tours"].drafts,
        icon: (size, strokeWidth) => (
          <ClipboardList size={size || 18} strokeWidth={strokeWidth || 1.5} />
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
    title: "نرخ  ارز ها",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <DollarSignIcon size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "مدیریت ارز ها",
        href: routes.superadmin.currency.root,
        icon: (size, strokeWidth) => (
          <BarChart  size={size || 18} strokeWidth={strokeWidth || 1.5} />
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
    title: "اسلایدر ها",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Images size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "همه اسلایدر ها",
        href: routes.superadmin["slider-cards"].root,
        icon: (size, strokeWidth) => (
          <Images size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "افزودن",
        href: routes.superadmin["slider-cards"].add,
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
          <Pyramid size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "مدارک همراه",
        href: routes.superadmin.options.certificates.root,
        icon: (size, strokeWidth) => (
          <TicketCheck size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "سرویس های رایگان",
        href: routes.superadmin.options["free-services"].root,
        icon: (size, strokeWidth) => (
          <RotateCcwIcon size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "توضیحات تور",
        href: routes.superadmin.options["tour-descriptions"].root,
        icon: (size, strokeWidth) => (
          <Text size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "نوع اتاق هتل",
        href: routes.superadmin.options["room-types"].root,
        icon: (size, strokeWidth) => (
          <Hotel size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "برچسب ها",
        href: routes.superadmin.options.labels.root,
        icon: (size, strokeWidth) => (
          <Tags size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },

  {
    title: "مدیریت شرکت های مسافربری",
    type: "text",
  },

  {
    title: "گزینه های حمل و نقل",
    type: "subMenu",
    icon: (size, strokeWidth) => (
      <Route size={size || 18} strokeWidth={strokeWidth || 1.5} />
    ),
    subMenu: [
      {
        title: "شرکت های هواپیمایی",
        href: routes.superadmin["transportation-options"].airplane.root,
        icon: (size, strokeWidth) => (
          <Plane size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "شرکت های حمل و نقل ریلی",
        href: routes.superadmin["transportation-options"].train.root,
        icon: (size, strokeWidth) => (
          <Train size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "شرکت های حمل و نقل جاده ای",
        href: routes.superadmin["transportation-options"].bus.root,
        icon: (size, strokeWidth) => (
          <Bus size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "انواع هواپیما",
        href: routes.superadmin["transportation-options"]["airplane-type"].root,
        icon: (size, strokeWidth) => (
          <Plane size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "انواع قطار",
        href: routes.superadmin["transportation-options"]["train-type"].root,
        icon: (size, strokeWidth) => (
          <Train size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
      {
        title: "انواع اتوبوس",
        href: routes.superadmin["transportation-options"]["bus-type"].root,
        icon: (size, strokeWidth) => (
          <Bus size={size || 18} strokeWidth={strokeWidth || 1.5} />
        ),
      },
    ],
  },
];

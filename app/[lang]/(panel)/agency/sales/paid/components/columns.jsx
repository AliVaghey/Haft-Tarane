"use client";

import { persianPriceFormat } from "@/lib/persian-price-format";
import CellAction from "./cell-action";
import Number from "./number";
import { farsiNumber } from "@/lib/farsi-number";
import { jaliliDate } from "@/lib/jalali-date";

export const columns = [
  {
    id: "شناسه",
    header: "#",
    cell: ({ row }) => {
      return <Number number={row.index + 1} />;
    },
  },
  {
    id: "title",
    header: "عنوان تور",
    cell: ({ row }) => <span>{row.original.tour.title}</span>,
  },
  {
    id: "username",
    header: "نام خریدار",
    cell: ({ row }) => {
      return <span>{row.original.user.username}</span>;
    },
  },
  {
    id: "phoneNumber",
    header: "شماره تماس",
    cell: ({ row }) => {
      return <span>{farsiNumber(row.original.user.phone)}</span>;
    },
  },
  {
    id: "tourCode",
    header: "شناسه تور",
    cell: ({ row }) => <span>{farsiNumber(row.original.tour.id)}</span>,
  },
  {
    id: "origin",
    header: "مبدا",
    cell: ({ row }) => <span>{row.original.tour.origin}</span>,
  },
  {
    id: "destination",
    header: "مقصد",
    cell: ({ row }) => <span>{row.original.tour.destination}</span>,
  },
  {
    id: "totalPrice",
    header: "قیمت کل",
    cell: ({ row }) => (
      <span>{persianPriceFormat(+row.original.total_price)} تومان</span>
    ),
  },
  {
    id: "start",
    header: "تاریخ حرکت",
    cell: ({ row }) => (
      <span>{farsiNumber(jaliliDate(row.original.date.start))}</span>
    ),
  },
  {
    id: "payStatus",
    header: "وضعیت پرداخت",
    cell: ({ row }) =>
      row.original.status === "pending" ? (
        <span className="text-yellow-primary">در انتظار پرداخت</span>
      ) : (
        <span className="text-green-500">پرداخت شده</span>
      ),
  },
  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

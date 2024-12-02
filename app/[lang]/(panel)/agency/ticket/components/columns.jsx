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
    id: "date",
    header: "تاریخ",
    cell: ({ row }) => <span>{farsiNumber(jaliliDate(row.original?.flightInfo?.created_at))}</span>,
  },
  {
    id: "origin",
    header: "مبدا",
    cell: ({ row }) => <span>{row?.original?.flightInfo?.from}</span>,
  },
  {
    id: "destination",
    header: "مقصد",
    cell: ({ row }) => <span>{row?.original?.flightInfo?.to}</span>,
  },
  {
    id: "status",
    header: "وضعیت",
    cell: ({ row }) => (
      <span>{row.original.status === "pending" ? "در انتظار پرداخت" : row.original.status === "canceled" ? "ناموفق" : row.original.status === "paid" ? "موفق" : ''}</span>
    ),
  },
  {
    id: "totalPrice",
    header: "توضیحات",
    cell: ({ row }) => <span>{row?.original?.descriptions}</span>,
  },
  {
    id: "start",
    header: "بلیط",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
  // {
  //   id: "payStatus",
  //   header: "وضعیت پرداخت",
  //   cell: ({ row }) =>
  //     row.original.status === "pending" ? (
  //       <span className="text-yellow-primary">در انتظار پرداخت</span>
  //     ) : (
  //       <span className="text-green-500">پرداخت شده</span>
  //     ),
  // },
  // {
  //   id: "actions",
  //   header: "اقدامات",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];

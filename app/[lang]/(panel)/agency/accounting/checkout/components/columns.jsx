"use client";

import { farsiNumber } from "@/lib/farsi-number";
import CellAction from "./cell-action";
import Number from "./number";
import { persianPriceFormat } from "@/lib/persian-price-format";
import Link from "next/link";

export const columns = [
  {
    id: "شناسه",
    header: "شناسه",
    cell: ({ row }) => {
      return <Number number={row.index + 1} />;
    },
  },
  {
    id: "adminName",
    header: "نام ادمین",
    cell: ({ row }) => <span>{farsiNumber(row.original.admin.name)}</span>,
  },
  {
    id: "total_sales",
    header: "قیمت کل",
    cell: ({ row }) => (
      <span>{persianPriceFormat(+row.original.real_price)} تومان</span>
    ),
  },
  {
    id: "total_price",
    header: "سود آژانس",
    cell: ({ row }) => (
      <span>{persianPriceFormat(+row.original.total_price)} تومان</span>
    ),
  },
  {
    id: "profit",
    header: "کارمزد بی باک سفر",
    cell: ({ row }) => (
      <span>{persianPriceFormat(+row.original.profit)} تومان</span>
    ),
  },
  {
    id: "receipt",
    header: "رسید",
    cell: ({ row }) => (
      <Link
        href={row.original.receipt}
        className="border-b border-b-transparent font-normal text-blue-500 transition-all duration-200 hover:border-b-blue-500"
      >
        دانلود رسید
      </Link>
    ),
  },
  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

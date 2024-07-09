"use client";

import { farsiNumber } from "@/lib/farsi-number";
import CellAction from "./cell-action";
import Number from "./number";
import { persianPriceFormat } from "@/lib/persian-price-format";

export const columns = [
  {
    id: "شناسه",
    header: "شناسه",
    cell: ({ row }) => {
      return <Number number={row.index + 1} />;
    },
  },
  {
    id: "agencyName",
    header: "نام آژانس",
    cell: ({ row }) => <span>{row.original.agency.name}</span>,
  },
  {
    id: "agencyPhone",
    header: "شماره تماس آژانس",
    cell: ({ row }) => <span>{farsiNumber(row.original.agency.c_phone)}</span>,
  },
  {
    id: "total_sales",
    header: "فروش کل",
    cell: ({ row }) => (
      <span>{persianPriceFormat(row.original.total_sales)} تومان</span>
    ),
  },
  {
    id: "dept",
    header: "سود آژانس",
    cell: ({ row }) => (
      <span>{persianPriceFormat(row.original.dept)} تومان</span>
    ),
  },
  {
    id: "profit",
    header: "سود بی باک سفر",
    cell: ({ row }) => (
      <span>{persianPriceFormat(row.original.profit)} تومان</span>
    ),
  },

  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

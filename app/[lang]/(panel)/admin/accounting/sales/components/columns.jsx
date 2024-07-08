"use client";

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
    id: "total_sales",
    header: "قیمت کل",
    cell: ({ row }) => (
      <span>{persianPriceFormat(row.original.total_sales)}</span>
    ),
  },
  {
    id: "dept",
    header: "سود آژانس",
    cell: ({ row }) => <span>{persianPriceFormat(row.original.dept)}</span>,
  },
  {
    id: "profit",
    header: "سود بی باک سفر",
    cell: ({ row }) => <span>{persianPriceFormat(row.original.profit)}</span>,
  },

  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

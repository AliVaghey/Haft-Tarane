"use client";

import { persianPriceFormat } from "@/lib/persian-price-format";
import CellAction from "./cell-action";
import Number from "./number";
import { farsiNumber } from "@/lib/farsi-number";
import { jaliliDate } from "@/lib/jalali-date";

export const columns = [
  {
    id: "شناسه",
    header: "شناسه",
    cell: ({ row }) => {
      return <Number number={row.index + 1} />;
    },
  },
  {
    id: "tour_id",
    header: "عنوان تور",
    cell: ({ row }) => <span>{row.original.tour.title}</span>,
  },
  {
    id: "tour_id",
    header: "مبدا",
    cell: ({ row }) => <span>{row.original.tour.origin}</span>,
  },
  {
    id: "tour_id",
    header: "مقصد",
    cell: ({ row }) => <span>{row.original.tour.destination}</span>,
  },
  {
    id: "tour_id",
    header: "قیمت کل",
    cell: ({ row }) => (
      <span>{persianPriceFormat(+row.original.total_price)} تومان</span>
    ),
  },
  {
    id: "tour_id",
    header: "تاریخ حرکت",
    cell: ({ row }) => (
      <span>{farsiNumber(jaliliDate(row.original.date.start))}</span>
    ),
  },

  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

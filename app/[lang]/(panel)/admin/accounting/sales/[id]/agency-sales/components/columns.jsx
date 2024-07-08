"use client";

import { farsiNumber } from "@/lib/farsi-number";
import CellAction from "./cell-action";
import Number from "./number";
import { persianPriceFormat } from "@/lib/persian-price-format";
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
    id: "agencyName",
    header: "نام آژانس",
    cell: ({ row }) => <span>{row.original.agency.name}</span>,
  },
  {
    id: "id",
    header: "کد تور",
    cell: ({ row }) => <span>{farsiNumber(row.original.tour.id)}</span>,
  },
  {
    id: "origin",
    header: "مبدا",
    cell: ({ row }) => <span>{farsiNumber(row.original.tour.origin)}</span>,
  },
  {
    id: "destination",
    header: "مقصد",
    cell: ({ row }) => (
      <span>{farsiNumber(row.original.tour.destination)}</span>
    ),
  },
  {
    id: "total_sales",
    header: "قیمت کل",
    cell: ({ row }) => (
      <span>{persianPriceFormat(+row.original.total_price)}</span>
    ),
  },
  {
    id: "dept",
    header: "سود آژانس",
    cell: ({ row }) => (
      <span>
        {" "}
        از تاریخ {farsiNumber(jaliliDate(row.original.date.start))} تا
        {"  "}
        {farsiNumber(jaliliDate(row.original.date.end))}{" "}
      </span>
    ),
  },
  {
    id: "hotelName",
    header: "نام هتل",
    cell: ({ row }) => (
      <span>{persianPriceFormat(row.original.hotel.name)}</span>
    ),
  },
  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

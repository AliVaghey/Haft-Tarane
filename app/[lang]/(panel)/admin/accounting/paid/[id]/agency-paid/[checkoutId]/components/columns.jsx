"use client";

import { farsiNumber } from "@/lib/farsi-number";
import CellAction from "./cell-action";
import Number from "./number";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { jaliliDate } from "@/lib/jalali-date";
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
    id: "username",
    header: "نام کاربر",
    cell: ({ row }) => <span>{row.original.user.username}</span>,
  },
  {
    id: "username",
    header: "شماره تماس کاربر",
    cell: ({ row }) => <span>{farsiNumber(row.original.user.phone)}</span>,
  },
  {
    id: "total_price",
    header: "مبلغ پرداخت شده",
    cell: ({ row }) => (
      <span>{persianPriceFormat(+row.original.total_price)}</span>
    ),
  },
  {
    id: "passengers_count",
    header: "تعداد مسافران",
    cell: ({ row }) => (
      <span>{farsiNumber(+row.original.passengers_count)}</span>
    ),
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
    id: "dept",
    header: "تاریخ تور",
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
];

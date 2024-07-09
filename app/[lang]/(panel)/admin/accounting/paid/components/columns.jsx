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
    id: "address",
    header: "آدرس",
    cell: ({ row }) => <span>{row.original.agency.address}</span>,
  },
  {
    id: "zip_code",
    header: "کد پستی",
    cell: ({ row }) => <span>{farsiNumber(row.original.agency.zip_code)}</span>,
  },
  {
    id: "email",
    header: "ایمیل",
    cell: ({ row }) => <span>{row.original.agency.email}</span>,
  },
  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

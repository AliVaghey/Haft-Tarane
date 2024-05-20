"use client";

import CellAction from "./cell-action";
import Number from "./number";

export const columns = [
  {
    id: "شناسه",
    header: "شناسه",
    cell: ({ row }) => {
      return <Number number={row.index + 1} />;
    },
  },
  {
    accessorKey: "agency_name",
    header: "نام آژانس",
  },
  {
    accessorKey: "title",
    header: "عنوان",
  },
  {
    accessorKey: "trip_type",
    header: "نوع تور",
  },
  {
    accessorKey: "capacity",
    header: "ظرفیت",
  },
  {
    accessorKey: "min_cost",
    header: "قیمت پایه",
  },
  {
    id: "actions",
    header: "رد کردن و درخواست اصلاح",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

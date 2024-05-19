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
    accessorKey: "author",
    header: "نام ادمین سازنده",
  },
  {
    accessorKey: "name",
    header: "نام شهر",
  },

  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

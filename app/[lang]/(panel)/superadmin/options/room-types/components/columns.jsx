"use client";

import CellAction from "./cell-action";
import Number from "./number";

export const columns = [
  {
    id: "شماره",
    header: "شماره",
    cell: ({ row }) => {
      return <Number number={row.index + 1} />;
    },
  },
  {
    accessorKey: "value",
    header: "نام نوع اتاق",
  },

  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

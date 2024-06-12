"use client";

import SearchTable from "@/components/search-table";
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
    accessorKey: "name",
    header: "عنوان",
  },

  {
    accessorKey: "rate",
    header: "نرخ تعیین شده",
  },

  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

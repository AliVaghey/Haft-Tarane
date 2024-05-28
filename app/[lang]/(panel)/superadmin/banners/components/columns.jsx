"use client";

import SearchTable from "@/components/search-table";
import CellAction from "./cell-action";
import Number from "./number";
import Image from "next/image";

export const columns = [
  {
    id: "شماره",
    header: "شماره",
    cell: ({ row }) => {
      return <Number number={row.index + 1} />;
    },
  },
  {
    accessorKey: "sort",
    header: "اولویت",
  },
  {
    accessorKey: "link",
    header: "لینک",
  },
  {
    accessorKey: "background_color",
    header: "رنگ پس زمینه",
    cell: ({ row }) => (
      <div
        className="mx-auto size-6 rounded-full"
        style={{ backgroundColor: row.original.background_color }}
      />
    ),
  },
  {
    accessorKey: "text_color",
    header: "رنگ متن",
    cell: ({ row }) => (
      <div
        className="mx-auto size-6 rounded-full"
        style={{ backgroundColor: row.original.text_color }}
      />
    ),
  },
  {
    accessorKey: "description",
    header: "توضیحات",
  },
  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

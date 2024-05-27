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
    accessorKey: "username",
    header: "نام کاربری",
  },

  {
    accessorKey: "admin",
    header: "نام ادمین",
  },
  {
    accessorKey: "agency_name",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>نام آژانس</span>
        <SearchTable queryTitle="name" />
      </div>
    ),
  },
  {
    accessorKey: "agency_address",
    header: "آدرس",
  },

  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

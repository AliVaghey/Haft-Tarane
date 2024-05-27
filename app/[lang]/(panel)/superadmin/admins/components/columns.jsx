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
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>نام کاربری</span>
        <SearchTable queryTitle="username" />
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>شماره تماس</span>
        <SearchTable queryTitle="phone" />
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "ایمیل",
  },
  {
    accessorKey: "national_code",
    header: "کد ملی",
  },

  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

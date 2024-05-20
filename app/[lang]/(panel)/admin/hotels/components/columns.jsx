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
    accessorKey: "author",
    header: "نام ادمین سازنده",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>نام هتل</span>
        <SearchTable queryTitle="name" />
      </div>
    ),
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>کشور</span>
        <SearchTable queryTitle="country" />
      </div>
    ),
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>استان</span>
        <SearchTable queryTitle="city" />
      </div>
    ),
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>شهر</span>
        <SearchTable queryTitle="state" />
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: "آدرس",
  },

  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

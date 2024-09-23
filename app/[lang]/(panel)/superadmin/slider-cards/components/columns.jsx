"use client";

import SearchTable from "@/components/search-table";
import CellAction from "./cell-action";
import Number from "./number";
import Image from "next/image";
import Link from "next/link";

export const columns = [
  {
    id: "شماره",
    header: "شماره",
    cell: ({ row }) => {
      return <Number number={row.index + 1} />;
    },
  },
  {
    id: "id",
    header: "تصویر",
    cell: ({ row }) => (
      <div className="flex w-full items-center justify-center">
        <Image
          src={row?.original?.photo}
          alt=""
          width={160}
          height={90}
          className="aspect-video w-28 rounded-md"
        />
      </div>
    ),
  },
  {
    accessorKey: "link",
    header: "لینک",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Link
          href={row?.original?.link || "#"}
          target="_blank"
          className="border-b border-blue-500 text-blue-500"
        >
          {row?.original?.link}
        </Link>
      </div>
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

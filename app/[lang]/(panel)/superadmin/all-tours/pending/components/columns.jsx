"use client";

import SearchTable from "@/components/search-table";
import CellAction from "./cell-action";
import Number from "./number";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { getTourStatus } from "@/lib/get-tour-status";

export const columns = [
  {
    id: "#",
    header: "#",
    cell: ({ row }) => {
      return <Number number={row.index + 1} />;
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>کد تور</span>
        <SearchTable queryTitle="id" />
      </div>
    ),
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
    accessorKey: "staying_nights",
    header: "تعداد شب تور",
  },
  {
    accessorKey: "min_cost",
    header: "قیمت پایه",
    cell: ({ row }) => {
      return <span>{persianPriceFormat(row.original.min_cost)}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ row }) => {
      return <span>{getTourStatus(row.original.status)}</span>;
    },
  },
  {
    accessorKey: "origin",
    header: "مبدا",
  },
  {
    accessorKey: "destination",
    header: "مقصد",
  },
  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

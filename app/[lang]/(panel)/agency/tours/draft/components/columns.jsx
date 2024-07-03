"use client";

import { persianPriceFormat } from "@/lib/persian-price-format";
import Number from "./number";
import { farsiNumber } from "@/lib/farsi-number";
import CellAction from "./cell-action";
import { getTourStatus } from "@/lib/get-tour-status";
import SearchTable from "@/components/search-table";

export const columns = [
  {
    id: "شناسه",
    header: "شناسه",
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
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ row }) => {
      return getTourStatus(row.original.status);
    },
  },
  {
    accessorKey: "capacity",
    header: "ظرفیت",
    cell: ({ row }) => {
      return <span>{farsiNumber(row.original.capacity)}</span>;
    },
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
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

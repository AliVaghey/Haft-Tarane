"use client";

import { persianPriceFormat } from "@/lib/persian-price-format";
import CellAction from "./cell-action";
import Number from "./number";
import SearchTable from "@/components/search-table";

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
    id: "actions",
    header: "رد کردن و درخواست اصلاح",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

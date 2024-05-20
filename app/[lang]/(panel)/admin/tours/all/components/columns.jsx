"use client";

import SearchTable from "@/components/search-table";
import CellAction from "./cell-action";
import Number from "./number";
import { persianPriceFormat } from "@/lib/persian-price-format";

export const columns = [
  {
    id: "شناسه",
    header: "شناسه",
    cell: ({ row }) => {
      return <Number number={row.index + 1} />;
    },
  },
  {
    accessorKey: "agency_name",
    header: "نام آژانس",
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>عنوان</span>
        <SearchTable queryTitle="title" />
      </div>
    ),
  },
  {
    accessorKey: "trip_type",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>نوع تور</span>
        <SearchTable queryTitle="trip_type" />
      </div>
    ),
  },
  {
    accessorKey: "capacity",
    header: "ظرفیت",
  },
  {
    accessorKey: "min_cost",
    header: "قیمت پایه",
    cell: ({ row }) => {
      return <span>{persianPriceFormat(row.original.min_cost)}</span>;
    },
  },
  {
    accessorKey: "origin",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>مبدا</span>
        <SearchTable queryTitle="origin" />
      </div>
    ),
  },
  {
    accessorKey: "destination",
    header: ({ column }) => (
      <div className="mt-2 flex flex-col gap-1">
        <span>مقصد</span>
        <SearchTable queryTitle="destination" />
      </div>
    ),
  },
  {
    id: "actions",
    header: "رد کردن و درخواست اصلاح",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

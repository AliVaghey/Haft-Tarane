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
    id: "id",
    header: "تصویر",
    cell: ({ row }) => (
      <div className="flex w-full items-center justify-center">
        <Image
          src={row.original.photo}
          alt=""
          width={160}
          height={90}
          className="aspect-video w-28 rounded-md"
        />
      </div>
    ),
  },
  {
    id: "id",
    header: "شناسه",
    cell: ({ row }) => <span>{row.original.tour.id}</span>,
  },
  {
    id: "agency_name",
    header: "آژانس",
    cell: ({ row }) => <span>{row.original.tour.agency_name}</span>,
  },
  {
    id: "name",
    header: "نام تور",
    cell: ({ row }) => <span>{row.original.tour.title}</span>,
  },
  {
    id: "origin",
    header: "مبدا",
    cell: ({ row }) => <span>{row.original.tour.origin}</span>,
  },
  {
    id: "destination",
    header: "مقصد",
    cell: ({ row }) => <span>{row.original.tour.destination}</span>,
  },

  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

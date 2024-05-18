"use client";

import { jaliliDate } from "@/lib/jalali-date";
import Number from "./number";
import Image from "next/image";
import { defaultCategory } from "@/constants/images";
import CellAction from "./cell-action";

export const columns = [
  {
    id: "#",
    header: "#",
    cell: ({ row }) => {
      return <Number number={row.index + 1} />;
    },
  },
  {
    accessorKey: "image",
    header: "تصویر دسته بندی",
    cell: ({ row }) => {
      return row.original.image ? (
        <Image
          src={row.original.image}
          width={300}
          height={200}
          alt="user"
          className="aspect-video w-24 rounded-lg"
        />
      ) : (
        <Image
          src={defaultCategory}
          width={300}
          height={200}
          alt="user"
          className="aspect-video w-20 rounded-lg"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: "عنوان",
  },
  {
    accessorKey: "productCount",
    header: "تعداد محصول",
  },
  {
    accessorKey: "description",
    header: "توضیحات",
    cell: ({ row }) => (
      <div className="flex gap-1">
        <span>
          {row.original.description && row.original.description.length > 40
            ? row.original.description.substring(0, 40) + "..."
            : row.original.description}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "تاریخ ایجاد",
    cell: ({ row }) => <div>{jaliliDate(row.original.createdAt)}</div>,
  },
  {
    id: "actions",
    header: "اقدامات",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

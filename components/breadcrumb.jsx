"use client";

import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useDictionary } from "@/providers/dictionary-provider";

const BreadcrumbComponent = () => {
  const dictionary = useDictionary();
  const pathname = usePathname();

  let breadcrumbItems = [];

  const getItems = () => {
    let pathItems = pathname.split("/").splice(2);

    pathItems.map((item, index) => {
      breadcrumbItems[index] = {
        title: item,
        link:
          index === 0
            ? `/${item}/`
            : `${breadcrumbItems[index - 1].link}${item}/`,
      };
    });

    return pathItems;
  };

  const items = getItems();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <>
            <BreadcrumbItem
              className={cn(index + 1 === items.length && "text-red-dark")}
            >
              <BreadcrumbLink href={item.link}>
                {dictionary["const"][item.title]}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index + 1 < items.length && (
              <BreadcrumbSeparator>
                <Slash className="-rotate-12" />
              </BreadcrumbSeparator>
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;

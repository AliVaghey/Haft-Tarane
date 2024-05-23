"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { routes } from "@/routes/routes";
import { useParams, usePathname } from "next/navigation";

const tourItems = [
  {
    index: 0,
    title: "مشخصات",
    link: (id) => routes.agency.tours.edit["basic-information"](id),
  },
  {
    index: 1,
    title: "برنامه سفر",
    link: (id) => routes.agency.tours.edit["travel-plans"](id),
  },
  {
    index: 2,
    title: "مدارک",
    link: (id) => routes.agency.tours.edit.documents(id),
  },
  {
    index: 3,
    title: "اقامت",
    link: (id) => routes.agency.tours.edit.hotels(id),
  },
  {
    index: 4,
    title: "تاریخ",
    link: (id) => routes.agency.tours.edit.dates(id),
  },
];

const CreateTourHeader = () => {
  const pathName = usePathname();
  const params = useParams();

  const isCreatePage = pathName.endsWith(routes.agency.tours.create);

  const currentStep = isCreatePage
    ? [tourItems[0]]
    : tourItems.find((item) => pathName.endsWith(item.link(params.id)));

  const isDisableButton = (item, index) => {
    if (isCreatePage && item.title !== "مشخصات") {
      return true;
    }

    if (!isCreatePage) {
      if (index <= currentStep.index) {
        return false;
      } else {
        return true;
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {tourItems.map((item, index) => (
        <Link key={item.title} href={isCreatePage ? "" : item.link(params.id)}>
          <Button
            disabled={isDisableButton(item, index)}
            className="h-8 w-16 text-xs hover:border-2 hover:border-primary hover:bg-transparent 
            disabled:bg-gray-400 md:h-9 md:w-24 md:text-sm lg:w-32"
          >
            {item.title}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default CreateTourHeader;

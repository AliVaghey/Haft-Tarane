"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { routes } from "@/routes/routes";
import { usePathname } from "next/navigation";

const tourItems = [
  {
    index: 0,
    title: "مشخصات",
    link: routes.agency.tours.edit["basic-information"](0),
  },
  {
    index: 1,
    title: "برنامه سفر",
    link: routes.agency.tours.edit["travel-plans"](0),
  },
  {
    index: 2,
    title: "مدارک",
    link: routes.agency.tours.edit.documents(0),
  },
  {
    index: 3,
    title: "اقامت",
    link: routes.agency.tours.edit.hotels(0),
  },
  {
    index: 4,
    title: "تاریخ",
    link: routes.agency.tours.edit.dates(0),
  },
];

const CreateTourHeader = () => {
  const pathName = usePathname();

  const isCreatePage = pathName.endsWith(routes.agency.tours.create);

  const currentStep = isCreatePage
    ? [tourItems[0]]
    : tourItems.find((item) => pathName.endsWith(item.link));

  console.log("currentStep", currentStep);

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
    <div className="flex items-center justify-center gap-6">
      {tourItems.map((item, index) => (
        <Link key={item.title} href={isCreatePage ? "" : item.link}>
          <Button
            disabled={isDisableButton(item, index)}
            className="w-32 text-base hover:border-2 hover:border-primary hover:bg-transparent
            disabled:bg-gray-400"
          >
            {item.title}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default CreateTourHeader;

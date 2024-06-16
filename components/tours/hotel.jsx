"use client";

import HotelCosts from "./hotel-costs";
import { useState } from "react";
import AddHotelPackage from "./add-hotel-package";
import Link from "next/link";
import { Button } from "../ui/button";
import { routes } from "@/routes/routes";
import { useParams } from "next/navigation";

const Hotel = ({ data }) => {
  const [costs, setCosts] = useState(data.costs || []);
  const params = useParams();

  return (
    <div className="">
      <div className="flex flex-col gap-5">
        <AddHotelPackage tour_id={data.tour_id} />
        {costs.map((item, index) => (
          <HotelCosts
            key={item.id}
            data={item}
            number={index + 1}
            tour_id={data.tour_id}
          />
        ))}

        <div className="mt-5 flex flex-col gap-2 md:flex-row">
          <Link href={routes.agency.tours.edit.documents(params.id)}>
            <Button type="button" variant="outline" className="border-primary">
              قبلی
            </Button>
          </Link>
          <Link href={routes.agency.tours.edit.dates(params.id)}>
            <Button type="button" variant="outline" className="border-primary">
              بعدی
            </Button>
          </Link>
          {/* <AddHotelPackage tour_id={data.tour_id} /> */}
        </div>
      </div>
    </div>
  );
};

export default Hotel;

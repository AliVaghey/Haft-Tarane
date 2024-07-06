"use client";

import Link from "next/link";
import AddDate from "./add-date";
import ConfirmTour from "./cconfirm-tour";
import DateCard from "./date-card";
import { Button } from "@/components/ui/button";
import { routes } from "@/routes/routes";
import { useParams } from "next/navigation";

const Dates = ({ data }) => {
  console.log("data", data);
  const params = useParams();
  return (
    <div className="mt-5">
      <div className="flex flex-col gap-2 lg:gap-4">
        {data.dates.map((item, index) => (
          <DateCard
            key={index}
            data={item}
            number={index + 1}
            transportation_type={data.transportation_type}
          />
        ))}

        <div className="mt-2">
          <div className="flex items-center gap-4">
            <Link href={routes.agency.tours.edit.hotels(params.id)}>
              <Button
                type="button"
                variant="outline"
                className="border-primary"
              >
                قبلی
              </Button>
            </Link>
            {(data.transportation_type === "my_transportation" ||
              data.transportation_type === "hotel") && (
              <AddDate tour_id={data.tour_id} />
            )}
          </div>
          <ConfirmTour tour_id={data.tour_id} profit_rate={data.profit_rate} />
        </div>
      </div>
    </div>
  );
};

export default Dates;

"use client";

import Link from "next/link";
import AddTransportation from "./add-tranportation";
import TransportationCard from "./transportation-card";
import { Button } from "../ui/button";
import { routes } from "@/routes/routes";
import { useParams } from "next/navigation";

const Transportation = ({ data }) => {
  const params = useParams();
  return (
    <div className="mt-5">
      <div className="flex flex-col">
        {data.transportations.map((item, index) => (
          <TransportationCard
            key={index}
            data={item}
            number={index + 1}
            lenght={data.transportations.length}
          />
        ))}

        <div className="mt-2 flex items-center gap-4">
          <Link href={routes.agency.tours.edit["basic-information"](params.id)}>
            <Button type="button" variant="outline" className="border-primary">
              قبلی
            </Button>
          </Link>
          <Link href={routes.agency.tours.edit.documents(params.id)}>
            <Button type="button" variant="outline" className="border-primary">
              بعدی
            </Button>
          </Link>
          <AddTransportation tour_id={data.tour_id} />
        </div>
      </div>
    </div>
  );
};

export default Transportation;

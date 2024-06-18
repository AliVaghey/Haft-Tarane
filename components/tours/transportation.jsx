"use client";

import Link from "next/link";
import AddMyTransportation from "./add-my-tranportation";
import TransportationCard from "./transportation-card";
import { Button } from "../ui/button";
import { routes } from "@/routes/routes";
import { useParams } from "next/navigation";
import AddSystemTransportation from "./add-system-tranportation";
import TransportationCardSystem from "./transportation-card-system";

const Transportation = ({ data }) => {
  console.log("dataTransportation", data);
  const params = useParams();
  return (
    <div className="mt-5">
      <div className="flex flex-col">
        {data.transportations.map((item, index) =>
          data.transportation_type === "my_transportation" ? (
            <TransportationCard
              key={index}
              data={item}
              number={index + 1}
              lenght={data.transportations.length}
              staying_nights={data.staying_nights}
            />
          ) : (
            <TransportationCardSystem
              key={index}
              data={item}
              number={index + 1}
              lenght={data.transportations.length}
              staying_nights={data.staying_nights}
            />
          ),
        )}

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
          {data.transportation_type === "my_transportation" ? (
            <AddMyTransportation tour_id={data.tour_id} />
          ) : (
            <AddSystemTransportation tour_id={data.tour_id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Transportation;

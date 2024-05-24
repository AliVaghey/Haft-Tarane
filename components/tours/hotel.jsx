"use client";

import { useTour } from "@/hooks/use-tour";
import HotelCosts from "./hotel-costs";
import { useState } from "react";

const Hotel = ({ data }) => {
  const tourHook = useTour();

  const [hotels, setHotels] = useState(data.Hotels || []);
  const [costs, setCosts] = useState(data.costs || []);

  return (
    <div className="">
      <div className="flex flex-col gap-5">
        {costs.map((item, index) => (
          <HotelCosts
            key={item.id}
            data={item}
            number={index + 1}
            tour_id={data.tour_id}
          />
        ))}
      </div>
    </div>
  );
};

export default Hotel;

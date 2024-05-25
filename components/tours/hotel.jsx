"use client";

import HotelCosts from "./hotel-costs";
import { useState } from "react";
import AddHotelPackage from "./add-hotel-package";

const Hotel = ({ data }) => {
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

        <div>
          <AddHotelPackage tour_id={data.tour_id} />
        </div>
      </div>
    </div>
  );
};

export default Hotel;

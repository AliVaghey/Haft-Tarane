"use client";

import AddTransportation from "./add-tranportation";
import TransportationCard from "./transportation-card";

const Transportation = ({ data }) => {
  console.log("dataqqqqqqqqqqqqqqqqqqqqq", data);
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
          <AddTransportation tour_id={data.tour_id} />
        </div>
      </div>
    </div>
  );
};

export default Transportation;

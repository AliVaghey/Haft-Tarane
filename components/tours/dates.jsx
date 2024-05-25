"use client";

import AddDate from "./add-date";
import DateCard from "./date-card";

const Dates = ({ data }) => {
  return (
    <div className="mt-5">
      <div className="flex flex-col gap-2 lg:gap-4">
        {data.dates.map((item, index) => (
          <DateCard key={index} data={item} number={index + 1} />
        ))}

        <div>
          <AddDate tour_id={data.tour_id} />
        </div>
      </div>
    </div>
  );
};

export default Dates;

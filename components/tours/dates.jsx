"use client";

import AddDate from "./add-date";
import ConfirmTour from "./cconfirm-tour";
import DateCard from "./date-card";

const Dates = ({ data }) => {
  return (
    <div className="mt-5">
      <div className="flex flex-col gap-2 lg:gap-4">
        {data.dates.map((item, index) => (
          <DateCard key={index} data={item} number={index + 1} />
        ))}

        <div className="mt-2 flex items-center gap-4">
          <AddDate tour_id={data.tour_id} />
          <ConfirmTour tour_id={data.tour_id} />
        </div>
      </div>
    </div>
  );
};

export default Dates;

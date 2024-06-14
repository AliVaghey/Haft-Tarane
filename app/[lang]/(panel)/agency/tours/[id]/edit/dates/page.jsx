"use client";

import Dates from "@/components/tours/dates";
import { useTour } from "@/hooks/use-tour";

const DatePage = () => {
  const tourHook = useTour();

  console.log("tourHook.currentTour", tourHook.currentTour);

  return (
    <div className="w-full">
      <Dates
        data={{
          dates: tourHook.currentTour.dates,
          tour_id: tourHook.currentTour.id,
          transportation_type: tourHook.currentTour?.transportation_type,
          profit_rate: tourHook.currentTour.profit_rate,
        }}
      />
    </div>
  );
};

export default DatePage;

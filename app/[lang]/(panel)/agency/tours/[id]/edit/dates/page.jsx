"use client";

import Dates from "@/components/tours/dates";
import { useTour } from "@/hooks/use-tour";

const DatePage = () => {
  const tourHook = useTour();

  return (
    <div className="w-full">
      <Dates
        data={{
          dates: tourHook.currentTour.dates,
          tour_id: tourHook.currentTour.id,
        }}
      />
    </div>
  );
};

export default DatePage;

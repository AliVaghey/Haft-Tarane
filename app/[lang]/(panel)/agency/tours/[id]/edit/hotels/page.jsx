"use client";

import Hotel from "@/components/tours/hotel";
import { useTour } from "@/hooks/use-tour";

const HotelPage = () => {
  const tourHook = useTour();

  return (
    <div className="w-full">
      <Hotel
        data={{
          costs: tourHook.currentTour.costs,
          tour_id: tourHook.currentTour.id,
        }}
      />
    </div>
  );
};

export default HotelPage;

"use client";

import Transportation from "@/components/tours/transportation";
import { useTour } from "@/hooks/use-tour";

const TransportationPage = () => {
  const tourHook = useTour();

  return (
    <div className="w-full">
      <Transportation
        data={{
          transportations: tourHook.currentTour.transportations,
          tour_id: tourHook.currentTour.id,
        }}
      />
    </div>
  );
};

export default TransportationPage;

"use client";

import BasicInformationForm from "@/components/tours/basic-information-form";
import { useTour } from "@/hooks/use-tour";

const BasicInformationPage = () => {
  const tourHook = useTour();

  return (
    <div className="w-full">
      <BasicInformationForm data={tourHook.currentTour} />
    </div>
  );
};

export default BasicInformationPage;

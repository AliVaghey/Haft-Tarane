"use client";

import Document from "@/components/tours/document";
import { useTour } from "@/hooks/use-tour";
import { data } from "autoprefixer";

const DocumentPage = () => {
  const tourHook = useTour();

  return (
    <div className="w-full">
      <Document
        data={{
          ...tourHook.currentTour.certificate,
          tour_id: tourHook.currentTour.id,
        }}
      />
    </div>
  );
};

export default DocumentPage;

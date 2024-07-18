"use client";

import { useDictionary } from "@/providers/dictionary-provider";

const TourPage = ({ searchParams: { from, to, date } }) => {
  const dictionary = useDictionary();

  return (
    <main>
      <div className="min-h-screen bg-yellow-primary pt-16">
        <div className="flex h-screen items-center justify-center">
          <h1 className="animate-pulse text-xl font-bold">به زودی ...</h1>
        </div>
      </div>
    </main>
  );
};

export default TourPage;

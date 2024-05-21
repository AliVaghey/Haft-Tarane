"use client";

import Lottie from "lottie-react";
import groovyWalkAnimation from "@/animations/comming-soon.json";

const CommingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span className="text-lg font-semibold text-muted-foreground">
        در حال راه اندازی...
      </span>
      <Lottie
        animationData={groovyWalkAnimation}
        loop={true}
        className="h-[500px] w-full"
      />
    </div>
  );
};

export default CommingSoon;

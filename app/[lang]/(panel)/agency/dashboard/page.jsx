"use client";

import Lottie from "lottie-react";
import groovyWalkAnimation from "@/animations/dashboard-animation.json";

const AgencyDashboardPage = () => {
  return (
    <div className="flex w-full justify-center">
      <Lottie
        animationData={groovyWalkAnimation}
        loop={true}
        className="h-[570px] w-full"
      />
    </div>
  );
};

export default AgencyDashboardPage;

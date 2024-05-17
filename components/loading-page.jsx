"use client";

import Lottie from "lottie-react";
import groovyWalkAnimation from "@/animations/loading.json";

const LoadingPage = () => {
  return (
    <div className="flex justify-center">
      <Lottie
        animationData={groovyWalkAnimation}
        loop={true}
        className="h-[80px] w-full"
      />
    </div>
  );
};

export default LoadingPage;

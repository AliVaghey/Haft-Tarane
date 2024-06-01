"use client";

import Image from "next/image";
import { runningChita } from "@/constants/images";

const LoadingChita = () => {
  return (
    <div className="flex justify-center">
      <Image
        src={runningChita}
        width={360}
        height={280}
        alt=""
        className="animate h-40 w-80"
      />
    </div>
  );
};

export default LoadingChita;

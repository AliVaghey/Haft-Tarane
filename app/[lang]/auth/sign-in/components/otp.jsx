"use client";

import { useState } from "react";
import OTPPhone from "./otp-phone";
import OTPCode from "./otp-code";

const OTPForm = () => {
  const [isStep2, setIsStep2] = useState(false);

  const changeStep = (status) => {
    setIsStep2(status);
  };

  if (!isStep2) {
    return <OTPPhone changeStep={changeStep} />;
  } else {
    return <OTPCode changeStep={changeStep} />;
  }
};

export default OTPForm;

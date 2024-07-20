"use client";

import SubmitButton from "@/components/submit-button";
import { useState } from "react";

const CellAction = ({ data }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center justify-center gap-1">
      <SubmitButton
        loading={loading}
        variant="ghost"
        className="flex h-8 gap-3 rounded-3xl border-2 border-red-primary text-xs"
      >
        تسویه
      </SubmitButton>
    </div>
  );
};

export default CellAction;

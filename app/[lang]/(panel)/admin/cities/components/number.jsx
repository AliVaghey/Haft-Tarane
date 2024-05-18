"use client";

import { useSearchParams } from "next/navigation";

const Number = ({ number }) => {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 20;

  return (
    <span className="border-l pl-1 text-muted-foreground">
      {number + (page - 1) * perPage}
    </span>
  );
};

export default Number;

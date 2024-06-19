"use client";

import { persianPriceFormat } from "@/lib/persian-price-format";

const CostItems = ({ price, title }) => {
  return (
    <div className="flex flex-1 flex-col items-center  gap-2">
      <div className="flex w-full items-center justify-center bg-white p-3">
        <span className="text-xs">{title}</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-3 px-5">
        <div className="flex w-full items-center justify-center rounded-md bg-white px-5 py-1">
          <span className="text-sm">{persianPriceFormat(price)}</span>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <span className="text-xs">مجموع قیمت :</span>
          <span>{persianPriceFormat(price)} تومان</span>
        </div>
      </div>
    </div>
  );
};

export default CostItems;

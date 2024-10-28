"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import "react-multi-date-picker/styles/colors/yellow.css";
import { useState } from "react";
import { Button } from "../ui/button";

const TourSort = ({ data, onFilter }) => {

  let initialData = data.data;

  // const [initialData, setInitialData] = useState();

  const [priceStatus, setPriceStatus] = useState(false);
  const [dateStatus, setDateStatus] = useState(false);

  const handlePriceStatus = () => {
    var newArray = initialData;
    newArray.sort(function (a, b) {
      if (priceStatus) {
        return b.min_cost - a.min_cost;
      } else {
        return a.min_cost - b.min_cost;
      }
    });
    onFilter(newArray);
    setPriceStatus(!priceStatus);
  };

  const handleDateStatus = () => {
    var newArray = initialData;

    newArray.sort(function (a, b) {
      if (dateStatus) {
        return (
          new Date(b.dates[0].start).getTime() -
          new Date(a.dates[0].start).getTime()
        );
      } else {
        return (
          new Date(a.dates[0].start).getTime() -
          new Date(b.dates[0].start).getTime()
        );
      }
    });
    onFilter(newArray);
    setDateStatus(!dateStatus);
  };

  return (
    <div className="w-full rounded-lg bg-yellow-light p-2.5 text-muted-foreground">
      <div className="grid grid-cols-2">
        <div className="flex items-center justify-center">
          <Button
            className="flex h-full w-full items-center gap-2 bg-transparent"
            onClick={handlePriceStatus}
          >
            <span>قیمت</span>
            {priceStatus ? (
              <ChevronDown size={18} strokeWidth={2} />
            ) : (
              <ChevronUp size={18} strokeWidth={2} />
            )}
          </Button>
        </div>

        <div className="flex items-center justify-center">
          <Button
            className="flex h-full w-full items-center gap-2 bg-transparent"
            onClick={handleDateStatus}
          >
            <span>تاریخ</span>
            {dateStatus ? (
              <ChevronDown size={16} strokeWidth={1.5} />
            ) : (
              <ChevronUp size={16} strokeWidth={1.5} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TourSort;

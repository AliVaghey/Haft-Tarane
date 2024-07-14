"use client";

import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import "react-multi-date-picker/styles/colors/yellow.css";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Label } from "../ui/label";

const TourFilters = ({ data, onFilter }) => {
  console.log("data.data", data.data);

  const tourTypes = ["داخلی", "خارجی", "طبیعت گردی"];
  const initialData = data.data;

  const [filteredData, setFilteredData] = useState([]);

  const [tourType, setTourType] = useState(["داخلی", "خارجی", "طبیعت گردی"]);

  const handleFilter = async (newData) => {
    onFilter(newData);
  };

  const searchHotelName = (value) => {
    let newArray = initialData;
    newArray = newArray.filter((item) =>
      item.costs[0].hotel.name.includes(value),
    );
    setFilteredData(newArray);
    handleFilter(newArray);
  };

  const filterTourType = (tourTypeData) => {
    let tourTypes = initialData;

    let newArray = [];

    // tourTypeData.map((item1)=>{
    //   .trip_type.includes(value)
    // })

    setFilteredData(newArray);
    handleFilter(newArray);

    // setFilteredData(newArray);
    // handleFilter(newArray);
  };

  return (
    <div className="w-full rounded-lg bg-yellow-light p-2.5 text-muted-foreground">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-foreground">فیلتر ها</span>
        <div className="flex items-center gap-2 text-sm">
          <span>حذف فیلتر ها</span>
          <span>
            <X size={16} strokeWidth={1.5} />
          </span>
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <div>
          <Input
            placeholder="جستجو در نام هتل"
            onChange={(e) => searchHotelName(e.target.value)}
          />
        </div>
        <Separator className="my-2 h-0.5 bg-primary" />

        <div className="flex flex-col gap-2">
          <span className="font-semibold text-foreground">مدل های تور</span>
          {tourTypes.map((item) => (
            <div key={item} className="flex gap-2">
              <Checkbox
                id={item}
                checked={tourType.includes(item)}
                onCheckedChange={(e) => {
                  let tourItems = tourType;
                  e
                    ? (tourItems = [...tourItems, item])
                    : (tourItems = tourItems.filter((i) => i !== item));

                  setTourType(tourItems);
                  filterTourType(tourItems);
                }}
              />
              <Label htmlFor={item} className="cursor-pointer text-sm">
                {item}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourFilters;

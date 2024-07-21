"use client";

import { useForm } from "react-hook-form";
import { Star, X } from "lucide-react";
import "react-multi-date-picker/styles/colors/yellow.css";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Label } from "../ui/label";

const tourTypes = ["داخلی", "خارجی", "طبیعت گردی"];
const hotelStars = [5, 4, 3, 2, 1];

const TourFilters = ({ data, onFilter }) => {
  console.log("datafilterpage", data);

  const dNights = data.data.map((item) => item.costs[0]);

  const [initialData, setInitialData] = useState(data.data);
  const [filteredData, setFilteredData] = useState(data.data);

  const [hotelName, setHotelName] = useState("");

  const [filterTourType, setFilterTourType] = useState([
    "داخلی",
    "خارجی",
    "طبیعت گردی",
  ]);

  const [filterHotelStars, setFilterHotelStars] = useState([5, 4, 3, 2, 1]);

  const handleFilter = async (newData) => {
    onFilter(newData);
  };

  const handleHotelName = (value) => {
    console.log("value", value.length);
    console.log("hotelName", hotelName.length);
    let newArray = [];

    if (hotelName.length < value.length) {
      newArray = filteredData;
      console.log("newArray1", newArray);
      newArray = newArray.filter((item) =>
        item.costs[0].hotel.name.includes(value),
      );
    } else {
      newArray = initialData;
      console.log("newArray2", newArray);
      newArray = newArray.filter((item) =>
        item.costs[0].hotel.name.includes(value),
      );
    }

    setHotelName(value);
    setFilteredData(newArray);
    handleFilter(newArray);
  };

  const handleTourType = (values) => {
    let result = [];
    if (values.length < filterTourType.length) {
      let newArray = filteredData;
      result = newArray.filter((item1) =>
        values.some((item2) => item1.trip_type === item2),
      );
    } else {
      let newArray = initialData;
      newArray = newArray.filter((item1) =>
        values.some((item2) => item1.trip_type === item2),
      );
      result = initialData.filter((item1) =>
        newArray.some((item2) => item1.costs[0].id === item2.costs[0].id),
      );
    }
    setFilteredData(result);
    handleFilter(result);
    setFilterTourType(values);
  };

  const handleHotelStars = (values) => {
    console.log("values", values);
    let result = [];
    if (values.length < filterHotelStars.length) {
      let newArray = filteredData;
      result = newArray.filter((item1) =>
        values.some((item2) => item1.costs[0].hotel.stars === item2),
      );
    } else {
      let newArray = initialData;
      newArray = newArray.filter((item1) =>
        values.some((item2) => item1.costs[0].hotel.stars === item2),
      );
      result = initialData.filter((item1) =>
        newArray.some((item2) => item1.costs[0].id === item2.costs[0].id),
      );
    }

    setFilteredData(result);
    handleFilter(result);
    setFilterHotelStars(values);
  };

  const handleNight = (values) => {};

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
            value={hotelName}
            onChange={(e) => handleHotelName(e.target.value)}
          />
        </div>

        <Separator className="my-2 h-0.5 bg-primary" />

        <div className="flex flex-col gap-2">
          <span className="font-semibold text-foreground">مدل های تور</span>
          {tourTypes.map((item) => (
            <div key={item} className="flex gap-2">
              <Checkbox
                id={item}
                checked={filterTourType.includes(item)}
                onCheckedChange={(e) => {
                  let tourItems = filterTourType;
                  e
                    ? (tourItems = [...tourItems, item])
                    : (tourItems = tourItems.filter((i) => i !== item));
                  handleTourType(tourItems);
                }}
              />
              <Label htmlFor={item} className="cursor-pointer text-sm">
                {item}
              </Label>
            </div>
          ))}
        </div>

        <Separator className="my-2 h-0.5 bg-primary" />

        <div className="flex flex-col gap-2">
          <span className="font-semibold text-foreground">ستاره هتل</span>
          {hotelStars.map((item) => (
            <div key={item} className="flex gap-2">
              <Checkbox
                id={item}
                checked={filterHotelStars.includes(item)}
                onCheckedChange={(e) => {
                  let tourItems = filterHotelStars;
                  e
                    ? (tourItems = [...tourItems, item])
                    : (tourItems = tourItems.filter((i) => i !== item));
                  handleHotelStars(tourItems);
                }}
              />
              <Label htmlFor={item} className="cursor-pointer text-sm">
                <div className="flex gap-2">
                  {new Array(+item).fill("").map((item, index) => (
                    <Star
                      key={index}
                      className="text-yellow-primary"
                      size={16}
                      strokeWidth={2.5}
                    />
                  ))}
                </div>
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourFilters;

"use client";

import { Star, X } from "lucide-react";
import "react-multi-date-picker/styles/colors/yellow.css";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { Button } from "../ui/button";

const TourFilters = ({ data, onFilter }) => {
  const [initialData, setInitialData] = useState(
    data.data.map((item) => {
      return item.transportation.length > 0
        ? item.transportation[0].flight
          ? {
              ...item,
              transportationType: "هواپیما",
            }
          : {
              ...item,
              transportationType: item.transportation[0].type,
            }
        : {
            ...item,
            transportationType: "",
          };
    }),
  );

  const [filteredData, setFilteredData] = useState(initialData);

  const removeSimilardata = (array) => {
    const result = [];

    array.map((item1) => {
      let newResult = result.filter((item2) => item1 === item2);
      if (newResult.length === 0) {
        result.push(item1);
      }
    });
    return result;
  };

  const [transportationTypes, setTransportationTypes] = useState(
    removeSimilardata(initialData.map((item) => item.transportationType)),
  );

  const [tourTypes, setTourTypes] = useState(
    removeSimilardata(initialData.map((item) => item.trip_type)),
  );

  const [hotelStars, setHotelStars] = useState(
    removeSimilardata(
      initialData.map((item) => item.costs[0].hotel.stars),
    ).sort(),
  );
  const [stayNight, setStayNight] = useState(
    removeSimilardata(
      initialData.map((item) => item.tour.staying_nights),
    ).sort(),
  );

  const [newPriceArray, setNewPriceArray] = useState(
    initialData.map((item) => item.min_cost),
  );

  const minPrice = Math.min(...newPriceArray);
  const maxPrice = Math.max(...newPriceArray);

  const [hotelName, setHotelName] = useState("");
  const [filterTourType, setFilterTourType] = useState(tourTypes);
  const [filterHotelStars, setFilterHotelStars] = useState(hotelStars);
  const [filterStayNight, setFilterStayNight] = useState(stayNight);
  const [filterTransportationType, setFilterTransportationType] =
    useState(transportationTypes);
  const [priceRange, setPriceRange] = useState([+minPrice, +maxPrice]);
  const [priceRangeState, setPriceRangeState] = useState([
    +minPrice,
    +maxPrice,
  ]);

  const handleFilter = async (newData) => {
    onFilter(newData);
  };

  const handleHotelName = (value) => {
    let newArray = [];

    if (hotelName.length < value.length) {
      newArray = filteredData;
      newArray = newArray.filter((item) =>
        item.costs[0].hotel.name.includes(value),
      );
    } else {
      newArray = initialData;
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

  const handleStayNight = (values) => {
    let result = [];
    if (values.length < filterStayNight.length) {
      let newArray = filteredData;
      result = newArray.filter((item1) =>
        values.some((item2) => item1.tour.staying_nights === item2),
      );
    } else {
      let newArray = initialData;
      newArray = newArray.filter((item1) =>
        values.some((item2) => item1.tour.staying_nights === item2),
      );
      result = initialData.filter((item1) =>
        newArray.some((item2) => item1.costs[0].id === item2.costs[0].id),
      );
    }

    setFilteredData(result);
    handleFilter(result);
    setFilterStayNight(values);
  };

  const handleTransportationType = (values) => {
    let result = [];
    if (values.length < filterTransportationType.length) {
      let newArray = filteredData;
      result = newArray.filter((item1) =>
        values.some((item2) => item1.transportationType === item2),
      );
    } else {
      let newArray = initialData;
      newArray = newArray.filter((item1) =>
        values.some((item2) => item1.transportationType === item2),
      );
      result = initialData.filter((item1) =>
        newArray.some((item2) => item1.costs[0].id === item2.costs[0].id),
      );
    }

    setFilteredData(result);
    handleFilter(result);
    setFilterTransportationType(values);
  };

  const handlePriceRange = (values) => {
    let result = [];
    if (priceRangeState[1] - priceRangeState[0] > values[1] - values[0]) {
      let newArray = filteredData;
      result = newArray.filter(
        (item) => item.min_cost >= values[0] && item.min_cost <= values[1],
      );
    } else {
      let newArray = initialData;
      newArray = newArray.filter(
        (item) => item.min_cost >= values[0] && item.min_cost <= values[1],
      );
      result = initialData.filter((item1) =>
        newArray.some((item2) => item1.costs[0].id === item2.costs[0].id),
      );
    }
    setFilteredData(result);
    handleFilter(result);
    setPriceRangeState(values);
  };

  return (
    <div className="w-full rounded-lg bg-yellow-light p-2.5 text-muted-foreground">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-foreground">فیلتر ها</span>
        <Button
          onClick={() => {
            setFilteredData(initialData);
            handleFilter(initialData);
          }}
          variant="ghost"
          className="flex h-7 items-center gap-2 px-1 text-sm"
        >
          <span>حذف فیلتر ها</span>
          <span>
            <X size={16} strokeWidth={1.5} />
          </span>
        </Button>
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
          <span className="font-semibold text-foreground">نوع تور</span>
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

        <Separator className="my-2 h-0.5 bg-primary" />

        <div className="flex flex-col gap-2">
          <span className="font-semibold text-foreground">تعداد شب اقامت</span>
          {stayNight.map((item) => (
            <div key={item} className="flex gap-2">
              <Checkbox
                id={item}
                checked={filterStayNight.includes(item)}
                onCheckedChange={(e) => {
                  let tourItems = filterStayNight;
                  e
                    ? (tourItems = [...tourItems, item])
                    : (tourItems = tourItems.filter((i) => i !== item));
                  handleStayNight(tourItems);
                }}
              />
              <Label htmlFor={item} className="cursor-pointer text-sm">
                <div className="flex gap-2">{item} شب</div>
              </Label>
            </div>
          ))}
        </div>

        <Separator className="my-2 h-0.5 bg-primary" />

        <div className="flex flex-col gap-2">
          <span className="font-semibold text-foreground">قیمت</span>
          <Slider
            value={priceRange}
            max={+maxPrice}
            min={+minPrice}
            step={10000}
            onValueChange={(e) => setPriceRange(e)}
            onValueCommit={(e) => handlePriceRange(e)}
            thumbCountNumber={2}
          />
          <div className="flex justify-between text-xs">
            <span>{persianPriceFormat(priceRange[1])} تومان</span>
            <span>{persianPriceFormat(priceRange[0])} تومان</span>
          </div>
        </div>

        <Separator className="my-2 h-0.5 bg-primary" />

        <div className="flex flex-col gap-2">
          <span className="font-semibold text-foreground">نوع حمل و نقل</span>
          {transportationTypes.map((item) => (
            <div key={item} className="flex gap-2">
              <Checkbox
                id={item}
                checked={filterTransportationType.includes(item)}
                onCheckedChange={(e) => {
                  let tourItems = filterTransportationType;
                  e
                    ? (tourItems = [...tourItems, item])
                    : (tourItems = tourItems.filter((i) => i !== item));
                  handleTransportationType(tourItems);
                }}
              />
              <Label htmlFor={item} className="cursor-pointer text-sm">
                <div className="flex gap-2">{item}</div>
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourFilters;

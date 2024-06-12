"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axios } from "@/lib/axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import qs from "query-string";

const SearchableSelect = ({
  changeValue,
  placeholder,
  api,
  query,
  defaultValue,
  keyValue,
}) => {
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const [searchState, setSearchState] = useState(defaultValue);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let timeoutId;
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchState]);

  const fetchData = async () => {
    const url = qs.stringifyUrl(
      {
        url: api,
        query: {
          [query]: searchState,
        },
      },
      { skipNull: true },
    );

    console.log("url", url);

    try {
      const res = await axios.get(`${url}`);

      console.log("resselect", res.data);

      setData(res.data.data ? res.data.data : res.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Select
      onValueChange={(e) => {
        console.log("e", e);
        setCurrentValue(e);
        changeValue(e);
      }}
      value={keyValue ? +currentValue : currentValue}
      defaultValue={defaultValue}
    >
      {/* <FormControl> */}
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      {/* </FormControl> */}

      <SelectContent dir="rtl">
        <div>
          <Input
            value={searchState}
            onChange={(e) => {
              setSearchState(e.target.value);
            }}
            type="text"
            placeholder="جستجو..."
            className="rounded-none border-0 border-b border-primary outline-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        {data.length === 0 ? (
          <div className="flex items-center justify-center p-3 text-sm">
            داده ای وجود ندارد
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center p-3 text-sm">
            <Loader2 className="animate-spin text-primary" />
          </div>
        ) : (
          data.map((item) => {
            return (
              <SelectItem
                value={keyValue ? item[keyValue] : item.name}
                key={item.id}
              >
                {item.name || item.title}
              </SelectItem>
            );
          })
        )}
      </SelectContent>
    </Select>
  );
};

export default SearchableSelect;

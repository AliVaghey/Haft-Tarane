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
import { useEffect, useRef, useState } from "react";
import qs from "query-string";

const SearchableSelect = ({
  changeValue,
  placeholder,
  api,
  query,
  defaultValue,
  keyValue,
  searchable,
}) => {
  console.log("defaultValue", defaultValue, api);
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const [searchState, setSearchState] = useState(
    isNaN(defaultValue) ? defaultValue : "",
  );
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    setCurrentValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

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

    try {
      const res = await axios.get(`${url}`);

      console.log("res-select", res.data);

      setData(res.data.data ? res.data.data : res.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Select
      onValueChange={(e) => {
        setCurrentValue(e);
        changeValue(e);
      }}
      value={
        keyValue
          ? isNaN(+currentValue)
            ? currentValue
            : +currentValue
          : currentValue
      }
      // value={defaultValue}
      defaultValue={defaultValue}
    >
      {/* <FormControl> */}
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      {/* </FormControl> */}

      <SelectContent dir="rtl">
        {query && searchable && (
          <div>
            <Input
              ref={inputRef}
              value={searchState}
              onChange={(e) => {
                setSearchState(e.target.value);
              }}
              type="text"
              placeholder="جستجو..."
              className="rounded-none border-0 border-b border-primary outline-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        )}

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
                {item.name || item.title || item.value}
              </SelectItem>
            );
          })
        )}
      </SelectContent>
    </Select>
  );
};

export default SearchableSelect;

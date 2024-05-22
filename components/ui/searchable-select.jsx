"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

const SearchableSelect = ({ changeValue, placeholder, api }) => {
  const [currentValue, setCurrentValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let timeoutId;
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fetchData(searchInput);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  const fetchData = async (q) => {
    try {
      const res = await axios.get(`${api}`);

      setData([
        { name: "مازندران", id: 0 },
        { name: "مشهد", id: 1 },
        { name: "کرمان", id: 2 },
      ]);
      // setData(res.data.data);
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
      value={currentValue}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent dir="rtl">
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder="جستجو..."
          className="rounded-none border-0 border-b border-primary outline-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
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
              <SelectItem value={item.name} key={item.id}>
                {item.name}
              </SelectItem>
            );
          })
        )}
      </SelectContent>
    </Select>
  );
};

export default SearchableSelect;

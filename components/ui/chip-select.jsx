"use client";

import { Input } from "./input";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ChipSelect = ({ initialData, onChange, options }) => {
  const [data, setData] = useState(initialData);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border p-2",
        data && data.length === 0 && "gap-0",
      )}
    >
      <div className="flex flex-wrap gap-2">
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className="flex w-fit items-center gap-1 rounded-sm bg-muted px-2 py-1"
            >
              <span className="text-sm text-muted-foreground">{item}</span>
              <X
                size={13}
                className="cursor-pointer text-muted-foreground"
                onClick={() => {
                  const newValue = data.filter(
                    (filterItem) => item !== filterItem,
                  );
                  onChange(newValue);
                  setData(newValue);
                }}
              />
            </div>
          ))}
      </div>
      <div className="flex gap-2">
        <Select
          onValueChange={(value) => {
            const findIndex = data.findIndex((item) => item === value);
            if (findIndex === -1) {
              const newData = [...data, value];
              setData(newData);
              onChange(newData);
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            {options.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ChipSelect;

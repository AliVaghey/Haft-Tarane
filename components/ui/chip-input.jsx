"use client";

import { Input } from "./input";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ChipInput = ({ initialData, onChange, placeholder }) => {
  const [data, setData] = useState(initialData);
  const [inputState, setInputState] = useState("");

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border p-2",
        data.length === 0 && "gap-0",
      )}
    >
      <div className="flex flex-wrap gap-2">
        {data.map((item, index) => (
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
        <Input
          value={inputState}
          onChange={(e) => setInputState(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (inputState.trim() !== "") {
                const newData = [...data, inputState.trim()];
                onChange(newData);
                setData(newData);
                setInputState("");
              }
            }
          }}
          type="text"
          autoComplete="off"
          placeholder={placeholder}
          className="border border-gray-200"
        />
      </div>
    </div>
  );
};

export default ChipInput;

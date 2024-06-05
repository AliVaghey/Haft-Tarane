"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { airplane1, airplane2, sailboat, train } from "@/constants/icons";
import Image from "next/image";

const tabTriggers = [
  {
    value: "domesticFlight",
    title: "پرواز داخلی",
    icon: airplane1,
    content: <div>aaaaaa</div>,
  },
  {
    value: "internationalFlights",
    title: "پرواز خارجی",
    icon: airplane2,
    content: <div>aaaaaa</div>,
  },
  {
    value: "tour",
    title: "تور",
    icon: sailboat,
    content: <div>aaaaaa</div>,
  },
  {
    value: "train",
    title: "قطار",
    icon: train,
    content: <div>aaaaaa</div>,
  },
];

const FullSearch = () => {
  return (
    <div className="w-full bg-green-500 py-1">
      <div className="flex w-full items-center justify-center">
        <Tabs defaultValue="account" className="p-0">
          <TabsList className="h-fit overflow-hidden rounded-b-none bg-yellow-400 p-0">
            {tabTriggers.map((triggerItem) => (
              <TabsTrigger
                key={triggerItem.value}
                value={triggerItem.value}
                className="flex gap-2 rounded-none bg-gray-background px-6 py-3 text-base text-black"
              >
                <span>
                  <Image
                    src={triggerItem.icon}
                    width={100}
                    height={100}
                    alt="icon"
                    className="h-5 w-5"
                  />
                </span>
                <span>{triggerItem.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabTriggers.map((contentItem) => (
            <TabsContent
              key={contentItem.value}
              value={contentItem.value}
              className="mt-0 bg-white"
            >
              {contentItem.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default FullSearch;

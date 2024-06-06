"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { airplane1, airplane2, sailboat, train } from "@/constants/icons";
import Image from "next/image";
import DomesticFlight from "./domestic-flight";
import Tour from "./tour";

const tabTriggers = [
  {
    value: "domesticFlight",
    title: "پرواز داخلی",
    icon: airplane1,
    content: <DomesticFlight />,
    disabled: false,
  },
  {
    value: "internationalFlights",
    title: "پرواز خارجی",
    icon: airplane2,
    content: <div>aaaaaa</div>,
    disabled: true,
  },
  {
    value: "tour",
    title: "تور",
    icon: sailboat,
    content: <Tour />,
    disabled: false,
  },
  {
    value: "train",
    title: "قطار",
    icon: train,
    content: <div>aaaaaa</div>,
    disabled: true,
  },
];

const FullSearch = () => {
  return (
    <div className="w-full py-1">
      <div className="flex w-full items-center justify-center">
        <Tabs
          defaultValue={tabTriggers[0].value}
          className="w-full px-6 md:px-10 lg:px-40"
        >
          <TabsList className="h-fit overflow-hidden rounded-b-none rounded-t-xl p-0">
            {tabTriggers.map((triggerItem) => (
              <TabsTrigger
                disabled={triggerItem.disabled}
                key={triggerItem.value}
                value={triggerItem.value}
                className="flex gap-2 rounded-none bg-gray-background px-2.5 py-2.5 text-base font-normal text-black data-[state=active]:font-semibold lg:px-7 lg:py-3.5"
              >
                <span>
                  <Image
                    src={triggerItem.icon}
                    width={100}
                    height={100}
                    alt="icon"
                    className="h-4 w-4"
                  />
                </span>
                <span className="text-xs md:text-base">
                  {triggerItem.title}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabTriggers.map((contentItem) => (
            <TabsContent
              key={contentItem.value}
              value={contentItem.value}
              className="mt-0 overflow-hidden rounded-xl rounded-tl-none bg-white"
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

"use client";

import { defaultHotel, effect1, effect2 } from "@/constants/images";
import useMount from "@/hooks/use-mount";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/providers/dictionary-provider";
import { Facebook } from "lucide-react";
import { Linkedin } from "lucide-react";
import { Instagram } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Details = ({ data }) => {
  const dictionary = useDictionary();

  let imageobject = data.gallery;
  let imagesArray = [];

  for (var propName in imageobject) {
    imagesArray.push({
      id: propName,
      url: imageobject[propName],
    });
  }

  const [currentImage, setCurrentImage] = useState(
    imagesArray[0] || {
      url: defaultHotel,
    },
  );

  const mount = useMount();

  if (!mount) {
    return null;
  }

  return (
    <main className="relative min-h-full rounded-lg bg-white p-4">
      <Image
        src={effect2}
        width={100}
        height={100}
        alt="effect"
        className="absolute left-0 top-0"
      />
      <Image
        src={effect1}
        width={200}
        height={200}
        alt="effect"
        className="absolute bottom-0 left-10 md:left-60"
      />
      <div className="mt-20 md:mt-4">
        <h1 className="text-6xl text-red-dark">{data.name}</h1>
      </div>
      <div className="mt-5 flex w-full flex-col rounded-lg lg:flex-row">
        <div className="grid w-1/2 grid-cols-1 gap-1 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold text-red-dark">
              نام آژانس
            </span>
            <span className="text-lg">{data.agency_name}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold text-red-dark">
              عنوان تور
            </span>
            <span className="text-lg">{data.title}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold text-red-dark">نوع تور</span>
            <span className="text-lg">{data.trip_type}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold text-red-dark">ظرفیت</span>
            <span className="text-lg">{data.capacity}</span>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col gap-5">
            <Image
              className="rounded-lg"
              src={currentImage.url}
              width={720}
              height={480}
              alt="product"
            />
            <div className="z-10 grid w-full grid-cols-5 gap-3">
              {imagesArray.map((item) => (
                <div
                  key={item}
                  className={cn(
                    "cursor-pointer rounded-md transition-all duration-300 hover:scale-105",
                    currentImage === item &&
                      "scale-105 ring-1 ring-primary ring-offset-1",
                  )}
                  onClick={() => setCurrentImage(item)}
                >
                  <Image
                    src={item.url}
                    alt="hotel"
                    width={360}
                    height={240}
                    className="aspect-video w-32 rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Details;

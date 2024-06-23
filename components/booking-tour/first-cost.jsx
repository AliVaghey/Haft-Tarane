"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { defaultAirport } from "@/constants/images";
import { Moon, Star, Train, User } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { persianPriceFormat } from "@/lib/persian-price-format";
import { farsiNumber } from "@/lib/farsi-number";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { jaliliDate } from "@/lib/jalali-date";
import { useUser } from "@/hooks/use-user";
import { toast } from "sonner";
import { routes } from "@/routes/routes";

const FirstCost = ({ data }) => {
  console.log("dataooooooooooooppppppppppp", data);
  const router = useRouter();

  const userHook = useUser();

  const searchParams = useSearchParams();

  const handleLink = (values) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ["cid"]: values.cost.id,
      ["start"]: values.date.start,
      ["end"]: values.date.end,
    };

    const url = qs.stringifyUrl(
      {
        url: `${window.location.href.split("?")[0]}/booking`,
        query,
      },
      { skipNull: true },
    );

    console.log("url", url);

    router.push(url);
  };

  return (
    <div className="w-full rounded-lg bg-yellow-dark px-3 py-5">
      <div>
        <Carousel className="mx-auto w-5/6" dir="ltr">
          <CarouselContent>
            {data.hotel.photo.map((img, index) => (
              <CarouselItem key={index}>
                <div className=" relative h-[450px]">
                  <Image
                    src={img}
                    width={720}
                    height={480}
                    alt="hotel"
                    className="mx-auto h-full w-full rounded-lg object-cover"
                  />
                  <div className="absolute bottom-5 right-11 flex flex-col gap-2">
                    <span className="text-xl font-semibold text-white">
                      {data.hotel.name}
                    </span>
                    <div className="flex gap-1 text-yellow-500">
                      {new Array(+data.hotel.star || 5).fill("").map((h, i) => (
                        <Star key={i} />
                      ))}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="mt-3 flex w-full flex-col gap-4">
        <div className="flex flex-col items-center justify-between rounded-lg p-4 md:flex-row">
          <div className="flex flex-col gap-2">
            <span className="font-semibold">مجری تور : {data.agency_name}</span>

            {data.cost.tour.transportation_type === "system" ? (
              <>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>
                    <Train size={18} />
                  </span>
                  <span>{data.transportation[0].flight.airline},</span>
                  <span> {farsiNumber(jaliliDate(data.date.start))}</span>
                  <span>
                    ({farsiNumber(data.transportation[0].flight.time_flight)})
                  </span>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>
                    <Train size={18} />
                  </span>
                  <span>{data.transportation[1].flight.airline},</span>
                  <span> {farsiNumber(jaliliDate(data.date.end))}</span>
                  <span>
                    ({farsiNumber(data.transportation[1].flight.time_flight)})
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>
                    <Train size={18} />
                  </span>
                  <span>{data.transportation[0].company_name},</span>
                  <span> {farsiNumber(jaliliDate(data.date.start))}</span>
                  <span>({farsiNumber(data.transportation[0].start)})</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>
                    <Train size={18} />
                  </span>
                  <span>{data.transportation[1].company_name},</span>
                  <span> {farsiNumber(jaliliDate(data.date.end))}</span>
                  <span>({farsiNumber(data.transportation[1].start)})</span>
                </div>
              </>
            )}

            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex items-center gap-1 rounded-md bg-yellow-300 px-3 py-1.5">
                <Moon size={16} />
                <span>{farsiNumber(data.cost.tour.staying_nights)} شب</span>
              </div>
              <div className="flex items-center gap-1 rounded-md bg-yellow-300 px-3 py-1.5">
                <User size={16} />
                <span>ظرفیت : {farsiNumber(data?.capacity)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <span>مدل های تور :</span>
              {data.cost.tour.tour_styles.map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </div>
          </div>

          <div className="md: mt-3 flex flex-col items-center justify-center gap-2 rounded-lg border-t-2 border-yellow-300 p-2 px-10 shadow-md md:mt-0 md:border-t-0 md:shadow-none">
            <span className="text-sm text-muted-foreground">
              هر بزرگسال در اتاق ۲ نفره
            </span>

            <div className="rounded-lg bg-primary px-8 py-1.5 ">
              {persianPriceFormat(+data.min_cost)} تومان
            </div>
            <Button
              onClick={() => {
                if (userHook.userData) {
                  handleLink(data);
                } else {
                  toast.error("لطفا ابتدا وارد سایت شوید");
                  router.push(routes.auth.signIn);
                }
              }}
              className="h-9 w-36 rounded-lg px-8 hover:bg-yellow-primary"
            >
              رزرو
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4">تور های مشابه</div>
    </div>
  );
};

export default FirstCost;

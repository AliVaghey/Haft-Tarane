"use client";

import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useDictionary } from "@/providers/dictionary-provider";
import { farsiNumber } from "@/lib/farsi-number";
import { useImmer } from "use-immer";
import { Separator } from "@/components/ui/separator";
import { useTourPassengers } from "@/hooks/tour-passengers";
import { useRouter } from "next/navigation";
import { routes } from "@/routes/routes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { persianPriceFormat } from "@/lib/persian-price-format";

const AddPassengers = ({ defaultData }) => {
  console.log("defaultData", defaultData);

  const cost = defaultData.cost;

  const dictionary = useDictionary();

  const tourPassengersHook = useTourPassengers();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState(1);

  const [data, setData] = useImmer([
    {
      roomType: "one_bed",
      plus_bed: 0,
      adult: 1,
      child6: 0,
      child2: 0,
      baby: 0,
    },
  ]);

  const [isMounted, setIsmounted] = useState(false);

  useEffect(() => {
    setIsmounted(true);
  }, []);

  const handleRoomType = useCallback((type, i) => {
    setData((draft) => {
      const room = draft.find((t, index) => index === i);
      room.roomType = type;
    });
  }, []);

  const handlePlus = useCallback((type, i) => {
    setData((draft) => {
      const passenger = draft.find((t, index) => index === i);
      passenger[type] = passenger[type] + 1;
    });
  }, []);

  const handleMines = useCallback((type, i) => {
    setData((draft) => {
      const passenger = draft.find((t, index) => index === i);

      if (type === "adult") {
        if (passenger[type] > 1) {
          passenger[type] = passenger[type] - 1;
        }
      } else {
        if (passenger[type] > 0) {
          passenger[type] = passenger[type] - 1;
        }
      }
    });
  }, []);

  const handleAddRoom = useCallback(() => {
    setData((draft) => {
      draft.push({
        roomType: "one_bed",
        plus_bed: 0,
        adult: 1,
        child6: 0,
        child2: 0,
        baby: 0,
      });
    });
  }, []);

  const handleDeleteRoom = useCallback((i) => {
    setData((draft) => {
      draft.splice(i, 1);
    });
  }, []);

  const nextStep = () => {
    tourPassengersHook.setPassengers(data);
    tourPassengersHook.setTour(defaultData);
    router.push(routes.tours.purchase);
  };

  if (!isMounted) {
    return null;
  }

  if (!defaultData) {
    return (
      <div className="flex flex-col gap-4 rounded-lg p-4 shadow-xl">
        مهلت ارسال فرم اطلاعات مسافران تمام شده است
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg p-4 shadow-xl">
      <Button className="mx-auto w-fit" onClick={() => setIsOpen(true)}>
        انتخاب تعداد مسافران
      </Button>
      <Modal
        title={"مسافران"}
        description={"انتخاب تعداد مسافران"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="flex h-96 flex-col gap-4">
          <ScrollArea className="w-full px-5 py-3" dir="rtl">
            {data.map((room, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="mt-6 flex w-full items-center justify-between rounded-lg bg-yellow-primary bg-opacity-50 p-2 text-lg">
                  اتاق {farsiNumber(index + 1)}
                  {index > 0 && (
                    <Trash2
                      size={20}
                      onClick={() => handleDeleteRoom(index)}
                      className="cursor-pointer text-red-500"
                    />
                  )}
                </div>

                <Select
                  value={data[index].roomType}
                  onValueChange={(e) => handleRoomType(e, index)}
                >
                  <Label className="mt-2">تعداد تخت</Label>
                  <SelectTrigger className=" mb-2 w-full focus:ring-0 focus:ring-offset-0">
                    <SelectValue />
                  </SelectTrigger>
                  <span className="text-xs text-muted-foreground">
                    یک تخته : {persianPriceFormat(cost.one_bed)} تومان
                  </span>
                  <span className="text-xs text-muted-foreground">
                    دو تخته : {persianPriceFormat(cost.two_bed)} تومان
                  </span>
                  <SelectContent className="text-right">
                    <SelectItem value="one_bed">یک تخته</SelectItem>
                    <SelectItem value="two_bed">دو تخته</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">تخت اضافه</span>
                    <span className="text-xs text-muted-foreground">
                      {persianPriceFormat(cost.plus_one)} تومان
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      // disabled={baby >= adult}
                      type="button"
                      className="h-5 w-5 rounded-full p-3"
                      onClick={() => handlePlus("plus_bed", index)}
                    >
                      +
                    </Button>
                    <span>{farsiNumber(room.plus_bed)}</span>
                    <Button
                      // disabled={baby <= 0}
                      type="button"
                      className="h-5 w-5 rounded-full p-3"
                      onClick={() => handleMines("plus_bed", index)}
                    >
                      -
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">بزرگسال</span>
                    <span className="text-xs text-muted-foreground">
                      ۱۲ سال به بالا
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      // disabled={baby >= adult}
                      type="button"
                      className="h-5 w-5 rounded-full p-3"
                      onClick={() => handlePlus("adult", index)}
                    >
                      +
                    </Button>
                    <span>{farsiNumber(room.adult)}</span>
                    <Button
                      // disabled={baby <= 0}
                      type="button"
                      className="h-5 w-5 rounded-full p-3"
                      onClick={() => handleMines("adult", index)}
                    >
                      -
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">کودک ۶ تا ۱۲ سال</span>
                    <span className="text-xs text-muted-foreground">
                      {persianPriceFormat(cost.cld_6)} تومان
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      // disabled={baby >= adult}
                      type="button"
                      className="h-5 w-5 rounded-full p-3"
                      onClick={() => handlePlus("child6", index)}
                    >
                      +
                    </Button>
                    <span>{farsiNumber(room.child6)}</span>
                    <Button
                      // disabled={baby <= 0}
                      type="button"
                      className="h-5 w-5 rounded-full p-3"
                      onClick={() => handleMines("child6", index)}
                    >
                      -
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">کودک ۲ تا ۶ سال</span>
                    <span className="text-xs text-muted-foreground">
                      {persianPriceFormat(cost.cld_2)} تومان
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      // disabled={baby >= adult}
                      type="button"
                      className="h-5 w-5 rounded-full p-3"
                      onClick={() => handlePlus("child2", index)}
                    >
                      +
                    </Button>
                    <span>{farsiNumber(room.child2)}</span>
                    <Button
                      // disabled={baby <= 0}
                      type="button"
                      className="h-5 w-5 rounded-full p-3"
                      onClick={() => handleMines("child2", index)}
                    >
                      -
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">نوزاد</span>
                    <span className="text-xs text-muted-foreground">
                      {persianPriceFormat(cost.baby)} تومان
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      // disabled={baby >= adult}
                      type="button"
                      className="h-5 w-5 rounded-full p-3"
                      onClick={() => handlePlus("baby", index)}
                    >
                      +
                    </Button>
                    <span>{farsiNumber(room.baby)}</span>
                    <Button
                      // disabled={baby <= 0}
                      type="button"
                      className="h-5 w-5 rounded-full p-3"
                      onClick={() => handleMines("baby", index)}
                    >
                      -
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-center">
              <Button
                onClick={() => handleAddRoom()}
                className="mx-auto mt-1 w-fit"
              >
                افزودن اتاق
              </Button>
            </div>
          </ScrollArea>
        </div>

        <div className="mr-2 flex w-full items-center justify-start gap-3 space-x-2 pt-6">
          {/* <Button
            disabled={loading}
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            لغو
          </Button> */}
          <Button
            disabled={loading}
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 "
          >
            <span>بستن</span>
            {loading && (
              <span className="animate-spin">
                <LoaderCircle size={18} strokeWidth={2} />
              </span>
            )}
          </Button>
        </div>
      </Modal>
      <div className="flex flex-col gap-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="w-full rounded-lg border-2 border-yellow-primary p-3"
          >
            <span>اطلاعات اتاق {farsiNumber(index + 1)}</span>
            <Separator className="my-2 h-0.5 bg-yellow-primary" />
            <div className="flex flex-col gap-2">
              {farsiNumber(item.roomType) === "one_bed" && (
                <span>نوع اتاق : یک تخته</span>
              )}
              {farsiNumber(item.roomType) === "two_bed" && (
                <span>نوع اتاق دو تخته</span>
              )}
              <span>{farsiNumber(item.plus_bed)} تخت اضافه</span>
              <span>{farsiNumber(item.adult)} بزرگسال</span>
              <span>{farsiNumber(item.child6)} کودک ۶ تا ۱۲ سال</span>
              <span>{farsiNumber(item.child2)} کودک ۲ تا ۶ سال</span>
              <span>{farsiNumber(item.baby)} نوزاد</span>
            </div>
          </div>
        ))}
      </div>
      <Button onClick={nextStep}>مرحله بعد</Button>
    </div>
  );
};

export default AddPassengers;

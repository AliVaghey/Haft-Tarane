"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTourPassengers } from "@/hooks/tour-passengers";
import { farsiNumber } from "@/lib/farsi-number";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useImmer } from "use-immer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import SubmitButton from "@/components/submit-button";
import ToastError from "@/components/toast/toast-error";
import { toast } from "sonner";
import { CircleCheckBig } from "lucide-react";
import { CSRFToken, axios } from "@/lib/axios";
import querystring from "querystring";
import { useRouter } from "next/navigation";
import { routes } from "@/routes/routes";
import { defaultMessages } from "@/lib/default-messages";
import UserBookInfo from "@/components/booking-tour/user-book-info";
import { Modal } from "@/components/ui/modal";

const TourPurchase = () => {
  const tourPassengersHook = useTourPassengers();

  console.log("tourPassengersHook.tour", tourPassengersHook.tour);

  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  let newData = [];

  const defaultData = tourPassengersHook.passengers;

  defaultData.map((item, index) => {
    let passengersArray = [];

    new Array(item.adult).fill("").map((i) => {
      passengersArray.push({
        type: "adl",
        first_name: "",
        last_name: "",
        national_code: "",
        birth_day: "",
        nationality: "",
        gender: "",
      });
    });

    new Array(item.child6).fill("").map((i) => {
      passengersArray.push({
        type: "cld_6",
        first_name: "",
        last_name: "",
        national_code: "",
        birth_day: "",
        nationality: "",
        gender: "",
      });
    });

    new Array(item.child2).fill("").map((i) => {
      passengersArray.push({
        type: "cld_2",
        first_name: "",
        last_name: "",
        national_code: "",
        birth_day: "",
        nationality: "",
        gender: "",
      });
    });

    new Array(item.baby).fill("").map((i) => {
      passengersArray.push({
        type: "baby",
        first_name: "",
        last_name: "",
        national_code: "",
        birth_day: "",
        nationality: "",
        gender: "",
      });
    });

    newData.push({
      room_type: item.roomType,
      plus_one: item.plus_bed,
      passengers: passengersArray,
    });
  });

  const [loading, setLoading] = useState(false);

  const [data, setData] = useImmer(newData);

  const handleChangeValue = useCallback((index1, index2, type, value) => {
    setData((draft) => {
      draft[index1].passengers[index2][type] = value;
    });
  }, []);

  const onSubmit = async () => {
    setLoading(true);
    console.log("data", data);

    const encodedFormData = querystring.stringify({
      rooms: JSON.stringify(data),
    });

    console.log("encodedFormData", encodedFormData);

    await CSRFToken();

    console.log("first", tourPassengersHook.tour);

    const { tour_id, cost, date } = tourPassengersHook.tour;

    await axios
      .post(
        `/api/user/tour/${tour_id}/date/${date.id}/cost/${cost.id}/reserve`,
        encodedFormData,
      )
      .then((response) => {
        console.log("response", response);
        if (response.status === 201) {
          toast.success(
            <div className="flex items-center gap-2">
              <span>
                <CircleCheckBig className="text-green-600" />
              </span>
              <span>{"تور با موفقیت برای شما رزرو شد"}</span>
            </div>,
          );

          router.push(routes.user.tours.root);
        }
      })
      .catch((error) => {
        console.log("reserve-error", error?.response?.data?.message);
        toast.error(
          <ToastError
            text={
              error?.response?.data?.message ||
              defaultMessages.errors.internalError
            }
          />,
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (tourPassengersHook.passengers.length === 0) {
    return (
      <div className="relative flex min-h-[80vh] flex-col gap-2 bg-primary pt-24 text-center font-semibold">
        <span>مهلت ارسال فرم اطلاعات مسافران تمام شده است</span>
        <span>لطفا مجددا تلاش فرمایید</span>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="relative min-h-[80vh] bg-primary pt-24">
        <div className="flex flex-col gap-5 px-2 pb-5 md:px-28 lg:px-48 xl:px-60">
          {data.map((item, index) => (
            <div key={index} className="flex w-full flex-col">
              <div className="rounded-lg bg-yellow-dark p-3 shadow-lg">
                <span className="font-semibold">
                  اتاق {farsiNumber(index + 1)}
                </span>
                {/* <Separator className="my-2 h-0.5 bg-yellow-primary" /> */}

                <div className="mt-3 flex flex-col gap-3">
                  {item.passengers.map((passenger, index2) => (
                    <div
                      key={index2}
                      className="rounded-lg border-2 border-yellow-primary p-3"
                    >
                      <div className="font-semibold">
                        {passenger.type === "adl" && <span> بزرگسال </span>}
                        {passenger.type === "cld_2" && (
                          <span> کودک ۲ تا ۶ سال </span>
                        )}
                        {passenger.type === "cld_6" && (
                          <span> کودک ۶ تا ۱۲ سال </span>
                        )}
                        {passenger.type === "baby" && <span> نوزاد </span>}
                      </div>

                      <div className="mt-3 grid w-full grid-cols-1 gap-3 md:grid-cols-3">
                        <div className="flex flex-col gap-2">
                          <Label>نام</Label>
                          <Input
                            className="border-yellow-400 bg-yellow-400"
                            placeholder=""
                            value={passenger.first_name}
                            onChange={(e) =>
                              handleChangeValue(
                                index,
                                index2,
                                "first_name",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label>نام خانوادگی</Label>
                          <Input
                            className="border-yellow-400 bg-yellow-400"
                            placeholder=""
                            value={passenger.last_name}
                            onChange={(e) =>
                              handleChangeValue(
                                index,
                                index2,
                                "last_name",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label>کد ملی</Label>
                          <Input
                            className="border-yellow-400 bg-yellow-400"
                            placeholder=""
                            value={passenger.national_code}
                            onChange={(e) =>
                              handleChangeValue(
                                index,
                                index2,
                                "national_code",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label>تاریخ تولد</Label>

                          <DatePicker
                            value={passenger.birth_day}
                            onChange={(date) =>
                              handleChangeValue(
                                index,
                                index2,
                                "birth_day",
                                date,
                              )
                            }
                            format={false ? "MM/DD/YYYY" : "YYYY/MM/DD"}
                            calendar={persian}
                            locale={persian_fa}
                            calendarPosition="bottom-right"
                            // minDate={new Date()}
                            style={{
                              width: "100%",
                              paddingTop: "19px",
                              paddingBottom: "19px",
                              borderColor: "rgb(226 232 240)",
                              backgroundColor: "#FACC15",
                              borderColor: "#FACC15",
                              marginTop: "8px",
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Select
                            value={passenger.nationality}
                            onValueChange={(e) =>
                              handleChangeValue(index, index2, "nationality", e)
                            }
                          >
                            <Label className="mt-2">ملیت</Label>
                            <SelectTrigger className=" mb-2 w-full border-yellow-400 bg-yellow-400 focus:ring-0 focus:ring-offset-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="text-right">
                              <SelectItem value="ایرانی">ایرانی</SelectItem>
                              <SelectItem value="غیر ایرانی">
                                غیر ایرانی
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Select
                            value={passenger.gender}
                            onValueChange={(e) =>
                              handleChangeValue(index, index2, "gender", e)
                            }
                          >
                            <Label className="mt-2">جنسیت</Label>
                            <SelectTrigger className=" mb-2 w-full border-yellow-400 bg-yellow-400 focus:ring-0 focus:ring-offset-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="text-right">
                              <SelectItem value="مرد">مرد</SelectItem>
                              <SelectItem value="زن">زن</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <SubmitButton
            loading={loading}
            // onClick={onSubmit}
            onClick={() => setStep(2)}
            className="mx-auto mt-5 bg-yellow-500 hover:bg-yellow-600"
          >
            ثبت اطلاعات مسافران
          </SubmitButton>
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative min-h-[80vh] bg-primary pt-24">
        <Modal
          title={"رزرو تور"}
          description={"آیا از صحت اطلاعات وارد شده اطمینان دارید؟"}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div className="flex gap-2">
            <SubmitButton
              loading={loading}
              onClick={() => setIsOpen(false)}
              className="h-8 border border-primary bg-transparent hover:bg-yellow-500"
            >
              بستن
            </SubmitButton>
            <SubmitButton
              loading={loading}
              onClick={onSubmit}
              className="h-8 bg-primary hover:bg-yellow-500"
            >
              رزرو
            </SubmitButton>
          </div>
        </Modal>
        <div className="flex flex-col gap-5 px-2 pb-5 md:px-28 lg:px-48 xl:px-60">
          <UserBookInfo
            defaultData={{
              ...tourPassengersHook.tour,
              agency: { name: tourPassengersHook.tour.agency_name },
              passengers: JSON.stringify(data),
              transportation: tourPassengersHook.tour.transportation,
              tour: {
                ...tourPassengersHook.tour.cost.tour,
                certificate: tourPassengersHook.tour.certificate,
              },
            }}
          />
          <div className="mt-5 flex items-center justify-center gap-2">
            <SubmitButton
              loading={loading}
              onClick={() => setStep(1)}
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              تغییر اطلاعات
            </SubmitButton>
            <SubmitButton
              loading={loading}
              // onClick={onSubmit}
              onClick={() => setIsOpen(true)}
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              رزرو
            </SubmitButton>
          </div>
        </div>
      </div>
    );
  }
};

export default TourPurchase;

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useMount from "@/hooks/use-mount";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckBig, Edit } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitButton from "@/components/submit-button";
import { toast } from "sonner";
import { CSRFToken, axios } from "@/lib/axios";
import { useDictionary } from "@/providers/dictionary-provider";
import querystring from "querystring";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import { useState } from "react";
import SearchableSelect from "@/components/ui/searchable-select";
import { Button } from "@/components/ui/button";
import { useTour } from "@/hooks/use-tour";
import { Input } from "@/components/ui/input";
import {
  entransportationSchema,
  transportationSchema,
} from "@/lib/validation/tour/transportation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "../ui/scroll-area";

const EditMyTransportation = ({ data }) => {
  console.log("datatransportation", data);
  const dictionary = useDictionary();

  const tourHook = useTour();

  const [isOpen, setIsOpen] = useState(false);
  const [deviceTypes, setDeviceTypes] = useState(["هواپیما مسافربری"]);
  const [device, setDevice] = useState("airplain");

  const mount = useMount();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa"
        ? transportationSchema
        : entransportationSchema,
    ),
    defaultValues: {
      type: data.type,
      duration: data.duration,
      company_name: data.company_name,
      transportation_type: data.transportation_type,
      origin: data.origin,
      destination: data.destination,
      // start: new Date(),
      // end: new Date(),
      // price: "",
      start: data.start,
      end: data.end,
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    console.log("valuesssssss", values);

    const {
      type,
      duration,
      company_name,
      transportation_type,
      origin,
      destination,
      start,
      end,
      // price,
    } = values;

    const encodedFormData = querystring.stringify({
      type,
      duration,
      company_name,
      transportation_type,
      origin,
      destination,
      // start: DateForm(start),
      // end: DateForm(end),
      // price,
      start,
      end,
    });

    await CSRFToken();

    await axios
      .put(`/api/agency/tour/transportation/${data.id}`, encodedFormData)
      .then((response2) => {
        if (response2.status === 200) {
          toast.success(
            <div className="flex items-center gap-2">
              <span>
                <CircleCheckBig className="text-green-600" />
              </span>
              <span>{"حمل و نقل با موفقیت اضافه شد"}</span>
            </div>,
          );

          tourHook.setFlag(!tourHook.flag);
        }
      })
      .catch((error) => {
        console.log("login-error", error);
        toast.error(
          <ToastError
            text={
              error?.response?.data?.message ||
              defaultMessages.errors.internalError
            }
          />,
        );
      });
  };

  if (!mount) {
    return null;
  }

  return (
    <div className="">
      <Button
        onClick={() => setIsOpen(true)}
        className="flex h-7 items-center gap-1 bg-blue-500 px-2 text-xs text-white hover:bg-blue-700"
      >
        <Edit size={16} strokeWidth={1.5} />
        <span>ویرایش</span>
      </Button>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle className="mr-4 text-right">
              ویرایش حمل و نقل
            </DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="col-span-3 lg:col-span-1">
                        <FormLabel>نوع حمل و نقل</FormLabel>
                        <Select
                          onValueChange={(e) => {
                            if (e === "اتوبوس") {
                              setDeviceTypes(["معمولی", "vip"]);
                              setDevice("bus");
                            }
                            if (e === "هواپیما") {
                              setDeviceTypes(["هواپیما مسافربری"]);
                              setDevice("airplain");
                            }
                            if (e === "قطار") {
                              setDeviceTypes(["۴ تخته", "۶ تخته", "اتوبوسی"]);
                              setDevice("train");
                            }

                            field.onChange(e);
                            setValue("transportation_type", "", {
                              shouldValidate: true,
                            });
                            setValue("company_name", "", {
                              shouldValidate: true,
                            });
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="نوع حمل و نقل" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="هواپیما">هواپیما</SelectItem>
                            <SelectItem value="قطار">قطار</SelectItem>
                            <SelectItem value="اتوبوس">اتوبوس</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem className="col-span-3 lg:col-span-1">
                        <FormLabel>مدت زمان سفر</FormLabel>
                        <FormControl>
                          <Input
                            // type="number"
                            className=""
                            autoComplete="off"
                            placeholder="بر اساس ساعت"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="origin"
                    render={({ field }) => (
                      <FormItem className="col-span-3 text-right lg:col-span-1">
                        <FormLabel>مبدا</FormLabel>
                        <FormControl>
                          <SearchableSelect
                            changeValue={(value) => {
                              field.onChange(value);
                            }}
                            defaultValue={getValues("origin")}
                            api={"/api/cities"}
                            query="name"
                            placeholder={"مبدا"}
                            searchable={true}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem className="col-span-3 text-right lg:col-span-1">
                        <FormLabel>مقصد</FormLabel>
                        <FormControl>
                          <SearchableSelect
                            changeValue={(value) => {
                              field.onChange(value);
                            }}
                            defaultValue={getValues("destination")}
                            api={"/api/cities"}
                            query="name"
                            placeholder={"مقصد"}
                            searchable={true}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="start"
                    render={({ field }) => (
                      <FormItem className="col-span-3 lg:col-span-1">
                        <FormLabel>ساعت حرکت</FormLabel>
                        <FormControl>
                          <Input
                            // type="number"
                            className=""
                            autoComplete="off"
                            placeholder="بر اساس ساعت"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="end"
                    render={({ field }) => (
                      <FormItem className="col-span-3 lg:col-span-1">
                        <FormLabel>ساعت رسیدن</FormLabel>
                        <FormControl>
                          <Input
                            // type="number"
                            className=""
                            autoComplete="off"
                            placeholder="بر اساس ساعت"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="company_name"
                    render={({ field }) => (
                      <FormItem className="col-span-3 lg:col-span-1">
                        <FormLabel>نام شرکت مسافربری</FormLabel>

                        {device === "airplain" && (
                          <FormControl>
                            <SearchableSelect
                              changeValue={(value) => {
                                field.onChange(value);
                              }}
                              defaultValue={getValues("company_name")}
                              api={`/api/options?category=airplain`}
                              // query="name"
                              keyValue="value"
                              searchable={false}
                              placeholder={"نام شرکت مسافربری"}
                            />
                          </FormControl>
                        )}
                        {device === "train" && (
                          <FormControl>
                            <SearchableSelect
                              changeValue={(value) => {
                                field.onChange(value);
                              }}
                              defaultValue={getValues("company_name")}
                              api={`/api/options?category=train`}
                              // query="name"
                              keyValue="value"
                              searchable={false}
                              placeholder={"نام شرکت مسافربری"}
                            />
                          </FormControl>
                        )}
                        {device === "bus" && (
                          <FormControl>
                            <SearchableSelect
                              changeValue={(value) => {
                                console.log("value", value);
                                field.onChange(value);
                              }}
                              defaultValue={getValues("company_name")}
                              api={`/api/options?category=bus`}
                              // query="name"
                              keyValue="value"
                              searchable={false}
                              placeholder={"نام شرکت مسافربری"}
                            />
                          </FormControl>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="transportation_type"
                    render={({ field }) => (
                      <FormItem className="col-span-3 lg:col-span-1">
                        <FormLabel>نوع وسیله نقلیه</FormLabel>
                        <Select
                          disabled={deviceTypes.length === 0}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="نوع حمل و نقل" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {deviceTypes.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <SubmitButton className="mt-3" loading={isSubmitting}>
                  ویرایش
                </SubmitButton>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditMyTransportation;
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
import { CircleCheckBig } from "lucide-react";
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
import {
  assignHotelSchema,
  enAssignHotelSchema,
} from "@/lib/validation/tour/assign-hotel";
import { useTour } from "@/hooks/use-tour";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  persianPriceFormat,
  removeChar,
  separatePrice,
} from "@/lib/persian-price-format";
import { farsiNumber } from "@/lib/farsi-number";

const AddHotelPackage = ({ tour_id }) => {
  const dictionary = useDictionary();

  const tourHook = useTour();

  const [isOpen, setIsOpen] = useState(false);

  const mount = useMount();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? assignHotelSchema : enAssignHotelSchema,
    ),
    defaultValues: {
      hotel_id: "",
      room_type: "",
      one_bed: "",
      two_bed: "",
      plus_one: "",
      cld_6: "",
      cld_2: "",
      baby: "",
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    getValues,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    const {
      hotel_id,
      room_type,
      one_bed,
      two_bed,
      plus_one,
      cld_6,
      cld_2,
      baby,
    } = values;

    const encodedFormData = querystring.stringify({
      hotel_id,
      room_type,
      one_bed: removeChar(",", one_bed),
      two_bed: removeChar(",", two_bed),
      plus_one: removeChar(",", plus_one),
      cld_6: removeChar(",", cld_6),
      cld_2: removeChar(",", cld_2),
      baby: removeChar(",", baby),
    });

    await CSRFToken();

    await axios
      .post(`/api/agency/tour/${tour_id}/cost/${hotel_id}`, encodedFormData)
      .then((response2) => {
        if (response2.status === 201) {
          toast.success(
            <div className="flex items-center gap-2">
              <span>
                <CircleCheckBig className="text-green-600" />
              </span>
              <span>{"هتل با موفقیت اضافه شد"}</span>
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
    <div>
      <Button onClick={() => setIsOpen(true)}>افزودن پکیج</Button>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle className="mr-4 text-right">افزودن هتل</DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={control}
                    name="hotel_id"
                    render={({ field }) => (
                      <FormItem className="col-span-3 text-right lg:col-span-1">
                        <FormLabel>نام هتل</FormLabel>
                        <FormControl>
                          <SearchableSelect
                            changeValue={(value) => {
                              field.onChange(value);
                            }}
                            defaultValue={getValues("hotel_id")}
                            api={"/api/agency/hotels"}
                            query="name"
                            placeholder={"نام هتل"}
                            keyValue={"id"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="room_type"
                    render={({ field }) => (
                      <FormItem className="col-span-3 lg:col-span-1">
                        <FormLabel>نوع اتاق</FormLabel>
                        {/* <FormControl>
                          <Input
                            className=""
                            autoComplete="off"
                            placeholder="حداقل ۲ کاراکتر"
                            {...field}
                          />
                        </FormControl> */}

                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="انتخاب کنید" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="استاندارد">استاندارد</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="one_bed"
                    render={({ field }) => (
                      <FormItem className="col-span-3 lg:col-span-1">
                        <FormLabel>هزینه اتاق یک تخته</FormLabel>
                        <FormControl>
                          <Input
                            // type="number"
                            className=""
                            autoComplete="off"
                            placeholder="قیمت را وارد نمایید"
                            {...field}
                            value={separatePrice(getValues("one_bed"))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="two_bed"
                    render={({ field }) => (
                      <FormItem className="col-span-3 lg:col-span-1">
                        <FormLabel>هزینه اتاق دو تخته</FormLabel>
                        <FormControl>
                          <Input
                            // type="number"
                            className=""
                            autoComplete="off"
                            placeholder="قیمت را وارد نمایید"
                            {...field}
                            value={separatePrice(getValues("two_bed"))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="plus_one"
                    render={({ field }) => (
                      <FormItem className="col-span-3 lg:col-span-1">
                        <FormLabel>هزینه تخت اضافه</FormLabel>
                        <FormControl>
                          <Input
                            // type="number"
                            className=""
                            autoComplete="off"
                            placeholder="قیمت را وارد نمایید"
                            {...field}
                            value={separatePrice(getValues("plus_one"))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="cld_6"
                    render={({ field }) => (
                      <FormItem className="col-span-3 lg:col-span-1">
                        <FormLabel>هزینه برای کودک ۶ تا ۱۲ سال</FormLabel>
                        <FormControl>
                          <Input
                            // type="number"
                            className=""
                            autoComplete="off"
                            placeholder="قیمت را وارد نمایید"
                            {...field}
                            value={separatePrice(getValues("cld_6"))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="cld_2"
                    render={({ field }) => (
                      <FormItem className="col-span-3 lg:col-span-1">
                        <FormLabel>هزینه برای کودک ۲ تا ۶ سال</FormLabel>
                        <FormControl>
                          <Input
                            // type="number"
                            className=""
                            autoComplete="off"
                            placeholder="قیمت را وارد نمایید"
                            {...field}
                            value={separatePrice(getValues("cld_2"))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="baby"
                    render={({ field }) => (
                      <FormItem className="col-span-3 lg:col-span-1">
                        <FormLabel>هزینه نوزاد</FormLabel>
                        <FormControl>
                          <Input
                            // type="number"
                            className=""
                            autoComplete="off"
                            placeholder="قیمت را وارد نمایید"
                            {...field}
                            value={separatePrice(getValues("baby"))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <SubmitButton className="mt-3" loading={isSubmitting}>
                  ارسال
                </SubmitButton>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddHotelPackage;

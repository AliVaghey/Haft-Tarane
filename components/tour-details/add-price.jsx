"use client";

import useMount from "@/hooks/use-mount";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckBig, Trash2 } from "lucide-react";
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
import { useTour } from "@/hooks/use-tour";
import { Input } from "@/components/ui/input";
import {
  datePriceSchema,
  enDatePriceSchema,
} from "@/lib/validation/tour/date-price";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/hooks/use-user";
import { removeChar, separatePrice } from "@/lib/persian-price-format";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { farsiNumber } from "@/lib/farsi-number";
import { jaliliDate } from "@/lib/jalali-date";

const AddPrice = ({ data }) => {
  const dictionary = useDictionary();

  const [isOpen, setIsOpen] = useState(false);

  const userHook = useUser();

  const tourHook = useTour();

  const mount = useMount();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? datePriceSchema : enDatePriceSchema,
    ),
    defaultValues: {
      costId: "",
      dateId: "",

      one_bed: "",
      one_bed_type: "plus",
      two_bed: "",
      two_bed_type: "plus",
      plus_one: "",
      plus_one_type: "plus",
      cld_6: "",
      cld_6_type: "plus",
      cld_2: "",
      cld_2_type: "plus",
      baby: "",
      baby_type: "plus",
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
      one_bed,
      one_bed_type,
      two_bed,
      two_bed_type,
      plus_one,
      plus_one_type,
      cld_6,
      cld_6_type,
      cld_2,
      cld_2_type,
      baby,
      baby_type,
      costId,
      dateId,
    } = values;

    const one_bedPrice = removeChar(",", one_bed);
    const two_bedPrice = removeChar(",", two_bed);
    const plus_onePrice = removeChar(",", plus_one);
    const cld_6Price = removeChar(",", cld_6);
    const cld_2Price = removeChar(",", cld_2);
    const babyPrice = removeChar(",", baby);

    const encodedFormData = querystring.stringify({
      one_bed: one_bed_type === "plus" ? +one_bedPrice : +one_bedPrice * -1,
      two_bed: two_bed_type === "plus" ? +two_bedPrice : +two_bedPrice * -1,
      plus_one: plus_one_type === "plus" ? +plus_onePrice : +plus_onePrice * -1,
      cld_6: cld_6_type === "plus" ? +cld_6Price : +cld_6Price * -1,
      cld_2: cld_2_type === "plus" ? +cld_2Price : +cld_2Price * -1,
      baby: baby_type === "plus" ? +babyPrice : +babyPrice * -1,
    });

    console.log("encodedFormData", encodedFormData);

    await CSRFToken();

    console.log("dateId", dateId);

    await axios
      .post(
        getValues("costId") === "0"
          ? `/api/agency/date/${dateId}/price-change`
          : `/api/agency/date/${dateId}/cost/${costId}/price-change`,
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
              <span>{"قیمت با موفقیت تغییر کرد"}</span>
            </div>,
          );

          setIsOpen(false);
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
      <Button onClick={() => setIsOpen(true)} className="h-8 w-fit">
        افزودن
      </Button>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle className="mr-4 text-right">افزودن</DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid max-h-[500px] grid-cols-1 gap-2 overflow-y-auto md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="costId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>انتخاب هتل</FormLabel>
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
                            <SelectItem value={String(0)}>
                              همه هتل ها
                            </SelectItem>
                            {data.costs.map((item, index) => (
                              <SelectItem key={index} value={String(item.id)}>
                                {item.hotel.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>انتخاب تاریخ</FormLabel>
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
                            {data.dates.map((item, index) => (
                              <SelectItem key={index} value={String(item.id)}>
                                از {farsiNumber(jaliliDate(item.start))} تا
                                {"  "}
                                {farsiNumber(jaliliDate(item.end))}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* one_bed_type */}
                  <FormField
                    control={control}
                    name="one_bed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>یک تخته</FormLabel>
                        <FormControl>
                          <Input
                            disabled={
                              userHook.userData.access_type !== "agency"
                            }
                            className=""
                            autoComplete="off"
                            placeholder="حداقل ۱"
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
                    name="one_bed_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نوع</FormLabel>
                        <Select
                          disabled={userHook.userData.access_type !== "agency"}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="انتخاب کنید" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="plus">افزایش</SelectItem>
                            <SelectItem value="mines">کاهش</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* two_bed_type */}
                  <FormField
                    control={control}
                    name="two_bed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>دو تخته</FormLabel>
                        <FormControl>
                          <Input
                            disabled={
                              userHook.userData.access_type !== "agency"
                            }
                            className=""
                            autoComplete="off"
                            placeholder="حداقل ۱"
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
                    name="two_bed_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نوع</FormLabel>
                        <Select
                          disabled={userHook.userData.access_type !== "agency"}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="انتخاب کنید" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="plus">افزایش</SelectItem>
                            <SelectItem value="mines">کاهش</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* plus_one_type */}
                  <FormField
                    control={control}
                    name="plus_one"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>تخت اضافه</FormLabel>
                        <FormControl>
                          <Input
                            disabled={
                              userHook.userData.access_type !== "agency"
                            }
                            className=""
                            autoComplete="off"
                            placeholder="حداقل ۱"
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
                    name="plus_one_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نوع</FormLabel>
                        <Select
                          disabled={userHook.userData.access_type !== "agency"}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="انتخاب کنید" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="plus">افزایش</SelectItem>
                            <SelectItem value="mines">کاهش</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* cld_6_type */}
                  <FormField
                    control={control}
                    name="cld_6"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>کودک ۶ تا ۱۲ سال</FormLabel>
                        <FormControl>
                          <Input
                            disabled={
                              userHook.userData.access_type !== "agency"
                            }
                            className=""
                            autoComplete="off"
                            placeholder="حداقل ۱"
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
                    name="cld_6_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نوع</FormLabel>
                        <Select
                          disabled={userHook.userData.access_type !== "agency"}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="انتخاب کنید" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="plus">افزایش</SelectItem>
                            <SelectItem value="mines">کاهش</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* cld_2_type */}
                  <FormField
                    control={control}
                    name="cld_2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>کودک ۲ تا ۶ سال</FormLabel>
                        <FormControl>
                          <Input
                            disabled={
                              userHook.userData.access_type !== "agency"
                            }
                            className=""
                            autoComplete="off"
                            placeholder="حداقل ۱"
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
                    name="cld_2_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نوع</FormLabel>
                        <Select
                          disabled={userHook.userData.access_type !== "agency"}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="انتخاب کنید" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="plus">افزایش</SelectItem>
                            <SelectItem value="mines">کاهش</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* baby_type */}
                  <FormField
                    control={control}
                    name="baby"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نوزاد</FormLabel>
                        <FormControl>
                          <Input
                            disabled={
                              userHook.userData.access_type !== "agency"
                            }
                            className=""
                            autoComplete="off"
                            placeholder="حداقل ۱"
                            {...field}
                            value={separatePrice(getValues("baby"))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="baby_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نوع</FormLabel>
                        <Select
                          disabled={userHook.userData.access_type !== "agency"}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="انتخاب کنید" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="plus">افزایش</SelectItem>
                            <SelectItem value="mines">کاهش</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <SubmitButton
                  disabled={userHook.userData.access_type !== "agency"}
                  className="mt-3"
                  loading={isSubmitting}
                >
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

export default AddPrice;

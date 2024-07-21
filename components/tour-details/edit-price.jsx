"use client";

import useMount from "@/hooks/use-mount";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckBig, Edit, Trash2 } from "lucide-react";
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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { farsiNumber } from "@/lib/farsi-number";
import { jaliliDate } from "@/lib/jalali-date";

const EditPrice = ({ data }) => {
  console.log("datapopop", data);

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
      costId: "0",
      dateId: "0",

      one_bed: String(Math.abs(+data.one_bed)),
      one_bed_type: +data.one_bed >= 0 ? "plus" : "mines",
      two_bed: String(Math.abs(+data.two_bed)),
      two_bed_type: +data.two_bed >= 0 ? "plus" : "mines",
      plus_one: String(Math.abs(+data.plus_one)),
      plus_one_type: +data.plus_one >= 0 ? "plus" : "mines",
      cld_6: String(Math.abs(+data.cld_6)),
      cld_6_type: +data.cld_6 >= 0 ? "plus" : "mines",
      cld_2: String(Math.abs(+data.cld_2)),
      cld_2_type: +data.cld_2 >= 0 ? "plus" : "mines",
      baby: String(Math.abs(+data.baby)),
      baby_type: +data.baby >= 0 ? "plus" : "mines",
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

    await axios
      .put(`/api/agency/price-change/${data.id}`, encodedFormData)
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
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
            <DialogTitle className="mr-4 text-right">ویرایش</DialogTitle>
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
                          defaultValue={"0"}
                          disabled
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="انتخاب کنید" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={"0"}>
                              {data.hotel_name}
                            </SelectItem>
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
                          defaultValue={"0"}
                          disabled
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="انتخاب کنید" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={"0"}>
                              از {farsiNumber(jaliliDate(data.start))} تا
                              {"  "}
                              {farsiNumber(jaliliDate(data.end))}
                            </SelectItem>
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

export default EditPrice;

"use client";

import useMount from "@/hooks/use-mount";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheckBig, Trash2 } from "lucide-react";
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

const DetailsPrice = ({ data }) => {
  console.log("datagggggggggg", data);

  const dictionary = useDictionary();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const userHook = useUser();

  const tourHook = useTour();

  const mount = useMount();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? datePriceSchema : enDatePriceSchema,
    ),
    defaultValues: {
      price_change: "",
      type: "plus",
      costId: "",
      dateId: "",
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

    const { price_change, type, costId, dateId } = values;

    const newPrice = removeChar(",", price_change);

    const encodedFormData = querystring.stringify({
      price_change: type === "plus" ? +newPrice : +newPrice * -1,
    });

    console.log("encodedFormData", encodedFormData);

    await CSRFToken();
    ("");
    await axios
      .post(
        `/api/agency/date/${dateId}/cost/${costId}/price-change`,
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

  const onDelete = async (id) => {
    try {
      setLoading(true);

      await CSRFToken();

      const response = await axios.delete(`/api/agency/price-change/${id}`);

      console.log("responsewwwwwwwww", response);

      if (response.status === 204) {
        console.log("first");
        router.refresh();
        toast.success(
          <div className="flex items-center gap-2">
            <span>
              <CircleCheckBig className="text-green-600" />
            </span>
            <span>{"نرخ مورد نظر حذف شد"}</span>
          </div>,
        );
        tourHook.setFlag(!tourHook.flag);
      }
      if (response.status === 200) {
        toast.error(
          <div className="flex items-center gap-2">
            <span>
              <CircleAlert className="text-primary" />
            </span>
            <span>{response.message}</span>
          </div>,
        );
      }
    } catch (error) {
      console.log("error", error);
      toast.error("مشکلی پیش آمده است. لطفا مجددا تلاش فرمایید");
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  if (!mount) {
    return null;
  }

  return (
    <div className="mb-5 flex min-h-96 flex-col gap-5 rounded-lg bg-white p-3 lg:gap-2">
      <div className="flex flex-col gap-2">
        {data.price_changes.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-5">
              <span>هتل : {item.hotel_name}</span>
              <span>
                تاریخ : از {farsiNumber(jaliliDate(item.start))} تا
                {"  "}
                {farsiNumber(jaliliDate(item.end))}
              </span>
            </div>

            <SubmitButton
              disabled={userHook.userData.access_type !== "agency"}
              loading={loading}
              variant="ghost"
              className="h-7 w-fit cursor-pointer px-3 text-red-primary hover:text-red-primary"
              onClick={() => onDelete(item.id)}
            >
              <Trash2 size={16} strokeWidth={2} />
            </SubmitButton>
          </div>
        ))}
      </div>

      <Button onClick={() => setIsOpen(true)} className="w-fit">
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
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
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
                        <FormLabel>انتخاب انتخاب تاریخ</FormLabel>
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

                  <FormField
                    control={control}
                    name="price_change"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>قیمت</FormLabel>
                        <FormControl>
                          <Input
                            disabled={
                              userHook.userData.access_type !== "agency"
                            }
                            className=""
                            autoComplete="off"
                            placeholder="حداقل ۱"
                            {...field}
                            value={separatePrice(getValues("price_change"))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="type"
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

export default DetailsPrice;

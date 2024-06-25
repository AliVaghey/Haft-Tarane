"use client";

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

const DatePrice = ({ date }) => {
  const dictionary = useDictionary();

  const userHook = useUser();

  const tourHook = useTour();

  const mount = useMount();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? datePriceSchema : enDatePriceSchema,
    ),
    defaultValues: {
      price_change:
        +date.price_change > 0
          ? String(+date.price_change)
          : String(+date.price_change * -1),
      type: +date.price_change > 0 ? "plus" : "mines",
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

    const { price_change, type } = values;

    const newPrice = removeChar(",", price_change);

    const encodedFormData = querystring.stringify({
      price_change: type === "plus" ? +newPrice : +newPrice * -1,
    });

    console.log("encodedFormData", encodedFormData);

    await CSRFToken();

    await axios
      .post(`/api/agency/date/${date.id}/price-change`, encodedFormData)
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
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <FormField
                control={control}
                name="price_change"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>قیمت</FormLabel>
                    <FormControl>
                      <Input
                        disabled={userHook.userData.access_type !== "agency"}
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
    </div>
  );
};

export default DatePrice;

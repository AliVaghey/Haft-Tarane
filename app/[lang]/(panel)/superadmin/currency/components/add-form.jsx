"use client";

import { Input } from "@/components/ui/input";
import useMount from "@/hooks/use-mount";
import { routes } from "@/routes/routes";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { axios } from "@/lib/axios";
import { useDictionary } from "@/providers/dictionary-provider";
import querystring from "querystring";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";

import { Separator } from "@/components/ui/separator";

import ToastSuccess from "@/components/toast/toast-success";
import {
  adminCurrencySchema,
  enAdminCurrencySchema,
} from "@/lib/validation/auth/currency";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading-page";

const AddForm = () => {
  const dictionary = useDictionary();
  const [isLoading, setIsLoading] = useState(true);
  const mount = useMount();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa"
        ? adminCurrencySchema
        : enAdminCurrencySchema,
    ),
    defaultValues: {
      usd: "",
      aed: "",
      eur: "",
    },
    mode: "onSubmit",
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    getValues,
    control,
    formState: { isSubmitting },
  } = form;

  const onLoadData = async () => {
    await axios
      .get("/api/admin/currency-units")
      .then(async (response) => {
        reset({
          usd: String(response?.data?.usd),
          aed: String(response?.data?.aed),
          eur: String(response?.data?.eur),
        });
        setIsLoading(false);
      })
      .catch((error) => {
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

  useEffect(() => {
    onLoadData();
  }, []);

  const onSubmit = async (values) => {
    const encodedFormData = querystring.stringify({
      usd: values.usd,
      aed: values.aed,
      eur: values.eur,
    });

    await axios
      .post("/api/admin/currency-units", encodedFormData)
      .then(async (response) => {
        toast.success(<ToastSuccess text="درخواست شما موفق امیز بود" />);
      })
      .catch((error) => {
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

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div className="mx-auto w-full">
      <div className="mx-auto flex w-full items-center gap-3 md:w-2/3 lg:w-1/3">
        <Separator className="h-0.5 flex-1 bg-red-dark" />
        <span className="text-xl">ثبت قیمت ارز ها</span>
        <Separator className="h-0.5 flex-1 bg-red-dark" />
      </div>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 grid grid-cols-1 gap-8"
        >
          <div className="flex flex-col gap-2">
            <FormField
              control={control}
              name="usd"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel className="text-muted-foreground">
                    دلار (USD)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-lg shadow-lg"
                      autoComplete="off"
                      placeholder="حداقل ۲ کاراکتر"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-primary" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="eur"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel className="text-muted-foreground">
                    یورو (EUR)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-lg shadow-lg"
                      autoComplete="off"
                      placeholder="حداقل ۲ کاراکتر"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-primary" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="aed"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel className="text-muted-foreground">
                    درهم امارات (AED)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-lg shadow-lg"
                      autoComplete="off"
                      placeholder="حداقل ۲ کاراکتر"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-primary" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full items-center justify-center">
            <SubmitButton
              className="mt-3 w-24 bg-gradient-to-r from-primary to-yellow-light transition-all duration-200 hover:shadow-lg"
              loading={isSubmitting}
            >
              ارسال
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddForm;

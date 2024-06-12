"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useMount from "@/hooks/use-mount";
import { routes } from "@/routes/routes";
import { usePathname, useRouter } from "next/navigation";
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
import {
  addProfitRateSchema,
  enAddProfitRateSchema,
} from "@/lib/validation/admin/profite-rate";

const EditForm = ({ data }) => {
  const dictionary = useDictionary();

  const mount = useMount();
  const pathname = usePathname();
  const router = useRouter();

  const isAddPage = pathname.endsWith(
    routes.superadmin["profit-rates"].edit(data.id),
  );

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa"
        ? addProfitRateSchema
        : enAddProfitRateSchema,
    ),
    defaultValues: {
      name: data.name,
      rate: data.rate,
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    console.log("values", values);

    const encodedFormData = querystring.stringify({
      name: values.name,
      rate: values.rate,
    });

    await CSRFToken();

    await axios
      .put(`/api/admin/profit-rate/${data.id}`, encodedFormData)
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            <div className="flex items-center gap-2">
              <span>
                <CircleCheckBig className="text-green-600" />
              </span>
              <span>{"نرخ کمیسیون با موفقیت ویرایش شد"}</span>
            </div>,
          );

          router.push(routes.superadmin["profit-rates"].root);
          router.refresh();
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
    <Dialog
      open={isAddPage}
      onOpenChange={() => router.push(routes.superadmin["profit-rates"].root)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mr-4 text-right">
            ویرایش نرخ کمیسیون
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>عنوان</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-2xl"
                        autoComplete="off"
                        placeholder="حداقل ۱ کاراکتر"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="rate"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>نرخ کمیسیون</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="rounded-2xl"
                        autoComplete="off"
                        placeholder="حداقل ۱"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton className="mt-3" loading={isSubmitting}>
                ارسال
              </SubmitButton>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditForm;

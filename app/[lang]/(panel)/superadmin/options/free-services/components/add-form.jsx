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
  enTourStylesSchema,
  tourStylesSchema,
} from "@/lib/validation/superadmin/tour-styles";

const AddForm = () => {
  const dictionary = useDictionary();

  const mount = useMount();
  const pathname = usePathname();
  const router = useRouter();

  const isAddPage = pathname.endsWith(
    routes.superadmin.options["free-services"].add,
  );

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? tourStylesSchema : enTourStylesSchema,
    ),
    defaultValues: {
      value: "",
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
    console.log("values", values);
    const { value } = values;

    const encodedFormData = querystring.stringify({
      value,
      category: "free_services",
    });

    await CSRFToken();

    await axios
      .post("api/admin/option", encodedFormData)
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            <div className="flex items-center gap-2">
              <span>
                <CircleCheckBig className="text-green-600" />
              </span>
              <span>{"سرویس مورد نیاز با موفقیت اضافه شد"}</span>
            </div>,
          );

          router.push(routes.superadmin.options["free-services"].root);
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
      onOpenChange={() =>
        router.push(routes.superadmin.options["free-services"].root)
      }
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mr-4 text-right">
            افزودن سرویس رایگان
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={control}
                name="value"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>عنوان</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="حداقل ۲ کاراکتر"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SubmitButton className="mt-3 w-16" loading={isSubmitting}>
                ارسال
              </SubmitButton>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddForm;

"use client";

import { Input } from "@/components/ui/input";
import useMount from "@/hooks/use-mount";
import { routes } from "@/routes/routes";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitButton from "@/components/submit-button";
import { toast } from "sonner";
import { citySchema, enCitySchema } from "@/lib/validation/auth/city";
import { CSRFToken, axios } from "@/lib/axios";
import { useDictionary } from "@/providers/dictionary-provider";
import querystring from "querystring";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import ChipInput from "@/components/ui/chip-input";
import {
  basicInformationSchema,
  enBasicInformationSchema,
} from "@/lib/validation/tour/basic-information";
import { Checkbox } from "@/components/ui/checkbox";
import SearchableSelect from "@/components/ui/searchable-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ToastSuccess from "@/components/toast/toast-success";
import { Textarea } from "@/components/ui/textarea";
import {
  documentSchema,
  endocumentSchema,
} from "@/lib/validation/tour/document";

const Document = () => {
  const dictionary = useDictionary();
  const mount = useMount();
  const router = useRouter();
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? documentSchema : endocumentSchema,
    ),
    defaultValues: {
      free_services: [],
      certificates: [],
      descriptions: "",
      cancel_rules: "",
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

  const onSubmit = async (values) => {
    const { free_services, certificates, descriptions, cancel_rules } = values;

    await CSRFToken();

    const encodedFormData = querystring.stringify({
      tour_id: params.id,
      free_services: JSON.stringify(free_services),
      certificates: JSON.stringify(certificates),
      descriptions,
      cancel_rules,
    });

    console.log("values", values);

    await axios
      .post("/api/agency/tour/certificates", encodedFormData)
      .then((response) => {
        console.log("certificates-response", response.data);

        if (response.status === 204) {
          toast.success(<ToastSuccess text={"مدارک با موفقیت اضافه شدند"} />);
          router.push(routes.agency.tours.edit.hotels(params.id));
        }
      })
      .catch((error) => {
        console.log("certificates-error", error);
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
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
          <FormField
            control={control}
            name="free_services"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-1">
                <FormLabel>سرویس های رایگان</FormLabel>
                <FormControl>
                  <ChipInput
                    initialData={getValues("free_services")}
                    placeholder="تایپ کنید..."
                    onChange={(data) => {
                      console.log("data", data);
                      setValue("free_services", data, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="certificates"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-1">
                <FormLabel>مدارک همراه</FormLabel>
                <FormControl>
                  <ChipInput
                    initialData={getValues("certificates")}
                    placeholder="تایپ کنید..."
                    onChange={(data) => {
                      console.log("data", data);
                      setValue("certificates", data, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="descriptions"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>توضیحات</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="توضیحات"
                    className="h-32 resize-y focus-visible:ring-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="cancel_rules"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>قوانین کنسلی</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="قوانین کنسلی"
                    className="h-32 resize-y focus-visible:ring-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />
        </div>

        <SubmitButton className="mt-3" loading={isSubmitting}>
          ارسال
        </SubmitButton>
      </form>
    </Form>
  );
};

export default Document;
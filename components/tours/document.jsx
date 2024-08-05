"use client";

import { Input } from "@/components/ui/input";
import useMount from "@/hooks/use-mount";
import { routes } from "@/routes/routes";
import { useParams, useRouter } from "next/navigation";
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
import { CSRFToken, axios } from "@/lib/axios";
import { useDictionary } from "@/providers/dictionary-provider";
import querystring from "querystring";
import ToastError from "@/components/toast/toast-error";
import { defaultMessages } from "@/lib/default-messages";
import ChipInput from "@/components/ui/chip-input";
import ToastSuccess from "@/components/toast/toast-success";
import { Textarea } from "@/components/ui/textarea";
import {
  documentSchema,
  endocumentSchema,
} from "@/lib/validation/tour/document";
import { useTour } from "@/hooks/use-tour";
import Link from "next/link";
import { Button } from "../ui/button";
import ChipSearchableSelect from "../ui/chip-searchable-select";

const Document = ({ data }) => {
  console.log("datahjhj", data);
  const tourHook = useTour();

  const dictionary = useDictionary();

  const mount = useMount();
  const router = useRouter();
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? documentSchema : endocumentSchema,
    ),
    defaultValues: {
      free_services: data.free_services ? data.free_services : [],
      certificates: data.certificates ? data.certificates : [],
      tab_descriptions: data.tab_descriptions ? data.tab_descriptions : [],
      descriptions: data.descriptions ? data.descriptions : "",
      cancel_rules: data.cancel_rules ? data.cancel_rules : "",
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
    const {
      free_services,
      certificates,
      tab_descriptions,
      descriptions,
      cancel_rules,
    } = values;

    await CSRFToken();

    const encodedFormData = querystring.stringify({
      tour_id: data.tour_id,
      free_services: JSON.stringify(free_services),
      certificates: JSON.stringify(certificates),
      tab_descriptions: JSON.stringify(tab_descriptions),
      descriptions,
      cancel_rules,
    });

    console.log("values", values);

    await axios
      .post("/api/agency/tour/certificates", encodedFormData)
      .then(async (response) => {
        console.log("certificates-response", response.data);

        if (response.status === 204) {
          await tourHook.setFlag(!tourHook.flag);
          toast.success(<ToastSuccess text={"مدارک با موفقیت اضافه شدند"} />);

          // router.push(routes.agency.tours.edit.hotels(params.id));
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
                  <ChipSearchableSelect
                    api={`/api/options?category=free_services`}
                    initialData={getValues("free_services")}
                    placeholder="امکانات"
                    query="name"
                    keyValue="value"
                    searchable={false}
                    onChange={(data) => {
                      console.log("free_services", data);
                      setValue("free_services", data, { shouldValidate: true });
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
                  <ChipSearchableSelect
                    api={`/api/options?category=certificates`}
                    initialData={getValues("certificates")}
                    placeholder="امکانات"
                    query="name"
                    keyValue="value"
                    searchable={false}
                    onChange={(data) => {
                      console.log("certificates", data);
                      setValue("certificates", data, { shouldValidate: true });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="tab_descriptions"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-2">
                <FormLabel>توضیحات تور</FormLabel>
                <FormControl>
                  <ChipSearchableSelect
                    api={`/api/options?category=tour_descriptions`}
                    initialData={getValues("tab_descriptions")}
                    placeholder="توضیحات تور"
                    query="name"
                    keyValue="value"
                    searchable={false}
                    onChange={(data) => {
                      console.log("tab_descriptions", data);
                      setValue("tab_descriptions", data, {
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
              <FormItem className="col-span-2 lg:col-span-1">
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
              <FormItem className="col-span-2 lg:col-span-1">
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
        <div className="mt-5 flex flex-col gap-2 md:flex-row">
          <Link href={routes.agency.tours.edit["travel-plans"](params.id)}>
            <Button type="button" variant="outline" className="border-primary">
              قبلی
            </Button>
          </Link>
          <Link href={routes.agency.tours.edit.hotels(params.id)}>
            <Button type="button" variant="outline" className="border-primary">
              بعدی
            </Button>
          </Link>
          <SubmitButton loading={isSubmitting}>ارسال</SubmitButton>
        </div>
      </form>
    </Form>
  );
};

export default Document;

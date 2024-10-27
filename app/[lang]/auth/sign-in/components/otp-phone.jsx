"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import SubmitButton from "@/components/submit-button";
import { useDictionary } from "@/providers/dictionary-provider";
import { axios } from "@/lib/axios";
import querystring from "querystring";
import ToastSuccess from "@/components/toast/toast-success";
import { defaultMessages } from "@/lib/default-messages";
import ToastError from "@/components/toast/toast-error";
import {
  enOtpPhoneSchema,
  otpPhoneSchema,
} from "@/lib/validation/auth/otp-phone";

const OTPPhone = ({ changeStep }) => {
  const dictionary = useDictionary();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? otpPhoneSchema : enOtpPhoneSchema,
    ),
    defaultValues: {
      phone: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = async (values) => {
    const { phone } = values;

    

    const encodedFormData = querystring.stringify({
      phone,
    });

    await axios
      .post("/otp-login/send-otp", encodedFormData)
      .then(async (response) => {
        if (response.status === 204 || response.status === 200) {
          changeStep(true);
          toast.success(<ToastSuccess text="کد تایید برای شما ارسال شد" />);
        }
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

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3 w-full space-y-3">
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary["loginPage"]["phoneNumber"]}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="09"
                  className="focus-visible:ring-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          className="!mt-5 w-full bg-gradient-to-r from-[#F6F60A] to-[#FFDB2F]"
          loading={isSubmitting}
        >
          {/* {dictionary["loginPage"]["signIn"]} */}
          {"ارسال کد"}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default OTPPhone;

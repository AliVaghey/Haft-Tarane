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
import { toast } from "sonner";
import SubmitButton from "@/components/submit-button";
import { useRouter } from "next/navigation";
import { useDictionary } from "@/providers/dictionary-provider";
import { axios } from "@/lib/axios";
import querystring from "querystring";
import ToastSuccess from "@/components/toast/toast-success";
import { defaultMessages } from "@/lib/default-messages";
import ToastError from "@/components/toast/toast-error";
import { routes } from "@/routes/routes";
import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { enOtpCodeSchema, otpCodeSchema } from "@/lib/validation/auth/otp-code";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const OTPCode = ({ changeStep }) => {
  const dictionary = useDictionary();

  const userHook = useUser();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? otpCodeSchema : enOtpCodeSchema,
    ),
    defaultValues: {
      code: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = async (values) => {
    const { code } = values;


    

    const encodedFormData = querystring.stringify({
      code,
    });

    await axios
      .post("/otp-login/verify-otp", encodedFormData)
      .then(async (response) => {
        if (response.status === 204 || response.status === 200) {
          await axios.get("/api/user/info").then((res) => {

            userHook.setUserData(res?.data?.data);

            res.data.data.access_type === "superadmin" &&
              router.push(routes.superadmin.dashboard);
            res.data.data.access_type === "admin" &&
              router.push(routes.admin.dashboard);
            res.data.data.access_type === "agency" &&
              router.push(routes.agency.dashboard);
            res.data.data.access_type === "user" &&
              // router.push(routes.user.dashboard);
              router.push("/");

            toast.success(
              <ToastSuccess text={defaultMessages.login.default} />,
            );
          });
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
          name="code"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>
                {/* {dictionary["loginPage"]["phoneNumber"]} */}
                کد تایید
              </FormLabel>
              <FormControl>
                {/* <Input
                  type="number"
                  placeholder="حداقل ۴ رقم"
                  className="focus-visible:ring-primary"
                  {...field}
                /> */}
                <InputOTP
                  maxLength={6}
                  onComplete={handleSubmit(onSubmit)}
                  {...field}
                >
                  <InputOTPGroup className="w-full flex-1">
                    {new Array(6).fill("").map((item, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="flex-1"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
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
          {"ورود"}
        </SubmitButton>

        <Button
          variant="outline"
          type="button"
          onClick={() => changeStep(false)}
          className="h-8"
        >
          تعییر شماره تماس
        </Button>
      </form>
    </Form>
  );
};

export default OTPCode;

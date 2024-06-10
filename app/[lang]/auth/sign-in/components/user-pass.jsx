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
import { enSignInSchema, signInSchema } from "@/lib/validation/auth/sign-in";
import SubmitButton from "@/components/submit-button";
import { useRouter } from "next/navigation";
import { useDictionary } from "@/providers/dictionary-provider";
import { CSRFToken, axios } from "@/lib/axios";
import querystring from "querystring";
import ToastSuccess from "@/components/toast/toast-success";
import { defaultMessages } from "@/lib/default-messages";
import ToastError from "@/components/toast/toast-error";
import { routes } from "@/routes/routes";
import { useUser } from "@/hooks/use-user";

const UserPass = () => {
  const dictionary = useDictionary();

  const userHook = useUser();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? signInSchema : enSignInSchema,
    ),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = async (values) => {
    const { password, phoneNumber } = values;

    await CSRFToken();

    const encodedFormData = querystring.stringify({
      phone: phoneNumber,
      password,
    });

    await axios
      .post("/login", encodedFormData)
      .then(async (response) => {
        if (response.status === 204 || response.status === 200) {
          await axios.get("/api/user/info").then((res) => {
            console.log("res", res.data);

            userHook.setUserData(res?.data?.data);

            res.data.data.access_type === "superadmin" &&
              router.push(routes.superadmin.dashboard);
            res.data.data.access_type === "admin" &&
              router.push(routes.admin.dashboard);
            res.data.data.access_type === "agency" &&
              router.push(routes.agency.dashboard);
            res.data.data.access_type === "user" &&
              router.push(routes.user.dashboard);

            toast.success(
              <ToastSuccess text={defaultMessages.login.default} />,
            );
          });
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

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3 w-full space-y-3">
        <FormField
          control={control}
          name="phoneNumber"
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

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary["loginPage"]["password"]}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={dictionary["loginPage"]["password"]}
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
          {dictionary["loginPage"]["signIn"]}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default UserPass;

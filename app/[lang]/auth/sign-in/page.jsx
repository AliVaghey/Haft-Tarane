"use client";

import Image from "next/image";
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
import { redirect, useRouter } from "next/navigation";
import { logo } from "@/constants/images";
import { useDictionary } from "@/providers/dictionary-provider";
import { CSRFToken, axios } from "@/lib/axios";
import querystring from "querystring";
import ToastSuccess from "@/components/toast/toast-success";
import { defaultMessages } from "@/lib/default-messages";
import ToastError from "@/components/toast/toast-error";

const LoginPage = () => {
  const dictionary = useDictionary();

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
      .then((response) => {
        console.log("login-response", response.data);

        if (response.status === 204 || response.status === 200) {
          toast.success(<ToastSuccess text={defaultMessages.login.default} />);
          router.push("/");
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
    <section className="h-screen w-screen bg-card">
      <div className="md:p0 flex h-full w-full items-center justify-center p-5">
        <div className="flex h-full w-full rounded-xl shadow-lg md:h-5/6 md:w-5/6 lg:w-2/3">
          <div
            className="hidden h-full w-1/2 flex-col items-center justify-center gap-2 bg-gradient-to-r from-[#F6F60A]
            to-[#FFDB2F] p-3 text-muted-foreground dark:text-accent-foreground md:flex ltr:rounded-l-xl rtl:rounded-r-xl"
          >
            <h1 className="text-2xl font-bold">
              {dictionary["loginPage"]["title"]}
            </h1>
            <p className="max-w-64 text-justify text-sm leading-8">
              {dictionary["loginPage"]["description"]}
            </p>
          </div>

          <div className="flex h-full w-full justify-center rounded-l-xl rounded-r-xl border bg-card p-3 md:w-2/3 ltr:md:rounded-l-none rtl:md:rounded-r-none">
            <div className="flex w-full flex-col items-center">
              <Image
                src={logo}
                alt="logo"
                width={160}
                height={80}
                className="h-36 w-60"
              />
              <h1 className="text-2xl font-bold text-primary">
                {dictionary["loginPage"]["title"]}
              </h1>
              <div className="mt-4 flex flex-col items-center gap-2">
                <span className="text-xs">
                  {dictionary["loginPage"]["loginText"]}
                </span>

                <Form {...form}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-3 w-full space-y-3"
                  >
                    <FormField
                      control={control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {dictionary["loginPage"]["phoneNumber"]}
                          </FormLabel>
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
                          <FormLabel>
                            {dictionary["loginPage"]["password"]}
                          </FormLabel>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

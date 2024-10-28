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
import SubmitButton from "@/components/submit-button";
import { useRouter } from "next/navigation";
import { logoGold } from "@/constants/images";
import { useDictionary } from "@/providers/dictionary-provider";
import { axios } from "@/lib/axios";
import querystring from "querystring";
import ToastSuccess from "@/components/toast/toast-success";
import { defaultMessages } from "@/lib/default-messages";
import ToastError from "@/components/toast/toast-error";
import { routes } from "@/routes/routes";
import { useUser } from "@/hooks/use-user";
import { enSignUpSchema, signUpSchema } from "@/lib/validation/auth/sign-up";
import Link from "next/link";

const LoginPage = () => {
  const dictionary = useDictionary();

  const userHook = useUser();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      dictionary["language"] === "fa" ? signUpSchema : enSignUpSchema,
    ),
    defaultValues: {
      username: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
  });

  const {
    handleSubmit,
    control,
    getValues,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = async (values) => {
    const { username, phone, password, password_confirmation } = values;

    if (password !== password_confirmation) {
      return toast.error(<ToastError text="تکرار رمز ورود صحیح نمیباشد" />);
    }

    

    const encodedFormData = querystring.stringify({
      username,
      phone,
      password,
      password_confirmation,
    });

    await axios
      .post("/register", encodedFormData)
      .then(async (response) => {
        if (response.status === 204 || response.status === 200) {
          await axios.get("/api/user/info").then((res) => {

            userHook.setUserData(res?.data?.data);

            // res.data.data.access_type === "superadmin" &&
            //   router.push(routes.superadmin.dashboard);
            // res.data.data.access_type === "admin" &&
            //   router.push(routes.admin.dashboard);
            // res.data.data.access_type === "agency" &&
            //   router.push(routes.agency.dashboard);
            // res.data.data.access_type === "user" && router.push("/");

            router.push("/");

            toast.success(
              <ToastSuccess text={defaultMessages.register.default} />,
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
    <section className="h-screen w-screen bg-card">
      <div className="md:p0 flex h-full w-full items-center justify-center p-5">
        <div className="md:min-h-5/6 flex h-full w-full rounded-xl shadow-lg md:w-5/6 lg:w-2/3">
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

          <div className="flex h-full w-full items-center justify-center rounded-l-xl rounded-r-xl border bg-card p-3 md:w-2/3 ltr:md:rounded-l-none rtl:md:rounded-r-none">
            <div className="flex w-full flex-col items-center">
              <Image
                src={logoGold}
                alt="logo"
                width={160}
                height={80}
                className="h-36 w-72"
              />
              <h1 className="mt-2 text-2xl font-bold text-primary">
                {dictionary["loginPage"]["title"]}
              </h1>
              <div className="mt-4 flex flex-col items-center gap-2">
                <span className="text-xs">
                  {dictionary["loginPage"]["loginText"]}
                </span>

                <Form {...form}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-3 grid w-full grid-cols-2 gap-x-3 gap-y-2"
                  >
                    <FormField
                      control={control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {dictionary["loginPage"]["username"]}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="حداقل ۳ کاراکتر"
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
                      name="phone"
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

                    <FormField
                      control={control}
                      name="password_confirmation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {dictionary["loginPage"]["password confirmation"]}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder={
                                dictionary["loginPage"]["password confirmation"]
                              }
                              className="focus-visible:ring-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <SubmitButton
                      className="col-span-2 !mt-5 w-full bg-gradient-to-r from-[#F6F60A] to-[#FFDB2F]"
                      loading={isSubmitting}
                    >
                      {dictionary["loginPage"]["signUp"]}
                    </SubmitButton>
                  </form>
                </Form>
                <span className="text-sm font-normal">
                  در صورت داشتن حساب کاربری به سایت{" "}
                  <Link
                    href={routes.auth.signIn}
                    className="font-semibold text-yellow-dark hover:underline"
                  >
                    وارد
                  </Link>{" "}
                  شوید
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

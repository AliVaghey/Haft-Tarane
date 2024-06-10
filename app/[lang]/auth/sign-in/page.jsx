"use client";

import Image from "next/image";
import { logoGold } from "@/constants/images";
import { useDictionary } from "@/providers/dictionary-provider";
import { routes } from "@/routes/routes";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserPass from "./components/user-pass";
import OTPForm from "./components/otp";

const LoginPage = () => {
  const dictionary = useDictionary();

  return (
    <section className="h-screen w-screen bg-card">
      <div className="md:p0 flex h-full w-full items-center justify-center py-5">
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

                <Tabs
                  defaultValue="userPass"
                  className="w-full flex-1 text-right text-sm"
                >
                  <TabsList className="w-full">
                    <TabsTrigger value="verifyCode">
                      ورود با رمز یک بار مصرف
                    </TabsTrigger>{" "}
                    <TabsTrigger value="userPass" className="flex-1">
                      ورود با نام کاربری
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="userPass" className="flex-1">
                    <UserPass />
                  </TabsContent>
                  <TabsContent value="verifyCode">
                    <OTPForm />
                  </TabsContent>
                </Tabs>

                <span className="text-sm font-normal">
                  در صورت نداشتن حساب کاربری در سایت{" "}
                  <Link
                    href={routes.auth.signUp}
                    className="font-semibold text-yellow-dark hover:underline"
                  >
                    ثبت نام
                  </Link>{" "}
                  کنید
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

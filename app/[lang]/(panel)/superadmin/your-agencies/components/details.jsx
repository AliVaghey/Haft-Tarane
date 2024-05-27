"use client";

import { effect1, effect2, plain } from "@/constants/images";
import useMount from "@/hooks/use-mount";
import { useDictionary } from "@/providers/dictionary-provider";
import { Facebook } from "lucide-react";
import { Linkedin } from "lucide-react";
import { Instagram } from "lucide-react";
import Image from "next/image";

const Details = ({ data }) => {
  const dictionary = useDictionary();

  const mount = useMount();

  if (!mount) {
    return null;
  }

  return (
    <div className="relative flex min-h-full flex-col rounded-lg bg-white pr-4">
      <Image
        src={effect2}
        width={100}
        height={100}
        alt="effect"
        className="absolute left-0 top-0"
      />
      <Image
        src={effect1}
        width={200}
        height={200}
        alt="effect"
        className="absolute bottom-0 left-10 md:left-60"
      />
      <div className="mt-20 md:mt-4">
        <h1 className="text-6xl text-red-dark">{data.agency_name}</h1>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold text-red-dark">
              نام کاربر
            </span>
            <span className="text-lg">{data.username}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold text-red-dark">
              شماره تماس کاربر
            </span>
            <span className="text-lg">{data.user_phone}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold text-red-dark">
              نام ادمین
            </span>
            <span className="text-lg">{data.admin}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold text-red-dark">
              تلفن ثابت
            </span>
            <span className="text-lg">{data.agency_c_phone}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold text-red-dark">کد پستی</span>
            <span className="text-lg">{data.agency_zip_code}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold text-red-dark">ایمیل</span>
            <span className="text-lg">{data.agency_email}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold text-red-dark">وبسایت</span>
            <span className="text-lg">{data.agency_web_site}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold text-red-dark">آدرس</span>
            <span className="text-lg">{data.agency_address}</span>
          </div>
          <div className="mt-8 flex items-center gap-5 text-red-dark">
            <Instagram />
            <Facebook />
            <Linkedin />
          </div>
        </div>

        <div>
          <Image
            src={plain}
            width={480}
            height={360}
            alt="effect"
            className="my-auto mr-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Details;

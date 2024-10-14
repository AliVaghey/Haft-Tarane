"use client";

import Image from "next/image";
import React from "react";
import bg from "@/public/img/footerBg.svg";
import Link from "next/link";
import airplane from "@/public/logo/logo-red.png";
import whatsapp from "@/public/img/whatsapp.svg";
import insta from "@/public/img/instageram.svg";
import telegram from "@/public/img/telegram.svg";
import { farsiNumber } from "@/lib/farsi-number";
import { useUser } from "@/hooks/use-user";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Footer() {
  const userHook = useUser();

  const pathname = usePathname();

  return (
    <div
      className={cn(
        "bg-yellow-primary",
        (pathname.endsWith("/about") || pathname.endsWith("/contact")) &&
          "bg-white",
      )}
    >
      <div
        className=""
        style={{
          backgroundImage: `url(${bg.src})`,
          width: "100%",
          height: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto w-4/5">
          <div className="flex flex-wrap justify-between gap-4 py-7">
            <div className="w-1/5 max-lg:w-1/3 max-md:w-full ">
              <div>
                <div className="flex items-center gap-4 pb-6">
                  <Image
                    src={airplane}
                    alt="alt"
                    width={100}
                    height={100}
                    className="w-32 max-lg:w-16"
                  />
                  <h2 className="bg-gradient-to-r from-[#1D91CC] to-[#F85E9F] bg-clip-text text-2xl text-transparent">
                    بی باک سفر
                  </h2>
                </div>
                <p className="text-justify leading-9 text-[#868383]">
                  از لحظه‌ی رزرو تا رسیدن به مقصد، ما همراه شما خواهیم بود و
                  اطمینان می‌دهیم که هر جزئیات سفر شما به بهترین شکل ممکن انجام
                  شود
                </p>
              </div>
            </div>
            <div className="w-1/5 max-lg:w-1/3 max-md:w-full ">
              <h2 className="pb-6 text-xl">ارتباط با ما</h2>
              <div className="flex flex-col gap-4">
                <a href="tel:02191012850" className="text-[#868383]">
                  {farsiNumber("02191012850")}
                </a>
                <a href="tel:09309314455" className="text-[#868383]">
                  {farsiNumber("09309314455")}
                </a>
                <a href="tel:09309324455" className="text-[#868383]">
                  {farsiNumber("09309324455")}
                </a>
                <a
                  href="mailto:bibaksafar2024@gmail.com"
                  className="text-[#868383]"
                >
                  bibaksafar2024@gmail.com
                </a>
                <p className="text-[#868383]">تهران شهریار فاز یک</p>
              </div>
            </div>
            <div className="w-1/5 max-lg:w-1/3 max-md:w-full ">
              <h2 className="pb-6 text-xl">بی باک سفر</h2>
              <div>
                <ul className="flex flex-col gap-6">
                  <Link href="/contact">
                    <li className="text-[#868383]">تماس با ما</li>
                  </Link>
                  <Link href="/about">
                    <li className="text-[#868383]">درباره ما</li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="w-1/5 max-lg:w-1/3 max-md:w-full ">
              <h2 className="pb-6 text-xl">شبکه های اجتماعی ما</h2>
              <div>
                <ul className="flex gap-4">
                  <li>
                    <a href="https://wa.me/+989309314455" target="_blank">
                      <Image
                        src={whatsapp}
                        alt="alt"
                        width={100}
                        height={100}
                        className="h-7 w-7"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://instagram.com/bibak_safar" target="_blank">
                      <Image
                        src={insta}
                        alt="alt"
                        width={100}
                        height={100}
                        className="h-7 w-7"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://t.me/bibaksafar2024" target="_blank">
                      <Image
                        src={telegram}
                        alt="alt"
                        width={100}
                        height={100}
                        className="h-7 w-7"
                      />
                    </a>
                  </li>
                </ul>

                <ul className="mt-5 flex flex-col gap-4 text-muted-foreground">
                  <span className="text-lg text-foreground">بازدید ها</span>
                  <li className="flex gap-2">
                    <span>تعداد بازدید امروز :</span>
                    {farsiNumber(userHook.siteViews?.today)}
                  </li>
                  <li className="flex gap-2">
                    <span>تعداد بازدید کل :</span>
                    {farsiNumber(userHook.siteViews?.all)}
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-1/5 max-lg:w-1/3 max-md:w-full ">
              <div className="flex items-center justify-center gap-4">
                <a
                  referrerPolicy="origin"
                  target="_blank"
                  href="https://trustseal.enamad.ir/?id=507456&Code=qgdiKelLh1qmYliiZUKgheSmYfSOwAN1"
                >
                  <img
                    referrerPolicy="origin"
                    src="https://trustseal.enamad.ir/logo.aspx?id=507456&Code=qgdiKelLh1qmYliiZUKgheSmYfSOwAN1"
                    alt=""
                    style={{ cursor: "pointer" }}
                    code="qgdiKelLh1qmYliiZUKgheSmYfSOwAN1"
                    className="h-20 w-20 rounded-md"
                  />
                </a>
                <a
                  referrerPolicy="origin"
                  target="_blank"
                  href="https://trustseal.enamad.ir/?id=535288&Code=M1PvViochxaT1K3yHkIR9vPdNEeLevHo"
                >
                  <img
                    referrerPolicy="origin"
                    src="https://trustseal.enamad.ir/logo.aspx?id=535288&Code=M1PvViochxaT1K3yHkIR9vPdNEeLevHo"
                    alt=""
                    code="M1PvViochxaT1K3yHkIR9vPdNEeLevHo"
                    className="h-20 w-20 rounded-md"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#130D3A]">
        <p className="py-7 text-center text-lg text-yellow-primary">
          &copy; کلیه حقوق این سایت متعلق به شرکت بی باک سفر می‌باشد.
        </p>
      </div>
    </div>
  );
}

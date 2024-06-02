import Image from "next/image";
import React from "react";
import bg from "@/public/img/footerBg.svg";
import Link from "next/link";
import airplane from "@/public/logo/logo-red.png";
import whatsapp from "@/public/img/whatsapp.svg";
import insta from "@/public/img/instageram.svg";
import telegram from "@/public/img/telegram.svg";
import { farsiNumber } from "@/lib/farsi-number";

export default function Footer() {
  return (
    <div className="bg-yellow-primary">
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
              <div className="flex flex-col gap-6">
                <a href="tel:02191012850" className="text-[#868383]">
                  {farsiNumber("02191012850")}
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
                <ul className="flex flex-col gap-4">
                  <li>
                    <a href="">
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
                    <a href="">
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
                    <a href="">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#130D3A]">
        <p className="py-7 text-center text-lg text-yellow-primary">
          &copy; کلیه حقوق این سایت متعلق به شرکت بیباک سفر می‌باشد.
        </p>
      </div>
    </div>
  );
}

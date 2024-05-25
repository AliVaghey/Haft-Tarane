import Image from "next/image";
import Link from "next/link";
import React from "react";
import flight from "@/public/img/flightlanding.svg";
import cc from "@/public/img/cc.svg";
import mail from "@/public/img/mail.svg";
import phone from "@/public/img/phone.svg";
import map from "@/public/img/map.svg";
import twitter from "@/public/img/twitter.svg";
import facebook from "@/public/img/facebook.svg";
import youtube from "@/public/img/youtube.svg";
import v from "@/public/img/v.svg";
import ig from "@/public/img/ig.svg";
import cg from "@/public/img/cg.svg";


export default function ContactUs() {
  return (
    <div>
      <div>
        <Image
          src={flight}
          alt="airplane"
          width={100}
          height={100}
          className="w-full -z-10"
        />
        <div className=" px-44">
          <div className="-mt-20">
            <div className=" w-72 flex justify-between items-center gap-7">
              <Link href="/about">
                <p className="bg-white text-[#a6a6a6] border border-yellow-primary w-32 py-3 rounded-xl text-center cursor-pointer">
                  درباره ما
                </p>
              </Link>
              <Link href="/contact">
                <p className="bg-yellow-primary text-black w-32 py-3 rounded-xl text-center cursor-pointer">
                  تماس با ما
                </p>
              </Link>
            </div>
          </div>
        </div>{" "}
        <div className="mt-20 text-center flex flex-col gap-6">
          <p className="px-4">
            ما در مجموعه بیلیتو همواره به نظرات، پیشنهادات و سوالات شما عزیزان
            ارزش قائلیم و مشتاقانه منتظر کمک به شما هستیم.
          </p>
          <p className="px-4">
            درصورتی که سوالی دارید یا نیاز به راهنمایی دارید، با شماره پشتیبانی
            ما تماس بگیرید.
          </p>
          <div className="flex justify-between gap-9 mt-20">
            <Image
              src={cc}
              alt="alt"
              width={100}
              height={100}
              className="w-14 max-lg:w-16"
            />

            <div className="flex justify-between max-lg:flex-col  gap-9 ">
              <div>
                <div className="bg-yellow-primary xl:w-96 lg:w-72 py-12 flex flex-col gap-9 rounded-2xl px-9 mb-20">
                  <div>
                    <h2 className="text-center text-white text-3xl">
                      جستجوی بلیط
                    </h2>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={mail}
                        alt="alt"
                        width={100}
                        height={100}
                        className="size-7"
                      />
                      <p>novinbin@gmail.com</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Image
                        src={phone}
                        alt="alt"
                        width={100}
                        height={100}
                        className="size-7"
                      />
                      <p>novinbin@gmail.com</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Image
                        src={map}
                        alt="alt"
                        width={100}
                        height={100}
                        className="size-7"
                      />
                      <p className="text-right">
                        Lorem ipsum dolor sit amet  
                      </p>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-white my-4 text-xl text-center">
                      شبکه های اجتماعی
                    </h2>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <Image
                          src={twitter}
                          alt="alt"
                          width={100}
                          height={100}
                          className="size-7"
                        />
                        <p>novinbin@gmail.com</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Image
                          src={facebook}
                          alt="alt"
                          width={100}
                          height={100}
                          className="size-7"
                        />
                        <p>novinbin@gmail.com</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Image
                          src={youtube}
                          alt="alt"
                          width={100}
                          height={100}
                          className="size-7"
                        />
                        <p>novinbin@gmail.com</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Image
                          src={v}
                          alt="alt"
                          width={100}
                          height={100}
                          className="size-7"
                        />
                        <p>novinbin@gmail.com</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Image
                          src={ig}
                          alt="alt"
                          width={100}
                          height={100}
                          className="size-7"
                        />
                        <p>novinbin@gmail.com</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-white text-xl text-center mb-7">
                      ساعت پاسخگویی
                    </h2>
                    <p className="text-white text-center pb-3 ">
                      12:00 - 08:00 Uhr
                    </p>
                    <p className="text-white text-center">17:00 - 13:00 Uhr</p>
                  </div>
                </div>
              </div>
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6890.914143557435!2d57.057602458349685!3d30.281047037322043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f021964f15bdfcd%3A0xcf3074f6cfd82da0!2sNovinbin%20Digital%20Marketing!5e0!3m2!1sen!2s!4v1716012431260!5m2!1sen!2s"
                  //   width="1111"
                  //   height="750"
                  className="rounded-lg max-lg:size-[499px] max-lg:pb-9 lg:w-[525px] lg:h-[750px] xl:w-[777px]"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <Image
              src={cg}
              alt="alt"
              width={100}
              height={100}
              className="xl:w-44 lg:w-20 max-lg:w-20 max-lg:-mt-[666px]"
            />
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

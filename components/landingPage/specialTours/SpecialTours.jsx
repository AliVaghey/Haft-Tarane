import Image from "next/image";
import circle from "@/public/img/tour-circle.svg";
import nature from "@/public/img/nature.jpg";

function SpecialTours() {
  return (
    <div className="lg:mb-20 lg:h-screen">
      <div className="relative">
        <Image
          src={circle}
          width={100}
          height={100}
          alt=""
          className="absolute right-0 w-80 max-lg:hidden"
        />
        <div className="mx-auto w-4/5 pt-20">
          <div className="flex justify-between gap-9 max-lg:flex-col">
            <div className="w-96 max-lg:w-full">
              {" "}
              <div className="flex items-center justify-center gap-4 max-lg:grid  max-lg:grid-cols-4 max-md:grid-cols-2 lg:flex-col ">
                <div className="z-10 flex  size-32 items-center justify-center rounded-2xl bg-white">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-yellow text-xl font-bold">+ 35</p>
                    <p className="">تور مسافرتی</p>
                  </div>
                </div>
                <div className="z-10 flex  size-32 items-center justify-center rounded-2xl bg-white">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-yellow text-xl font-bold">+ 56</p>
                    <p className="">هتل 5 ستاره</p>
                  </div>
                </div>
                <div className="z-10 flex  size-32 items-center justify-center rounded-2xl bg-white">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-yellow text-xl font-bold">+ 100</p>
                    <p className="">شرکت هواپیمایی</p>
                  </div>
                </div>
                <div className="z-10 flex  size-32 items-center justify-center rounded-2xl bg-white">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-yellow text-xl font-bold">+ 150</p>
                    <p className="">مقصد گردشگری</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-center text-3xl font-bold max-lg:text-lg max-md:text-sm">
                تورهای ویژه
              </h2>
              <p className="py-9 text-center text-xl max-lg:text-lg max-md:text-xs">
                ما به شما کمک میکنیم تا لوکیشن دلخواه خود را انتخاب کنید
              </p>
              <div className="relative">
                <Image
                  src={nature}
                  alt="alt"
                  width={480}
                  height={360}
                  className="h-[500px] w-[888px] rounded-2xl max-lg:h-80 max-md:h-72 "
                />
                <div className="absolute right-9 top-9">
                  <h2 className="pb-7 text-2xl font-bold text-white max-lg:text-lg max-md:text-xs">
                    تور ترکیه
                  </h2>
                  <p className="line-clamp-3 w-1/2 text-justify leading-7 text-white max-md:w-full max-md:pl-9 max-md:text-xs">
                    ترکیه کشور زیبای آسیایی-اروپایی است که نزد ایرانیان محبوبیت
                    زیادی دارد و علت آن نیز علاوه بر نزدیکی جغرافیایی و فرهنگی
                    این کشور، عدم نیاز به ویزا برای ورود به آن است
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialTours;

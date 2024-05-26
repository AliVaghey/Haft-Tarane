import Image from "next/image";
import circle from "@/public/img/tour-circle.svg";
import nature from "@/public/img/nature.jpg";

function SpecialTours() {
  return (
    <div className="h-screen max-lg:mt-20">
      <div className="relative">
        <Image
          src={circle}
          width={100}
          height={100}
          className=" absolute w-80 right-0 max-lg:hidden"
        />
        <div className="w-4/5 mx-auto pt-20">
          <div className="flex max-lg:flex-col justify-between gap-9">
            <div className="w-96 max-lg:w-full">
              {" "}
              <div className="flex lg:flex-col max-lg:grid max-md:grid-cols-2 max-lg:grid-cols-4  justify-center items-center gap-4 ">
                <div className="bg-white size-32  rounded-2xl flex justify-center items-center z-10">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <p className="text-yellow text-xl font-bold">+ 35</p>
                    <p className="">تور مسافرتی</p>
                  </div>
                </div>
                <div className="bg-white size-32  rounded-2xl flex justify-center items-center z-10">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <p className="text-yellow text-xl font-bold">+ 56</p>
                    <p className="">هتل 5 ستاره</p>
                  </div>
                </div>
                <div className="bg-white size-32  rounded-2xl flex justify-center items-center z-10">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <p className="text-yellow text-xl font-bold">+ 100</p>
                    <p className="">شرکت هواپیمایی</p>
                  </div>
                </div>
                <div className="bg-white size-32  rounded-2xl flex justify-center items-center z-10">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <p className="text-yellow text-xl font-bold">+ 150</p>
                    <p className="">مقصد گردشگری</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-center font-bold text-3xl max-lg:text-lg max-md:text-sm">
                تورهای ویژه
              </h2>
              <p className="text-center text-xl py-9 max-md:text-xs max-lg:text-lg">
                ما به شما کمک میکنیم تا لوکیشن دلخواه خود را انتخاب کنید
              </p>
              <div className="relative">
                <Image
                  src={nature}
                  alt="alt"
                  width={480}
                  height={360}
                  className="w-[888px] h-[500px] max-md:h-72 max-lg:h-80 rounded-2xl "
                />
                <div className="absolute top-9 right-9">
                  <h2 className="text-2xl font-bold pb-7 text-white max-lg:text-lg max-md:text-xs">
                    تور ترکیه
                  </h2>
                  <p className="text-white leading-7 line-clamp-3 text-justify w-1/2 max-md:text-xs max-md:w-full max-md:pl-9">
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

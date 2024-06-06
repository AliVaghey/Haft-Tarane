import Image from "next/image";
import a from "@/public/img/branches.svg";
import b from "@/public/img/location.svg";
import c from "@/public/img/collaberation.svg";
import d from "@/public/img/about.svg";

function Feature() {
  return (
    <div>
      <div className="mx-auto w-4/5 rounded-3xl bg-[#2B303D] lg:mt-20">
        <div className="flex flex-col justify-center gap-7 py-9 max-lg:grid-cols-2 max-md:grid-cols-1 md:flex-row">
          <div className="flex items-center justify-center gap-3">
            <Image
              src={a}
              alt="alt"
              width={100}
              height={100}
              className="h-7 w-7 max-lg:h-5 max-lg:w-5 "
            />{" "}
            <p className="text-white">شعب ما</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Image
              src={b}
              alt="alt"
              width={100}
              height={100}
              className="h-7 w-7 max-lg:h-5 max-lg:w-5 "
            />{" "}
            <p className="text-white">مقاصد محبوب</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Image
              src={c}
              alt="alt"
              width={100}
              height={100}
              className="h-7 w-7 max-lg:h-5 max-lg:w-5 "
            />{" "}
            <p className="text-white">همکاری با ما</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Image
              src={d}
              alt="alt"
              width={100}
              height={100}
              className="h-7 w-7 max-lg:h-5 max-lg:w-5 "
            />{" "}
            <p className="text-white">درباره بی باک سفر</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;

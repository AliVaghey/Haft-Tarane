import Image from "next/image";
import a from "@/public/img/branches.svg";
import b from "@/public/img/location.svg";
import c from "@/public/img/collaberation.svg";
import d from "@/public/img/about.svg";

function Feature() {
  return (
    <div>
      <div className="w-4/5 mx-auto bg-[#2B303D] rounded-3xl">
        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 justify-center items-center gap-7 py-9">
          <div className="flex items-center justify-center gap-7">
            <Image
              src={a}
              alt="alt"
              width={100}
              height={100}
              className="w-7 h-7 max-lg:w-5 max-lg:h-5 "
            />{" "}
            <p className="text-white">شعب ما</p>
          </div>
          <div className="flex items-center justify-center gap-7">
            <Image
              src={b}
              alt="alt"
              width={100}
              height={100}
              className="w-7 h-7 max-lg:w-5 max-lg:h-5 "
            />{" "}
            <p className="text-white">مقاصد محبوب</p>
          </div>
          <div className="flex items-center justify-center gap-7">
            <Image
              src={c}
              alt="alt"
              width={100}
              height={100}
              className="w-7 h-7 max-lg:w-5 max-lg:h-5 "
            />{" "}
            <p className="text-white">همکاری با ما</p>
          </div>
          <div className="flex items-center justify-center gap-7">
            <Image
              src={d}
              alt="alt"
              width={100}
              height={100}
              className="w-7 h-7 max-lg:w-5 max-lg:h-5 "
            />{" "}
            <p className="text-white">درباره بی باک سفر</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;

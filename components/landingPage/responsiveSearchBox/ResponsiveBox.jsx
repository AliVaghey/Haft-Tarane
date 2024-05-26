import { cn } from "@/lib/utils";
import a from "@/public/img/in-airplane.svg";
import b from "@/public/img/out-airplane.svg";
import c from "@/public/img/arrow.svg";
import d from "@/public/img/tour.svg";
import e from "@/public/img/train.svg";
import f from "@/public/img/origin.svg";
import g from "@/public/img/destination.svg";
import h from "@/public/img/calendar.svg";
import i from "@/public/img/person.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ResponsiveBox({ className }) {
  return (
    <div className={cn(className)}>
      <div className="w-4/5 mx-auto">
        <div className="grid grid-cols-2 justify-center items-center bg-white rounded-xl  ">
          <Dialog>
            <DialogTrigger>
              {" "}
              <div className="flex justify-center items-center gap-4 border-l border-[#777] h-12 hover:bg-slate-100 rounded-tr-xl  cursor-pointer">
                <Image
                  src={a}
                  width={100}
                  height={100}
                  alt="alt"
                  className="w-4 h-4"
                />{" "}
                <p className="max-md:text-sm">پرواز داخلی</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription className="py-9 ">
                  <div className="grid grid-cols-2 justify-between items-center gap-4">
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">مبدأ</p>
                        <Image
                          src={f}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="مبدأ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">تهران</SelectItem>
                          <SelectItem value="option2">کیش</SelectItem>
                          <SelectItem value="option3">مشهد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">مقصد</p>
                        <Image
                          src={g}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="مقصد" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">تهران</SelectItem>
                          <SelectItem value="option2">کیش</SelectItem>
                          <SelectItem value="option3">مشهد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">تاریخ رفت و برگشت</p>
                        <Image
                          src={h}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="تاریخ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">3</SelectItem>
                          <SelectItem value="option2">9</SelectItem>
                          <SelectItem value="option3">4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">تعداد مسافران</p>
                        <Image
                          src={i}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="تعداد مسافران" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">3</SelectItem>
                          <SelectItem value="option2">4</SelectItem>
                          <SelectItem value="option3">9</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center mt-7">
                    <Button variant="outline" className="bg-yellow text-white">
                      جستجو
                      <Search className="mr-4 h-4 w-4" />
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <div className="flex justify-center items-center gap-4 h-12 hover:bg-slate-100 rounded-tl-xl  cursor-pointer">
                <Image
                  src={b}
                  width={100}
                  height={100}
                  alt="alt"
                  className="w-4 h-4"
                />{" "}
                <p className="max-md:text-sm">پرواز خارجی</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription className="py-9 ">
                  <div className="grid grid-cols-2 justify-between items-center gap-4">
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">مبدأ</p>
                        <Image
                          src={f}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="مبدأ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">تهران</SelectItem>
                          <SelectItem value="option2">کیش</SelectItem>
                          <SelectItem value="option3">مشهد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">مقصد</p>
                        <Image
                          src={g}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="مقصد" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">تهران</SelectItem>
                          <SelectItem value="option2">کیش</SelectItem>
                          <SelectItem value="option3">مشهد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">تاریخ رفت و برگشت</p>
                        <Image
                          src={h}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="تاریخ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">3</SelectItem>
                          <SelectItem value="option2">9</SelectItem>
                          <SelectItem value="option3">4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">تعداد مسافران</p>
                        <Image
                          src={i}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="تعداد مسافران" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">3</SelectItem>
                          <SelectItem value="option2">4</SelectItem>
                          <SelectItem value="option3">9</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center mt-7">
                    <Button variant="outline" className="bg-yellow text-white">
                      جستجو
                      <Search className="mr-4 h-4 w-4" />
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <div className="flex justify-center items-center gap-4 border-l border-[#777] h-12 hover:bg-slate-100 cursor-pointer  ">
                <Image
                  src={c}
                  width={100}
                  height={100}
                  alt="alt"
                  className="w-4 h-4"
                />{" "}
                <p className="max-md:text-sm">کلاس پرواز</p>
              </div>{" "}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription className="py-9 ">
                  <div className="grid grid-cols-2 justify-between items-center gap-4">
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">مبدأ</p>
                        <Image
                          src={f}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="مبدأ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">تهران</SelectItem>
                          <SelectItem value="option2">کیش</SelectItem>
                          <SelectItem value="option3">مشهد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">مقصد</p>
                        <Image
                          src={g}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="مقصد" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">تهران</SelectItem>
                          <SelectItem value="option2">کیش</SelectItem>
                          <SelectItem value="option3">مشهد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">تاریخ رفت و برگشت</p>
                        <Image
                          src={h}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="تاریخ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">3</SelectItem>
                          <SelectItem value="option2">9</SelectItem>
                          <SelectItem value="option3">4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">تعداد مسافران</p>
                        <Image
                          src={i}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="تعداد مسافران" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">3</SelectItem>
                          <SelectItem value="option2">4</SelectItem>
                          <SelectItem value="option3">9</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center mt-7">
                    <Button variant="outline" className="bg-yellow text-white">
                      جستجو
                      <Search className="mr-4 h-4 w-4" />
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <div className="flex justify-center items-center gap-4 h-12 hover:bg-slate-100  cursor-pointer ">
                <Image
                  src={d}
                  width={100}
                  height={100}
                  alt="alt"
                  className="w-4 h-4"
                />{" "}
                <p className="max-md:text-sm">تور</p>
              </div>{" "}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription className="py-9 ">
                  <div className="grid grid-cols-2 justify-between items-center gap-4">
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">مبدأ</p>
                        <Image
                          src={f}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="مبدأ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">تهران</SelectItem>
                          <SelectItem value="option2">کیش</SelectItem>
                          <SelectItem value="option3">مشهد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">مقصد</p>
                        <Image
                          src={g}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="مقصد" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">تهران</SelectItem>
                          <SelectItem value="option2">کیش</SelectItem>
                          <SelectItem value="option3">مشهد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">تاریخ رفت و برگشت</p>
                        <Image
                          src={h}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="تاریخ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">3</SelectItem>
                          <SelectItem value="option2">9</SelectItem>
                          <SelectItem value="option3">4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">تعداد مسافران</p>
                        <Image
                          src={i}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="تعداد مسافران" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">3</SelectItem>
                          <SelectItem value="option2">4</SelectItem>
                          <SelectItem value="option3">9</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center mt-7">
                    <Button variant="outline" className="bg-yellow text-white">
                      جستجو
                      <Search className="mr-4 h-4 w-4" />
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <div className="flex justify-center items-center gap-4 h-12 hover:bg-slate-100 hover:rounded-br-xl cursor-pointer ">
                <Image
                  src={e}
                  width={100}
                  height={100}
                  alt="alt"
                  className="w-4 h-4"
                />{" "}
                <p className="max-md:text-sm">قطار</p>
              </div>{" "}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription className="py-9 ">
                  <div className="grid grid-cols-2 justify-between items-center gap-4">
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">مبدأ</p>
                        <Image
                          src={f}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="مبدأ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">تهران</SelectItem>
                          <SelectItem value="option2">کیش</SelectItem>
                          <SelectItem value="option3">مشهد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">مقصد</p>
                        <Image
                          src={g}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="مقصد" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">تهران</SelectItem>
                          <SelectItem value="option2">کیش</SelectItem>
                          <SelectItem value="option3">مشهد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">تاریخ رفت و برگشت</p>
                        <Image
                          src={h}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="تاریخ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">3</SelectItem>
                          <SelectItem value="option2">9</SelectItem>
                          <SelectItem value="option3">4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                      <div className="flex justify-between items-center gap-6 p-2">
                        {" "}
                        <p className="">تعداد مسافران</p>
                        <Image
                          src={i}
                          alt="alt"
                          className="w-4 h-4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="تعداد مسافران" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">3</SelectItem>
                          <SelectItem value="option2">4</SelectItem>
                          <SelectItem value="option3">9</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center mt-7">
                    <Button variant="outline" className="bg-yellow text-white">
                      جستجو
                      <Search className="mr-4 h-4 w-4" />
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default ResponsiveBox;

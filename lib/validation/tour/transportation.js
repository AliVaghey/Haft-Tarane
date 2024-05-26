import { z } from "zod";

export const transportationSchema = z.object({
  type: z.string().min(2, "نوع سفر حداقل ۲ حرف میباشد"),
  origin: z.string().min(2, "نام مبدا را انتخاب کنید"),
  destination: z.string().min(2, "نام مقصد را انتخاب کنید"),
  start: z.date("تاریخ شروع الزامی میباشد"),
  end: z.date("تاریخ پایان الزامی میباشد"),
  duration: z.string().min(2, "مدت زمان سفر الزامی میباشد"),
  company_name: z.union([
    z.string().length(0, "نام شرکت در صورت نیاز حداقل ۲ حرف میباشد"),
    z.string().min(2, "نام شرکت حداقل ۲ حرف میباشد"),
  ]),
  transportation_type: z.union([
    z.string().length(0, "نوع وسیله در صورت نیاز حداقل ۲ حرف میباشد"),
    z.string().min(2, "نوع وسیله حداقل ۲ حرف میباشد"),
  ]),
});

export const entransportationSchema = z.object({
  type: z.string().min(2, "نوع سفر حداقل ۲ حرف میباشد"),
  origin: z.string().min(2, "نام مبدا را انتخاب کنید"),
  destination: z.string().min(2, "نام مقصد را انتخاب کنید"),
  start: z.date("تاریخ شروع الزامی میباشد"),
  end: z.date("تاریخ پایان الزامی میباشد"),
  duration: z.string().min(2, "مدت زمان سفر الزامی میباشد"),
  company_name: z.union([
    z.string().length(0, "نام شرکت در صورت نیاز حداقل ۲ حرف میباشد"),
    z.string().min(2, "نام شرکت حداقل ۲ حرف میباشد"),
  ]),
  transportation_type: z.union([
    z.string().length(0, "نوع وسیله در صورت نیاز حداقل ۲ حرف میباشد"),
    z.string().min(2, "نوع وسیله حداقل ۲ حرف میباشد"),
  ]),
});

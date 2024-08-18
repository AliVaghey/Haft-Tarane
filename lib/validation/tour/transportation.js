import { z } from "zod";

export const transportationSchema = z.object({
  type: z.string().min(2, "نوع سفر حداقل ۲ حرف میباشد"),
  origin: z.string().min(2, "نام مبدا را انتخاب کنید"),
  destination: z.string().min(2, "نام مقصد را انتخاب کنید"),
  duration: z.string().min(1, "مدت زمان سفر الزامی میباشد"),
  company_name: z.string().min(1, "نام شرکت مسافربری الزامی میباشد"),
  transportation_type: z.string().min(2, "نوع وسیله را انتخاب کنید"),
  start: z.string().min(2, "ساعت حرکت الزامی میباشد"),
  end: z.string().min(2, "ساعت رسیدن الزامی میباشد"),
  price: z
    .string()
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

export const entransportationSchema = z.object({
  type: z.string().min(2, "نوع سفر حداقل ۲ حرف میباشد"),
  origin: z.string().min(2, "نام مبدا را انتخاب کنید"),
  destination: z.string().min(2, "نام مقصد را انتخاب کنید"),
  duration: z.string().min(1, "مدت زمان سفر الزامی میباشد"),
  company_name: z.string().min(1, "نام شرکت مسافربری الزامی میباشد"),
  transportation_type: z.string().min(2, "نوع وسیله را انتخاب کنید"),
  start: z.string().min(2, "ساعت حرکت الزامی میباشد"),
  end: z.string().min(2, "ساعت رسیدن الزامی میباشد"),
  price: z
    .string()
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

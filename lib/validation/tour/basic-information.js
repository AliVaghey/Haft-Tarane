import { z } from "zod";

export const basicInformationSchema = z.object({
  title: z.string().min(2, "نام تور حداقل ۲ حرف میباشد"),
  trip_type: z.string().min(2, "نوع تور حداقل ۲ حرف میباشد"),
  expiration: z.coerce.number().min(1, "روز های باقی مانده حداقل ۱ میباشد"),
  selling_type: z.string().min(2, "نوع فروش حداقل ۲ حرف میباشد"),
  tour_styles: z
    .array(z.string().min(1))
    .min(1, "حداقل یک مورد را باید انتخاب کنید"),
  capacity: z.coerce.number().min(1, "ظرفیت تور حداقل ۱ نفر میباشد"),
  evening_support: z.boolean(),
  midnight_support: z.boolean(),
  origin: z.string().min(2, "نام مبدا را انتخاب کنید"),
  destination: z.string().min(2, "نام مقصد را انتخاب کنید"),
  staying_nights: z.coerce.number().min(1, "تعداد شب اقامت حداقل ۱ میباشد"),
  transportation_type: z.string().min(2, "نوع حمل و نقل را انتخاب کنید"),
  support: z.string().min(1, "انتخاب پشتیبان را انتخاب کنید"),
});

export const enBasicInformationSchema = z.object({
  title: z.string().min(2, "نام تور حداقل ۲ حرف میباشد"),
  trip_type: z.string().min(2, "نوع تور حداقل ۲ حرف میباشد"),
  expiration: z.coerce.number().min(1, "روز های باقی مانده حداقل ۱ میباشد"),
  selling_type: z.string().min(2, "نوع فروش حداقل ۲ حرف میباشد"),
  tour_styles: z
    .array(z.string().min(1))
    .min(1, "حداقل یک مورد را باید انتخاب کنید"),
  capacity: z.coerce.number().min(1, "ظرفیت تور حداقل ۱ نفر میباشد"),
  evening_support: z.boolean(),
  midnight_support: z.boolean(),
  origin: z.string().min(2, "نام مبدا را انتخاب کنید"),
  destination: z.string().min(2, "نام مقصد را انتخاب کنید"),
  staying_nights: z.coerce.number().min(1, "تعداد شب اقامت حداقل ۱ میباشد"),
  transportation_type: z.string().min(2, "نوع حمل و نقل را انتخاب کنید"),
  support: z.string().min(1, "انتخاب پشتیبان را انتخاب کنید"),
});

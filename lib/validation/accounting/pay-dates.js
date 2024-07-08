import { z } from "zod";

const imageSchema = z
  .custom()
  .refine((file) => file, "انتخاب فایل رسید الزامی میباشد")
  .refine(
    (file) =>
      !file ||
      (file && file.type.startsWith("image/")) ||
      (file && file.type.startsWith("pdf/")),
    "فایل انتخابی حتما باید تصویر باشد",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 3;
  }, "فایل انتخابی حداکثر باید ۳ مگابایت باشد");

export const payDatesSchema = z.object({
  start: z.date("تاریخ شروع الزامی میباشد"),
  end: z.date("تاریخ پایان الزامی میباشد"),
  images: imageSchema,
});

export const enPayDatesSchema = z.object({
  start: z.date("تاریخ شروع الزامی میباشد"),
  end: z.date("تاریخ پایان الزامی میباشد"),
  images: imageSchema,
});

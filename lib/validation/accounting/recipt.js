import { z } from "zod";

const imageSchema = z
  .custom()
  .refine((file) => file, "انتخاب فایل رسید الزامی میباشد")
  .refine(
    (file) =>
      !file ||
      (file && file.type.startsWith("image/")) ||
      (file && file.type.startsWith("application/pdf")),
    "فایل انتخابی حتما باید تصویر یا pdf باشد",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 5;
  }, "فایل انتخابی حداکثر باید ۵ مگابایت باشد");

export const reciptSchema = z.object({
  start: z.date("تاریخ شروع الزامی میباشد").optional(),
  end: z.date("تاریخ پایان الزامی میباشد").optional(),
  recipt: imageSchema,
  description: z
    .union([
      z.string().length(0, "توضیحات در صورت نیاز حداقل ۴ حرف میباشد"),
      z.string().min(4, "توضیحات حداقل ۴ حرف میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

export const enReciptSchema = z.object({
  start: z.date("تاریخ شروع الزامی میباشد").optional(),
  end: z.date("تاریخ پایان الزامی میباشد").optional(),
  recipt: imageSchema,
  description: z
    .union([
      z.string().length(0, "توضیحات در صورت نیاز حداقل ۴ حرف میباشد"),
      z.string().min(4, "توضیحات حداقل ۴ حرف میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

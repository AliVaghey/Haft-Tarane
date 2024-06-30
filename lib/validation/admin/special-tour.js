import { z } from "zod";

const specialTourSchemaImage = z
  .custom()
  .refine((file) => file, "انتخاب تصویر تور الزامی میباشد")
  .refine(
    (file) => !file || (file && file.type.startsWith("image/")),
    "فایل انتخابی حتما باید تصویر باشد",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 1;
  }, "فایل انتخابی حداکثر باید 1 مگابایت باشد");

export const specialTourSchema = z.object({
  tour_id: z.string().min(1, "انتخاب تور الزامی میباشد"),
  importance: z.coerce
    .number()
    .min(1, "اولویت تور حداقل ۱ میباشد")
    .max(255, "اولویت تور حداکثر ۲۵۵ میباشد"),
  advertisement: z.string().min(2, "توضیحات الزامی است و حداقل ۲ حرف میباشد"),
  dates: z.array(z.number().min(1)).min(1, "حداقل یک مورد را باید انتخاب کنید"),
  photo: specialTourSchemaImage,
});

export const enSpecialTourSchema = z.object({
  tour_id: z.string().min(1, "انتخاب تور الزامی میباشد"),
  importance: z.coerce
    .number()
    .min(1, "اولویت تور حداقل ۱ میباشد")
    .max(256, "اولویت تور حداکثر ۲۵۶ میباشد"),
  advertisement: z.string().min(2, "توضیحات الزامی است و حداقل ۲ حرف میباشد"),
  dates: z.array(z.number().min(1)).min(1, "حداقل یک مورد را باید انتخاب کنید"),
  photo: specialTourSchemaImage,
});

//edit

const editSpecialTourSchemaImage = z
  .custom()
  // .refine((file) => file, "انتخاب تصویر تور الزامی میباشد")
  .refine(
    (file) => !file || (file && file.type.startsWith("image/")),
    "فایل انتخابی حتما باید تصویر باشد",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 1;
  }, "فایل انتخابی حداکثر باید 1 مگابایت باشد");

export const editSpecialTourSchema = z.object({
  tour_id: z.string().min(1, "انتخاب تور الزامی میباشد"),
  importance: z.coerce
    .number()
    .min(1, "اولویت تور حداقل ۱ میباشد")
    .max(255, "اولویت تور حداکثر ۲۵۵ میباشد"),
  advertisement: z.string().min(2, "توضیحات الزامی است و حداقل ۲ حرف میباشد"),
  dates: z.array(z.number().min(1)).min(1, "حداقل یک مورد را باید انتخاب کنید"),
  photo: editSpecialTourSchemaImage,
});

export const enEditSpecialTourSchema = z.object({
  tour_id: z.string().min(1, "انتخاب تور الزامی میباشد"),
  importance: z.coerce
    .number()
    .min(1, "اولویت تور حداقل ۱ میباشد")
    .max(256, "اولویت تور حداکثر ۲۵۶ میباشد"),
  advertisement: z.string().min(2, "توضیحات الزامی است و حداقل ۲ حرف میباشد"),
  dates: z.array(z.number().min(1)).min(1, "حداقل یک مورد را باید انتخاب کنید"),
  photo: editSpecialTourSchemaImage,
});

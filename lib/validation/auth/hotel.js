import { z } from "zod";

const hotelImageSchema = z
  .custom()
  .refine((file) => file, "انتخاب تصویر دسته بندی الزامی میباشد")
  .refine(
    (file) => !file || (file && file.type.startsWith("image/")),
    "فایل انتخابی حتما باید تصویر باشد",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 1;
  }, "فایل انتخابی حداکثر باید 1 مگابایت باشد");

export const adminHotelSchema = z.object({
  name: z.string().min(2, "نام هتل حداقل ۲ حرف میباشد"),
  address: z.string().min(5, "آدرس حداقل ۵ حرف میباشد"),
  country: z.string().min(2, "نام کشور حداقل ۲ حرف میباشد").optional(),
  state: z.string().min(2, "نام استان حداقل ۲ حرف میباشد").optional(),
  city: z.string().min(2, "نام شهر حداقل ۲ حرف میباشد").optional(),
  stars: z.coerce
    .number()
    .min(1, "ستاره هتل حداقل ۱ میباشد")
    .max(5, "ستاره هتل حداکثر ۵ میباشد"),
  images: z.array(hotelImageSchema).optional(),
});

export const enAdminHotelSchema = z.object({
  name: z.string().min(2, "نام هتل حداقل ۲ حرف میباشد"),
  address: z.string().min(5, "آدرس حداقل ۵ حرف میباشد"),
  country: z.string().min(2, "نام کشور حداقل ۲ حرف میباشد").optional(),
  state: z.string().min(2, "نام استان حداقل ۲ حرف میباشد").optional(),
  city: z.string().min(2, "نام شهر حداقل ۲ حرف میباشد").optional(),
  stars: z.coerce
    .number()
    .min(1, "ستاره هتل حداقل ۱ میباشد")
    .max(5, "ستاره هتل حداکثر ۵ میباشد"),
  images: z.array(hotelImageSchema).optional(),
});

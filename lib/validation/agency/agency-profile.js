import { z } from "zod";

export const agencyProfileSchema = z.object({
  name: z.string().min(2, "نام آژانس حداقل ۲ حرف میباشد"),
  address: z.string().min(2, "آدرس حداقل ۲ حرف میباشد"),
  c_phone: z
    .string()
    .startsWith("0", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
  email: z
    .union([
      z.string().length(0, "فرمت ایمیل صحیح نمیباشد"),
      z
        .string()
        .max(100, "ایمیل حداکثر ۱۰۰ حرف میباشد")
        .email("فرمت ایمیل صحیح نمیباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  zip_code: z
    .string()
    .min(10, "کد پستی باید ۱۰ رقم باشد")
    .max(10, "کد پستی باید ۱۰ رقم باشد"),
  web_site: z
    .union([
      z.string().length(0, "لینک معتبر نمیباشد"),
      z
        .string()
        .max(200, "لینک حداکثر ۲۰۰ حرف میباشد")
        .url("لینک معتبر نمیباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

export const enAgencyProfileSchema = z.object({
  name: z.string().min(2, "نام آژانس حداقل ۲ حرف میباشد"),
  address: z.string().min(2, "آدرس حداقل ۲ حرف میباشد"),
  c_phone: z
    .string()
    .startsWith("0", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
  email: z.string().max(100).email("فرمت ایمیل صحیح نمیباشد").optional(),
  zip_code: z
    .string()
    .min(10, "کد پستی باید ۱۰ رقم باشد")
    .max(10, "کد پستی باید ۱۰ رقم باشد"),
  web_site: z
    .union([
      z.string().length(0, "لینک معتبر نمیباشد"),
      z
        .string()
        .max(200, "لینک حداکثر ۲۰۰ حرف میباشد")
        .url("لینک معتبر نمیباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

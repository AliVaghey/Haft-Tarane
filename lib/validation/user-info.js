import { z } from "zod";

export const userProfileSchema = z.object({
  first_name_fa: z.string().min(2, "نام حداقل ۲ حرف میباشد"),
  last_name_fa: z.string().min(2, "نام خانوادگی حداقل ۲ حرف میباشد"),
  gender: z.string().min(2, "جنسیت حداقل ۲ حرف میباشد"),
  phone: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
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
  national_code: z
    .string()
    .min(10, "کد ملی باید ۱۰ رقم باشد")
    .max(10, "کد ملی باید ۱۰ رقم باشد"),
});

export const enUserProfileSchema = z.object({
  first_name_fa: z.string().min(2, "نام حداقل ۲ حرف میباشد"),
  last_name_fa: z.string().min(2, "نام خانوادگی حداقل ۲ حرف میباشد"),
  gender: z.string().min(2, "جنسیت حداقل ۲ حرف میباشد"),
  phone: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
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
  national_code: z
    .string()
    .min(10, "کد ملی باید ۱۰ رقم باشد")
    .max(10, "کد ملی باید ۱۰ رقم باشد"),
});

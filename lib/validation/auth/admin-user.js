import { z } from "zod";

export const adminUserSchema = z.object({
  username: z.string().min(3, "نام و نام خانوادگی حداقل ۳ حرف میباشد"),
  national_code: z
    .string()
    .min(10, "کد ملی ۱۰ رقم میباشد")
    .max(10, "کد ملی ۱۰ رقم میباشد"),
  phone: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
  email: z.string().max(100).email("فرمت ایمیل صحیح نمیباشد").optional(),
  access_type: z.string(),
});

export const enadminUserSchema = z.object({
  username: z.string().min(3, "نام و نام خانوادگی حداقل ۳ حرف میباشد"),
  national_code: z
    .string()
    .min(10, "کد ملی ۱۰ رقم میباشد")
    .max(10, "کد ملی ۱۰ رقم میباشد"),
  phone: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
  email: z.string().max(100).email("فرمت ایمیل صحیح نمیباشد").optional(),
  access_type: z.string(),
});

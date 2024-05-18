import { z } from "zod";

export const loginSchema = z.object({
  userName: z.string().min(3, "نام و نام خانوادگی حداقل ۳ حرف میباشد"),
  phoneNumber: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
  password: z.string().min(8, "رمز ورود حداقل ۸ حرف میباشد"),
  email: z.string().max(100).email("فرمت ایمیل صحیح نمیباشد").optional(),
});

export const enLoginSchema = z.object({
  phoneNumber: z
    .string()
    .startsWith("09", "The contact number is not correct")
    .min(11, "The contact number must be 11 digits")
    .max(11, "The contact number must be 11 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

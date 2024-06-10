import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3, "نام و نام خانوادگی حداقل ۳ حرف میباشد"),
  phone: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
  password: z.string().min(8, "رمز ورود حداقل ۸ حرف میباشد"),
  password_confirmation: z.string().min(8, "تکرار رمز ورود حداقل ۸ حرف میباشد"),
});

export const enSignUpSchema = z.object({
  username: z.string().min(3, "نام و نام خانوادگی حداقل ۳ حرف میباشد"),
  phone: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
  password: z.string().min(8, "رمز ورود حداقل ۸ حرف میباشد"),
  password_confirmation: z.string().min(8, "تکرار رمز ورود حداقل ۸ حرف میباشد"),
});

import { z } from "zod";

export const otpPhoneSchema = z.object({
  phone: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
});

export const enOtpPhoneSchema = z.object({
  phone: z
    .string()
    .startsWith("09", "The contact number is not correct")
    .min(11, "The contact number must be 11 digits")
    .max(11, "The contact number must be 11 digits"),
});

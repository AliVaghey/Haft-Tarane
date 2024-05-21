import { z } from "zod";

export const suportTeamSchema = z.object({
  name: z.string().min(2, "نام پشتیبان حداقل ۲ حرف میباشد"),
  phone: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
});

export const enSuportTeamSchema = z.object({
  name: z.string().min(2, "User's name must be at least 2 characters"),
  phone: z
    .string()
    .startsWith("09", "The contact number is not correct")
    .min(11, "The contact number must be 11 digits")
    .max(11, "The contact number must be 11 digits"),
});

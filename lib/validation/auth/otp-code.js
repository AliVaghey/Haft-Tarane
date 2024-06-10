import { z } from "zod";

export const otpCodeSchema = z.object({
  code: z.string().min(6, "کد تایید ۶ رقم میباشد"),
});

export const enOtpCodeSchema = z.object({
  code: z.string().min(6, "کد تایید ۶ رقم میباشد"),
});

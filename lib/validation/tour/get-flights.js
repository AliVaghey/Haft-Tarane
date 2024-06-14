import { z } from "zod";

export const getFlightsSchema = z.object({
  from: z.string().min(2, "مبدا حداقل ۲ حرف میباشد"),
  to: z.string().min(2, "مقصد حداقل ۲ حرف میباشد"),
  date: z.date("تاریخ شروع الزامی میباشد"),
});

export const enGetFlightsSchema = z.object({
  from: z.string().min(2, "مبدا حداقل ۲ حرف میباشد"),
  to: z.string().min(2, "مقصد حداقل ۲ حرف میباشد"),
  date: z.date("تاریخ شروع الزامی میباشد"),
});

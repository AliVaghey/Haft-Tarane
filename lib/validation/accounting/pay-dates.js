import { z } from "zod";

export const payDatesSchema = z.object({
  start: z.date("تاریخ شروع الزامی میباشد"),
  end: z.date("تاریخ پایان الزامی میباشد"),
});

export const enPayDatesSchema = z.object({
  start: z.date("تاریخ شروع الزامی میباشد"),
  end: z.date("تاریخ پایان الزامی میباشد"),
});

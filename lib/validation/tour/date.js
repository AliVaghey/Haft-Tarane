import { z } from "zod";

export const dateSchema = z.object({
  start: z.date("تاریخ شروع الزامی میباشد"),
  end: z.date("تاریخ پایان الزامی میباشد"),
});

export const enDatelSchema = z.object({
  start: z.date("تاریخ شروع الزامی میباشد"),
  end: z.date("تاریخ پایان الزامی میباشد"),
});

import { z } from "zod";

export const flightListSchema = z.object({
  returning: z.string().min(1, "انتخاب نوع رفت یا برگشت الزامی میباشد"),
  start_date: z.date().optional(),
  flight: z.any(),
});

export const enFlightListSchema = z.object({
  returning: z.string().min(1, "انتخاب نوع رفت یا برگشت الزامی میباشد"),
  start_date: z.date().optional(),
  flight: z.any(),
});

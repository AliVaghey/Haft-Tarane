import { z } from "zod";

export const datePriceSchema = z.object({
  type: z.string().min(2, "انتخاب کاهش یا افزایش الزامی میباشد"),
  price_change: z.string().min(1, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
  costId: z.string().min(1, "انتخاب هتل الزامی میباشد"),
  dateId: z.string().min(1, "انتخاب تاریخ الزامی میباشد"),
});

export const enDatePriceSchema = z.object({
  type: z.string().min(2, "انتخاب کاهش یا افزایش الزامی میباشد"),
  price_change: z.string().min(1, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
  costId: z.string().min(1, "انتخاب هتل الزامی میباشد"),
  dateId: z.string().min(1, "انتخاب تاریخ الزامی میباشد"),
});

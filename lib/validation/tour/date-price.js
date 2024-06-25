import { z } from "zod";

export const datePriceSchema = z.object({
  type: z.string().min(2, "انتخاب کاهش یا افزایش الزامی میباشد"),
  price_change: z.string().min(1, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
});

export const enDatePriceSchema = z.object({
  type: z.string().min(2, "انتخاب کاهش یا افزایش الزامی میباشد"),
  price_change: z.string().min(1, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
});

import { z } from "zod";

export const addProfitRateSchema = z.object({
  name: z.string().min(1, "عنوان الزامی میباشد"),
  rate: z.coerce.number().min(1, "نرخ کمیسیون الزامی میباشد"),
});

export const enAddProfitRateSchema = z.object({
  name: z.string().min(1, "عنوان الزامی میباشد"),
  rate: z.coerce.number().min(1, "نرخ کمیسیون الزامی میباشد"),
});

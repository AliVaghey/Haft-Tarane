import { z } from "zod";

export const profitRateSchema = z.object({
  profit_rate: z.string().min(1, "نرخ کمیسیون الزامی میباشد"),
});

export const enProfitRateSchema = z.object({
  profit_rate: z.string().min(1, "نرخ کمیسیون الزامی میباشد"),
});

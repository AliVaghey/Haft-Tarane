import { z } from "zod";

export const adminCurrencySchema = z.object({
  usd: z.string(),
  eur: z.string(),
  aed: z.string(),
});

export const enAdminCurrencySchema = z.object({
  usd: z.string(),
  eur: z.string(),
  aed: z.string(),
});

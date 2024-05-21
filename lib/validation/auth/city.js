import { z } from "zod";

export const citySchema = z.object({
  name: z.string().min(2, "نام شهر حداقل ۲ حرف میباشد"),
});

export const enCitySchema = z.object({
  name: z.string().min(2, "The name of city must be at least 2 characters"),
});

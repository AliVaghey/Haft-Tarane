import { z } from "zod";

export const tourStylesSchema = z.object({
  value: z.string().min(2, "عنوان مدل تور الزامی میباشد"),
});

export const enTourStylesSchema = z.object({
  value: z.string().min(2, "عنوان مدل تور الزامی میباشد"),
});

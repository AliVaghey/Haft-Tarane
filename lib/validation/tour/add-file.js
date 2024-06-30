import { z } from "zod";

export const addFileSchema = z.object({
  title: z.string().min(2, "نام فایل حداقل ۲ حرف میباشد"),
  file: z.any(),
});

export const enAddFileSchema = z.object({
  title: z.string().min(2, "نام فایل حداقل ۲ حرف میباشد"),
  file: z.any(),
});

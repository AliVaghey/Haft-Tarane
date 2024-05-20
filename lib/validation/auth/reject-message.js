import { z } from "zod";

export const rejectMessageSchema = z.object({
  message: z.string().min(2, "پیام حداقل ۲ حرف میباشد"),
});

export const enRejectMessageSchema = z.object({
  message: z.string().min(8, "The message must be at least 2 characters"),
});

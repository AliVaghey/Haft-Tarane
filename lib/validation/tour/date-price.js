import { z } from "zod";

export const datePriceSchema = z.object({
  one_bed: z
    .union([
      z.string().length(0, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
      z.string().min(1, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  one_bed_type: z.string().min(2, "انتخاب کاهش یا افزایش الزامی میباشد"),
  currency: z.string(),
  two_bed: z
    .union([
      z.string().length(0, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
      z.string().min(1, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  two_bed_type: z.string().min(2, "انتخاب کاهش یا افزایش الزامی میباشد"),

  plus_one: z
    .union([
      z.string().length(0, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
      z.string().min(1, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  plus_one_type: z.string().min(2, "انتخاب کاهش یا افزایش الزامی میباشد"),

  cld_6: z
    .union([
      z.string().length(0, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
      z.string().min(1, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  cld_6_type: z.string().min(2, "انتخاب کاهش یا افزایش الزامی میباشد"),

  cld_2: z
    .union([
      z.string().length(0, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
      z.string().min(1, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  cld_2_type: z.string().min(2, "انتخاب کاهش یا افزایش الزامی میباشد"),

  baby: z
    .union([
      z.string().length(0, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
      z.string().min(1, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  baby_type: z.string().min(2, "انتخاب کاهش یا افزایش الزامی میباشد"),

  costId: z.string().min(1, "انتخاب هتل الزامی میباشد"),
  dateId: z.string().min(1, "انتخاب تاریخ الزامی میباشد"),
});

export const enDatePriceSchema = z.object({
  one_bed: z
    .union([
      z.string().length(0, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
      z.string().min(1, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  one_bed_type: z.string().min(2, "انتخاب کاهش یا افزایش الزامی میباشد"),
  currency: z.string(),
  two_bed: z
    .union([
      z.string().length(0, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
      z.string().min(1, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  two_bed_type: z.string().min(2, "انتخاب کاهش یا افزایش الزامی میباشد"),

  plus_one: z
    .union([
      z.string().length(0, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
      z.string().min(1, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  plus_one_type: z.string().min(2, "انتخاب کاهش یا افزایش الزامی میباشد"),

  cld_6: z
    .union([
      z.string().length(0, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
      z.string().min(1, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  cld_6_type: z.string().min(2, "انتخاب کاهش یا افزایش الزامی میباشد"),

  cld_2: z
    .union([
      z.string().length(0, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
      z.string().min(1, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  cld_2_type: z.string().min(2, "انتخاب کاهش یا افزایش الزامی میباشد"),

  baby: z
    .union([
      z.string().length(0, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
      z.string().min(1, "مقدار کاهش یا افزایش حداقل ۱ میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  baby_type: z.string().min(2, "انتخاب کاهش یا افزایش الزامی میباشد"),

  costId: z.string().min(1, "انتخاب هتل الزامی میباشد"),
  dateId: z.string().min(1, "انتخاب تاریخ الزامی میباشد"),
});

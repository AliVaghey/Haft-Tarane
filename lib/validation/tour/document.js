import { z } from "zod";

export const documentSchema = z.object({
  free_services: z
    .array(z.string().min(1))
    .min(1, "حداقل یک مورد را باید انتخاب کنید"),
  certificates: z
    .array(z.string().min(1))
    .min(1, "حداقل یک مورد را باید انتخاب کنید"),
  descriptions: z
    .union([
      z.string().length(0, "توضیحات در صورت نیاز حداقل ۴ حرف میباشد"),
      z.string().min(4, "توضیحات حداقل ۴ حرف میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  cancel_rules: z
    .union([
      z.string().length(0, "قوانین کنسلی در صورت نیاز حداقل ۴ حرف میباشد"),
      z.string().min(4, "قوانین کنسلی حداقل ۴ حرف میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  tab_descriptions: z
    .array(z.string().min(1))
    .min(1, "حداقل یک مورد را باید انتخاب کنید"),
});

export const endocumentSchema = z.object({
  free_services: z
    .array(z.string().min(1))
    .min(1, "حداقل یک مورد را باید انتخاب کنید"),
  certificates: z
    .array(z.string().min(1))
    .min(1, "حداقل یک مورد را باید انتخاب کنید"),
  descriptions: z
    .union([
      z.string().length(0, "توضیحات در صورت نیاز حداقل ۴ حرف میباشد"),
      z.string().min(4, "توضیحات حداقل ۴ حرف میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  cancel_rules: z
    .union([
      z.string().length(0, "قوانین کنسلی در صورت نیاز حداقل ۴ حرف میباشد"),
      z.string().min(4, "قوانین کنسلی حداقل ۴ حرف میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  tab_descriptions: z
    .array(z.string().min(1))
    .min(1, "حداقل یک مورد را باید انتخاب کنید"),
});

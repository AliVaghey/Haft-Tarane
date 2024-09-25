import { z } from "zod";

const sliderCardSchemaImage = z
  .custom()
  .refine((file) => file, "انتخاب تصویر الزامی میباشد")
  .refine(
    (file) => !file || (file && file.type.startsWith("image/")),
    "فایل انتخابی حتما باید تصویر باشد",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 1;
  }, "فایل انتخابی حداکثر باید 1 مگابایت باشد");

export const sliderCardSchema = z.object({
  link: z
    .union([
      z.string().length(0, "لینک معتبر نمیباشد"),
      z
        .string()
        .max(200, "لینک حداکثر ۲۰۰ حرف میباشد")
        .url("لینک معتبر نمیباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  description: z
    .union([
      z.string().length(0, "توضیحات در صورت نیاز حداقل ۴ حرف میباشد"),
      z.string().min(4, "توضیحات حداقل ۴ حرف میباشد"),
    ])
    .nullable()
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  description_color: z
    .union([
      z.string().length(0, "رنک پس زمینه در صورت نیاز حداقل ۷ حرف میباشد"),
      z.string().min(7, "رنک پس زمینه ۷ حرف میباشد"),
      z.string().max(7, "رنک پس زمینه ۷ حرف میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  photo: sliderCardSchemaImage,
});

export const enSliderCardSchema = z.object({
  link: z
    .union([
      z.string().length(0, "لینک معتبر نمیباشد"),
      z
        .string()
        .max(200, "لینک حداکثر ۲۰۰ حرف میباشد")
        .url("لینک معتبر نمیباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  description: z
    .union([
      z.string().length(0, "توضیحات در صورت نیاز حداقل ۴ حرف میباشد"),
      z.string().min(4, "توضیحات حداقل ۴ حرف میباشد"),
    ])
    .nullable()
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  description_color: z
    .union([
      z.string().length(0, "رنک پس زمینه در صورت نیاز حداقل ۷ حرف میباشد"),
      z.string().min(7, "رنک پس زمینه ۷ حرف میباشد"),
      z.string().max(7, "رنک پس زمینه ۷ حرف میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  photo: sliderCardSchemaImage,
});

//edit

const editSliderCardSchemaImage = z
  .custom()
  // .refine((file) => file, "انتخاب تصویر الزامی میباشد")
  .refine(
    (file) => !file || (file && file.type.startsWith("image/")),
    "فایل انتخابی حتما باید تصویر باشد",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 1;
  }, "فایل انتخابی حداکثر باید 1 مگابایت باشد");

export const editSliderCardSchema = z.object({
  link: z
    .union([
      z.string().length(0, "لینک معتبر نمیباشد"),
      z
        .string()
        .max(200, "لینک حداکثر ۲۰۰ حرف میباشد")
        .url("لینک معتبر نمیباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  description: z
    .union([
      z.string().length(0, "توضیحات در صورت نیاز حداقل ۴ حرف میباشد"),
      z.string().min(4, "توضیحات حداقل ۴ حرف میباشد"),
    ])
    .nullable()
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  description_color: z
    .union([
      z.string().length(0, "رنک پس زمینه در صورت نیاز حداقل ۷ حرف میباشد"),
      z.string().min(7, "رنک پس زمینه ۷ حرف میباشد"),
      z.string().max(7, "رنک پس زمینه ۷ حرف میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  photo: editSliderCardSchemaImage,
});

export const enEditSliderCardSchema = z.object({
  link: z
    .union([
      z.string().length(0, "لینک معتبر نمیباشد"),
      z
        .string()
        .max(200, "لینک حداکثر ۲۰۰ حرف میباشد")
        .url("لینک معتبر نمیباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  description: z
    .union([
      z.string().length(0, "توضیحات در صورت نیاز حداقل ۴ حرف میباشد"),
      z.string().min(4, "توضیحات حداقل ۴ حرف میباشد"),
    ])
    .nullable()
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  description_color: z
    .union([
      z.string().length(0, "رنک پس زمینه در صورت نیاز حداقل ۷ حرف میباشد"),
      z.string().min(7, "رنک پس زمینه ۷ حرف میباشد"),
      z.string().max(7, "رنک پس زمینه ۷ حرف میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  photo: editSliderCardSchemaImage,
});

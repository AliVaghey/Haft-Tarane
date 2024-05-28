import { z } from "zod";

export const bannerSchema = z.object({
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
  sort: z.coerce
    .number()
    .min(1, "اولویت تور حداقل ۱ میباشد")
    .max(255, "اولویت تور حداکثر ۲۵۵ میباشد"),
  description: z.string().min(2, "توضیحات الزامی است و حداقل ۲ حرف میباشد"),
  text_color: z
    .union([
      z.string().length(0, "رنک متن در صورت نیاز حداقل ۷ حرف میباشد"),
      z.string().min(7, "رنک متن ۷ حرف میباشد"),
      z.string().max(7, "رنک متن ۷ حرف میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  background_color: z
    .union([
      z.string().length(0, "رنک پس زمینه در صورت نیاز حداقل ۷ حرف میباشد"),
      z.string().min(7, "رنک پس زمینه ۷ حرف میباشد"),
      z.string().max(7, "رنک پس زمینه ۷ حرف میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

export const enBannerSchema = z.object({
  link: z
    .union([
      z.string().length(0, "لینک در صورت نیاز حداقل ۴ حرف میباشد"),
      z.string().min(4, "لینک حداقل ۴ حرف میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  sort: z.coerce
    .number()
    .min(1, "اولویت تور حداقل ۱ میباشد")
    .max(255, "اولویت تور حداکثر ۲۵۵ میباشد"),
  description: z.string().min(2, "توضیحات الزامی است و حداقل ۲ حرف میباشد"),
  text_color: z
    .union([
      z.string().length(0, "رنک متن در صورت نیاز حداقل ۷ حرف میباشد"),
      z.string().min(7, "رنک متن ۷ حرف میباشد"),
      z.string().max(7, "رنک متن ۷ حرف میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  background_color: z
    .union([
      z.string().length(0, "رنک پس زمینه در صورت نیاز حداقل ۷ حرف میباشد"),
      z.string().min(7, "رنک پس زمینه ۷ حرف میباشد"),
      z.string().max(7, "رنک پس زمینه ۷ حرف میباشد"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

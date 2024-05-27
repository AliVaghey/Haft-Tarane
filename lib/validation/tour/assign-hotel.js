import { z } from "zod";

export const assignHotelSchema = z.object({
  hotel_id: z.string().min(1, "نام هتل الزامی میباشد"),
  room_type: z.string().min(1, "نوع اتاق حداقل ۱ کاراکتر میباشد"),
  one_bed: z.coerce.number().min(1, "قیمت اتاق ۱ تخته الزامی میباشد"),
  two_bed: z.coerce.number().min(1, "قیمت اتاق ۲ تخته الزامی میباشد"),
  plus_one: z.coerce.number().min(1, "قیمت تخت اضافه الزامی میباشد"),
  cld_6: z.coerce.number().min(1, "هزینه کودک الزامی میباشد"),
  cld_2: z.coerce.number().min(1, "هزینه کودک الزامی میباشد"),
  baby: z.coerce.number().min(1, "هزینه کودک الزامی میباشد"),
});

export const enAssignHotelSchema = z.object({
  hotel_id: z.string().min(1, "نام هتل الزامی میباشد"),
  room_type: z.string().min(1, "نوع اتاق حداقل ۱ کاراکتر میباشد"),
  one_bed: z.coerce.number().min(1, "قیمت اتاق ۱ تخته الزامی میباشد"),
  two_bed: z.coerce.number().min(1, "قیمت اتاق ۲ تخته الزامی میباشد"),
  plus_one: z.coerce.number().min(1, "قیمت تخت اضافه الزامی میباشد"),
  cld_6: z.coerce.number().min(1, "هزینه کودک الزامی میباشد"),
  cld_2: z.coerce.number().min(1, "هزینه کودک الزامی میباشد"),
  baby: z.coerce.number().min(1, "هزینه کودک الزامی میباشد"),
});

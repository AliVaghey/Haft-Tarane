import { z } from "zod";

export const passengersInformationSchema = z.array(
  z.object({
    room_type: z.string().min(2, "نوع اتاق الزامی میباشد"),
    plus_one: z.string().min(2, "تخت اضافه الزامی میباشد"),
    passengers: z.array(
      z.object({
        type: z.string().min(2, "سن شخص الزامی میباشد"),
        first_name: z.string().min(2, "نام الزامی میباشد"),
        last_name: z.string().min(2, "نام خانوادگی الزامی میباشد"),
        national_code: z.string().min(2, "کد ملی الزامی میباشد"),
        birth_day: z.string().min(2, "تاریخ تولد الزامی میباشد"),
        nationality: z.string().min(2, "ملیت الزامی میباشد"),
      }),
    ),
  }),
);

export const enPassengersInformationSchema = z.array(
  z.object({
    room_type: z.string().min(2, "نوع اتاق الزامی میباشد"),
    plus_one: z.string().min(2, "تخت اضافه الزامی میباشد"),
    passengers: z.array(
      z.object({
        type: z.string().min(2, "سن شخص الزامی میباشد"),
        first_name: z.string().min(2, "نام الزامی میباشد"),
        last_name: z.string().min(2, "نام خانوادگی الزامی میباشد"),
        national_code: z.string().min(2, "کد ملی الزامی میباشد"),
        birth_day: z.string().min(2, "تاریخ تولد الزامی میباشد"),
        nationality: z.string().min(2, "ملیت الزامی میباشد"),
      }),
    ),
  }),
);

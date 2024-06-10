import { format } from "date-fns-jalali";

export const jaliliDate = (date) => {
  console.log("jalali-data", date);
  if (!date) {
    return null;
  }

  console.log("format", format(new Date(date), "yyyy/MM/dd"));
  return format(new Date(date), "yyyy/MM/dd");
};

export const jaliliDateHour = (date) => {
  if (!date) {
    return null;
  }
  return format(new Date(date), "yyyy/MM/dd HH:mm");
};
